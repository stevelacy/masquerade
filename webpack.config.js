const path = require('path')
const requireDir = require('require-dir')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const package = require('./package')

const paths = {
  src: 'src',
  dist: 'dist'
}

const globals = {
  '__INITIAL_STATE__': JSON.stringify({}),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  '__DEV__': process.env.NODE_ENV === 'development', // used in react
  '__PROD__': process.env.NODE_ENV === 'production' // used in react
}


const lFolder = requireDir('./webpack/loaders')
const loaders = Object.keys(lFolder).reduce((p, k) => p.concat(lFolder[k]), [])

module.exports = {
  context: path.resolve(__dirname),
  name: 'client',
  entry: [
    path.resolve(__dirname, paths.src),
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, paths.dist),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    port: 5000
  },
  resolve: {
    alias: {
      app: paths.src,
      views: path.resolve(paths.src, 'views'),
      core: path.resolve(paths.src, 'core'),
      components: path.resolve(paths.src, 'components'),
      actions: path.resolve(paths.src, 'actions'),
      styles: path.resolve(paths.src, 'styles'),
      reducers: path.resolve(paths.src, 'reducers'),
      routes: path.resolve(paths.src, 'routes')
    }
  },
  plugins: [
    new webpack.DefinePlugin(globals),
    new HtmlWebpackPlugin({
      template: path.join(paths.src, 'index.html'),
      favicon: path.join(paths.src, 'assets/favicon.ico'),
      title: package.name,
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  module: {
    loaders: loaders
  }
}
