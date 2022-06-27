/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  optimizeFonts: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/taxonomies",
        permanent: true,
      },
    ];
  },
};

