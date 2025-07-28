import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
  { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
  { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
  { protocol: 'https', hostname: 'gravatar.com', pathname: '/**' },
  { protocol: 'https', hostname: 'secure.gravatar.com', pathname: '/**' },
  { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
  { protocol: 'https', hostname: 'cdn.pixabay.com', pathname: '/**' },
  { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
  { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
  { protocol: 'https', hostname: 'api.dicebear.com', pathname: '/**' },
  { protocol: 'https', hostname: 'postimages.org', pathname: '/**' },
  { protocol: 'https', hostname: 'imgbox.com', pathname: '/**' },
  { protocol: 'https', hostname: 'i.imgur.com', pathname: '/**' },
  { protocol: 'https', hostname: 'flickr.com', pathname: '/**' },
  { protocol: 'https', hostname: 'live.staticflickr.com', pathname: '/**' },
  { protocol: 'https', hostname: '500px.com', pathname: '/**' },
  { protocol: 'https', hostname: 'photobucket.com', pathname: '/**' },
  { protocol: 'https', hostname: 'dropbox.com', pathname: '/**' },
  { protocol: 'https', hostname: 'dl.dropboxusercontent.com', pathname: '/**' },
  { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' }
],
  },
  // experimental: {
  //   turbo: false,
  // },
};

export default nextConfig;
