const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html'
});

const uglifyPlugin = new UglifyJSPlugin({
  cache: true,
  parallel: true
});

module.exports = {
  uglifyPlugin,
  htmlPlugin
};
