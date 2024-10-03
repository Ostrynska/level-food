/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/level-food',
  assetPrefix: '/level-food/',
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'level-food-images-bucket.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig
