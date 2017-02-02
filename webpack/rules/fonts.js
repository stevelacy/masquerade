module.exports = [
  {
    test: /\.(woff|woff2|otf|ttf|eot)(\?.*)?$/i,
    loader: 'file-loader',
    options: {
      name: '[name].[hash].[ext]'
    }
  }
]
