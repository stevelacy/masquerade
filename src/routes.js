/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import IndexView from 'views/Index'
import NotFoundView from 'views/NotFound'

const routes = (
  <Route path='/'>
    <IndexRoute component={IndexView} />
    <Route path='*' component={NotFoundView} />
  </Route>
)

export default routes
