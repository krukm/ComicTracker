/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
        port: '',
        pathname: '/u/prod/marvel/i/mg/**',
      },
      {
        protocol: 'https',
        hostname: 'static.metron.cloud',
        port: '',
        pathname: '/media/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
