const pkg = require('../package.json')

const root = {
  name: pkg.name
}

module.exports = {
  development: {
    ...root,
    url: 'http://localhost:5000',
    api: 'http://localhost:4000/api'
  },
  production: {
    ...root
  }
}
