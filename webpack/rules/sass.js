const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [
  {
    test: /\.sass$/,
    loader: [
      'style-loader',
      'css-loader?sourceMap',
      'sass-loader?sourceMap'
    ]
  }
]
