const nextConfig = {
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:5328/api/:path*'
        },
      ]
    },
  }
  
  module.exports = nextConfig