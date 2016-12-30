module.exports = [
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url-loader',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype: 'application/font-woff'
    }
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url-loader',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype: 'application/font-woff2'
    }
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader: 'url-loader',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype: 'application/octet-stream'
    }
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'url-loader',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]'
    }
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url-loader',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype: 'image/svg+xml'
    }
  }
]
