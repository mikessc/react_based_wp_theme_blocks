// https://github.com/postcss/postcss-load-config#usage
// https://webpack.js.org/loaders/postcss-loader/
// https://stackoverflow.com/questions/69725289/what-exactly-are-the-rules-for-configuring-postcss-config-js-mainly-with-tailwn

module.exports = {
  plugins: {
    autoprefixer: {
      remove: false, 
      grid: false 
    }
  }
};

