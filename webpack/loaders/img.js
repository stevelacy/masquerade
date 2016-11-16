module.exports = [
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader',
    query: {
      limit: 8192
    }
  }
]
