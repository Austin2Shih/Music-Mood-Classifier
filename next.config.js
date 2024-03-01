/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./app/(pages)/_globals/styles'],
  },
};

module.exports = nextConfig;
