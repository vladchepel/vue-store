module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/helpers/variables.scss";
          @import "@/assets/styles/helpers/placeholders.scss";
        `
      },
    },
  },
};
