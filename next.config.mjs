/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем ошибки TypeScript при деплое
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
