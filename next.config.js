require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    ENDPOINT_API: process.env.ENDPOINT_API,
  },
};

module.exports = nextConfig;