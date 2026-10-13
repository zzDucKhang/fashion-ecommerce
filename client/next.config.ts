import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: process.env.NEXT_PUBLIC_IMAGE_UNOPTIMIZED === 'true',
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/**' }, 
      { protocol: 'https', hostname: 'qr.sepay.vn', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.cloudinary.com', pathname: '/**' },
      { protocol: 'http', hostname: 'localhost', port: '5000', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '5000', pathname: '/**' },
      { protocol: 'https', hostname: '*.onrender.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.railway.app', pathname: '/**' },
    ],
  },
};

export default nextConfig;