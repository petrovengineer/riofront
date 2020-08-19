const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  // assetPrefix: process.env.BASE_PATH || '',
  // publicRuntimeConfig: {
  // basePath: process.env.BASE_PATH || '',
  basePath: '/rio',
  assetPrefix: '/rio',
  exclude: path.resolve(__dirname, 'imgs/svg'),
  webpack(config, options) {
    config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack'],
      });
    return config
  }
})