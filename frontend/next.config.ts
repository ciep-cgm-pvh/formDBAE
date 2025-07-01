import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Adicione esta seção de redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/form',
        permanent: true, // Usa um redirecionamento 308 (permanente)
      },
    ]
  },
};

export default nextConfig;
