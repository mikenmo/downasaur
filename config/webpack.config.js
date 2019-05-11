const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const { NODE_ENV: ENV } = process.env;

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/../build',
    filename: 'bundle.js',
    publicPath: ENV === 'development' ? '/' : './'
  },
  watch: ENV === 'development',
  mode: ENV,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader/url' },
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      filename: 'index.html',
      template: './template/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT || 3000,
    hot: true
  }
}
