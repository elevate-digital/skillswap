/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/register",
        destination: "https://skillswap-api-yw06.onrender.com/user/register",
      },
      {
        source: "/api/login",
        destination: "https://skillswap-api-yw06.onrender.com/user/login",
      },
    ];
  },
};

export default nextConfig;
