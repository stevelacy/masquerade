const path = require('path')
const babel = require('../../package').babel

module.exports = [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, '../../src'),
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: babel.presets,
      plugins: [
        'transform-decorators-legacy',
        'react-hot-loader/babel'
      ]
    }
  }
]
