/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow loading our locally generated images
    domains: []
  }
};

module.exports = nextConfig;