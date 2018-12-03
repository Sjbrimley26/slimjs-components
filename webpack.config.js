const { uglifyPlugin, htmlPlugin } = require('./webpackPlugins');
const path = require('path');

module.exports = {
  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: './'
  },

  watch: true,

  plugins: [
    htmlPlugin
  ],

  optimization: {
    minimizer: [
      uglifyPlugin
    ]
  }
};
