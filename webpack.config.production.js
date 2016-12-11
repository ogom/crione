'use strict'

var path = require('path')
var webpack = require('webpack')

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
          'babel-loader'
        ]
      }
    ]
  },
  target: 'electron'
}
