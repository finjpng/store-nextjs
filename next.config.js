/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  i18n: {
    locales: ["en-US", "fr", "de"],
    defaultLocale: "en-US",
  },
  swcMinify: true,
  images: {
    domains: ["m.media-amazon.com"],
  },
};

module.exports = nextConfig;
