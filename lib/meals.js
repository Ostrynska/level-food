import { S3 } from '@aws-sdk/client-s3';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import path from 'path';
import fs from 'fs';

const s3 = new S3({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const isProduction = process.env.DATABASE_ENV === 'production';

const localDbPath = path.join(process.cwd(), 'meals.db');
const productionDbPath = '/tmp/meals.db';
const dbPath = isProduction ? productionDbPath : localDbPath;

if (isProduction) {
  if (!fs.existsSync(productionDbPath)) {
    if (fs.existsSync(localDbPath)) {
      fs.copyFileSync(localDbPath, productionDbPath);
    } else {
      fs.writeFileSync(productionDbPath, '');
    }
  }
} else {
  if (!fs.existsSync(localDbPath)) {
    fs.writeFileSync(localDbPath, '');
  }
}

const db = sql(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    instructions TEXT,
    creator TEXT,
    creator_email TEXT,
    image TEXT,
    slug TEXT UNIQUE
  )
`).run();

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: 'level-food-images-bucket',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
