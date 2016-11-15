const path = require('path')
const babel = require('../../package').babel

module.exports = [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, '../../src'),
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      presets: babel.presets,
      plugins: [
        ['transform-decorators-legacy']
      ]
    }
  }
]
