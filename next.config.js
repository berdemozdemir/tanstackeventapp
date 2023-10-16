/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
