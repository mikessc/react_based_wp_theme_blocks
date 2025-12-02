// https://github.com/svg/svgo
module.exports = {
  svgo: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // or disable plugins
          cleanupIDs: false,
          prefixIds: false,
        },
      },
    },
  ],
}