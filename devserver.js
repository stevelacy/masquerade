const webpack = require('webpack')
const express = require('express')
const WebpackDevServer = require('webpack-dev-server')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)
app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  hot: true,
  stats: {
    colors: true
  }
}))
app.use(WebpackHotMiddleware(compiler))

app.get('/v1/sources', (req, res) => {
  setTimeout(() => {
    res.send(' true ')
  }, 1000)
})

app.listen(5000, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:5000')
})
