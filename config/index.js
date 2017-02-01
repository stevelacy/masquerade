const path = require('path')
const pkg = require('../package.json')

const env = process.env.NODE_ENV || 'development'

const root = {
  name: pkg.name,
  url: 'http://localhost:5000',
  api: 'http://localhost:4000/api',
  paths: {
    root: '/',
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist')
  }
}

const config = {
  development: {},
  production: {}
}
const configEnv = config[env]

module.exports = {
  ...root,
  ...configEnv
}
