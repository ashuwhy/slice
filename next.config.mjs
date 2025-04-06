/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable redirect for the API routes
  async rewrites() {
    return [
      {
        source: '/api/samples/:id',
        destination: '/api/samples/:id',
      },
    ];
  },
};

export default nextConfig; 