const webpack = require('webpack')
const express = require('express')
const WebpackDevServer = require('webpack-dev-server')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const apiFallback = require('connect-history-api-fallback')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

app.get('/v1/sources', (req, res) => {
  setTimeout(() => {
    res.json([
      {
        name: 'swarm',
        image: 'https://ss1.4sqi.net/img/swarm/homepage/sections/one/bee@2x-d270d62ab55dcf8955c151e3dbbed734.png'
      },
      {
        name: 'facebook',
        image: 'https://www.facebook.com/images/fb_icon_325x325.png'
      }
    ])
  }, 1000)
})

app.use(apiFallback({
  verbose: true
}))
app.use(WebpackDevMiddleware(compiler, config.devServer))
app.use(WebpackHotMiddleware(compiler))

app.listen(5000, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:5000')
})
