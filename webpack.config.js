'use strict'

var path = require('path')
var webpack = require('webpack')
var postcssImport = require('postcss-import')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var calc = require('postcss-calc')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:4000/',
    'webpack/hot/dev-server',
    path.join(__dirname, '/lib/index')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: 'http://localhost:4000/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /lib/,
        loaders: [
          'style',
          'css?modules',
          'postcss'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ]
      }
    ]
  },
  postcss(webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      autoprefixer,
      precss,
      calc
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  target: 'electron'
}
