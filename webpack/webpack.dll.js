require('babel-core/register')
const path = require('path')
const requireDir = require('require-dir')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pkg = require('../package')

const config = require('../config')

const lFolder = requireDir('./rules')
const rules = Object.keys(lFolder).reduce((p, k) => p.concat(lFolder[k]), [])

module.exports = {
  entry: {
    vendor: [path.join(config.paths.src, 'vendors.js')]
  },
  output: {
    path: path.join(config.paths.dist),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  resolve: {
    alias: {
      'mapbox-gl/js/geo/transform': path.join(__dirname, '../node_modules/mapbox-gl/js/geo/transform'),
      'mapbox-gl': path.join(__dirname, '../node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },
  module: {
    rules
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(config.paths.src, '[name]-manifest.json'),
      name: '[name]',
      context: config.paths.src
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      disable: false,
      allChunks: true
    })
  ],
  node: {
    fs: 'empty'
  }
}

