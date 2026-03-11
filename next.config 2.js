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
      {
        source: "/api/tag/find-or-create",
        destination: "https://skillswap-api-yw06.onrender.com/tag/find-or-create",
      },
      {
        source: "/api/tag/:id",
        destination: "https://skillswap-api-yw06.onrender.com/tag/:id",
      },
      {
        source: "/api/tag",
        destination: "https://skillswap-api-yw06.onrender.com/tag",
      },
      {
        source: "/api/skill",
        destination: "https://skillswap-api-yw06.onrender.com/skill",
      },
    ];
  },
};

export default nextConfig;
