require('babel-core/register')
const path = require('path')
const webpack = require('webpack')
const express = require('express')
const WebpackDevServer = require('webpack-dev-server')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const apiFallback = require('connect-history-api-fallback')
const config = require('../webpack/webpack.config')

const app = express()

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config)

  app.use(apiFallback())
  app.use(WebpackDevMiddleware(compiler, config.devServer))
  app.use(WebpackHotMiddleware(compiler))
}

if (process.env.NODE_ENV === 'production') {
  const indexPath = path.resolve(__dirname, '../dist/index.html')
  app.use(express.static(path.resolve(__dirname, '../dist/')))
  app.get('/', (req, res) => res.sendFile(indexPath))
}
  const compiler = webpack(config)
app.listen(5000, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:5000')
})
