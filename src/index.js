import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import Root from 'views/Root'

/*eslint-disable */
window.config = __config__
/*eslint-enable */

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./views/Root', () => {
    const Root = require('./views/Root').default
    render(
      <AppContainer>
        <Root />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
