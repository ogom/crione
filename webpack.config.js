'use strict'

var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:4000/',
    'webpack/hot/dev-server',
    path.join(__dirname, '/lib/index')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: 'http://localhost:4000/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /lib/,
        loaders: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader',
          'babel-loader'
        ]
      }
    ]
  },
  target: 'electron-renderer'
}
