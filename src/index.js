import { render } from 'react-dom'
import { history } from 'shasta-router'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import store from 'core/store'
import actions from 'core/actions'
import routes from 'routes'
import Root from 'views/Root'

console.log('Actions:', actions)

render(
  <AppContainer>
    <Root
      history={history}
      store={store}
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
          history={history}
          store={store}
          routes={routes}
        />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
