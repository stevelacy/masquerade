const ExtractTextPlugin = require('extract-text-webpack-plugin')
const development = process.env.NODE_ENV !== 'production' ? true : false

const devLoader = 'style-loader?sourceMap!css-loader?sourceMap!sass-loader?sourceMap'
const prodLoader = ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader?sourceMap',
  loader: 'css-loader!sass-loader'
})

module.exports = [
  {
    test: /\.sass$/,
    loader: development ? devLoader : prodLoader
  }
]
