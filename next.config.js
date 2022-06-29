// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:id',
          destination: '/api/[id]',
        },
      ]
    },
};
