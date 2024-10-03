// import fs from 'node:fs';
import { S3 } from '@aws-sdk/client-s3';

import slugify from 'slugify';
import xss from 'xss';
import axios from 'axios';

const s3 = new S3({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const API_URL = process.env.MEAL_DB;

export async function getMeals() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch meals');
  }
}

export async function getMeal(slug) {
  try {
    const response = await axios.get(`${API_URL}?slug=${slug}`);
    if (response.data.length === 0) {
      throw new Error('Meal not found');
    }

    return response.data[0];
  } catch (error) {
    throw new Error('Failed to fetch meal');
  }
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

  try {
    const response = await axios.post(API_URL, meal);
    return response.data;
  } catch (error) {
    throw new Error('Failed to save meal');
  }
}
