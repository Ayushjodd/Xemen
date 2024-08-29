/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
          }
        ],
      },
      reactStrictMode: true,  // Enabling React strict mode
      swcMinify: true,        // Using SWC for minification
};

export default nextConfig;
