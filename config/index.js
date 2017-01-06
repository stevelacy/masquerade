const pkg = require('../package.json')

const root = {
  name: pkg.name,
  url: 'http://localhost:5000',
  api: 'http://localhost:4000/api'
}

module.exports = {
  development: {
    ...root
  },
  production: {
    ...root
  }
}
