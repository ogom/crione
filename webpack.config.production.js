'use strict'

var path = require('path')
var webpack = require('webpack')
var postcssImport = require('postcss-import')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var calc = require('postcss-calc')

module.exports = {
  entry: [
    path.join(__dirname, '/lib/index')
  ],
  output: {
    path: path.join(__dirname, '/app/dist/'),
    filename: 'bundle.js'
  },
  plugins: [
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
