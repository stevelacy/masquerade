require('babel-core/register')
const webpack = require('webpack')
const config = require('../webpack.config')

const compiler = webpack(config)
compiler.run((err, stats) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('finished')
})
