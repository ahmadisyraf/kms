// next.config.js

const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "font-src 'none';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
