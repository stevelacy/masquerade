import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import routes from 'routes'
import Root from 'views/Root'

render(
  <AppContainer>
    <Root
      history={browserHistory}
      routes={routes}
    />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./views/Root', () => {
    const Root = require('./views/Root')
    render(
      <AppContainer>
        <Root
          history={browserHistory}
          routes={routes}
        />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
