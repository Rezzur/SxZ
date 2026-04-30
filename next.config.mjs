/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем ошибки TypeScript при деплое
  typescript: {
    ignoreBuildErrors: true,
  },
  // Отключаем ошибки ESLint при деплое
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;