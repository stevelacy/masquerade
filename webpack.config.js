const path = require('path')
const requireDir = require('require-dir')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const package = require('./package')

const paths = {
  root: '/',
  src: 'src',
  dist: 'dist'
}

const globals = {
  port: 5000,
  '__INITIAL_STATE__': JSON.stringify({}),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  '__DEV__': process.env.NODE_ENV === 'development', // used in react
  '__PROD__': process.env.NODE_ENV === 'production' // used in react
}


const lFolder = requireDir('./webpack/rules')
const rules = Object.keys(lFolder).reduce((p, k) => p.concat(lFolder[k]), [])

module.exports = {
  context: path.resolve(__dirname),
  name: 'client',
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, paths.src)
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, paths.dist),
    filename: 'bundle.js',
    publicPath: '/'
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
      routes: path.resolve(paths.src, 'routes'),
      'mapbox-gl/js/geo/transform': path.join(__dirname, '/node_modules/mapbox-gl/js/geo/transform'),
      'mapbox-gl': path.join(__dirname, '/node_modules/mapbox-gl/dist/mapbox-gl.js')
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
    }),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: rules
  },
  devServer: {
    historyApiFallback: {verbose: true},
    contentBase: paths.src,
    port: globals.port
  }
}
