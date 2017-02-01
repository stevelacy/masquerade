const path = require('path')
const requireDir = require('require-dir')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pkg = require('../package')
const config = require('../config')

const isDev = config.env === 'development'

const globals = {
  port: 5000,
  '__config__': JSON.stringify(config),
  'process.env.NODE_ENV': JSON.stringify(config.env),
  '__DEV__': process.env.NODE_ENV === 'development', // used in react
  '__PROD__': process.env.NODE_ENV === 'production' // used in react
}


const lFolder = requireDir('./rules')
const rules = Object.keys(lFolder).reduce((p, k) => p.concat(lFolder[k]), [])

module.exports = {
  context: path.resolve(__dirname),
  name: 'client',
  cache: true,
  entry: [
    'webpack-hot-middleware/client?http://localhost:5000',
    'react-hot-loader/patch',
    path.resolve(__dirname, config.paths.src)
  ],
  devtool: isDev ? 'eval' : false,
  output: {
    path: path.resolve(__dirname, config.paths.dist),
    filename: '[hash].[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      app: config.paths.src,
      config: './config',
      views: path.resolve(config.paths.src, 'views'),
      core: path.resolve(config.paths.src, 'core'),
      components: path.resolve(config.paths.src, 'components'),
      actions: path.resolve(config.paths.src, 'actions'),
      styles: path.resolve(config.paths.src, 'styles'),
      reducers: path.resolve(config.paths.src, 'reducers'),
      routes: path.resolve(config.paths.src, 'routes'),
      'mapbox-gl/js/geo/transform': path.join(__dirname, '../node_modules/mapbox-gl/js/geo/transform'),
      'mapbox-gl': path.join(__dirname, '../node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(globals),
    new HtmlWebpackPlugin({
      template: path.join(config.paths.src, 'index.html'),
      favicon: path.join(config.paths.src, 'assets/favicon.ico'),
      title: pkg.name,
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      disable: false,
      allChunks: true
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor', 'manifest']
    // }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js?$/,
      options: {
        standard: {
          parser: 'babel-eslint'
        }
      }
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DllReferencePlugin({
      context: config.paths.src,
      manifest: require(path.join(config.paths.src, 'vendor-manifest.json'))
    })
  ],
  module: {
    rules
  },
  devServer: {
    historyApiFallback: { verbose: true },
    contentBase: config.paths.src,
    port: globals.port,
    hot: true,
    quiet: true,
    publicPath: '/',
    stats: {
      colors: true
    }
  }
}
