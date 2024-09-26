/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // experimental: {
  //   outputFileTracingIncludes: {
  //      '/lib/meals.js': ['/tmp/meals.db'],
  //   },
  // },
};

module.exports = nextConfig
