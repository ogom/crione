var webpack = require('webpack')
var postcssImport = require('postcss-import')
var autoprefixer = require('autoprefixer')
var precss = require('precss')

module.exports = {
  entry: {
    jsx: './lib/index',
    html: './app/index.html'
  },
  output: {
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
      precss
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  devServer: {
    hot: true,
    port: 4000,
    inline: true,
    historyApiFallback: true
  }
}
