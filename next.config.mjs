/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: false,
    workerThreads: true
  }
};

export default nextConfig;
