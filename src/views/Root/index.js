/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import { Component, PropTypes } from 'core'
import { BrowserRouter, Match, Miss } from 'react-router'
import fixIt from 'react-fix-it'

import IndexView from 'views/Index'
import NotFoundView from 'views/NotFound'
import 'styles/globals.sass'

class RootView extends Component {
  static displayName = 'RootView'

  componentWillMount() {
    console.time('First Render Time')
  }
  componentDidMount() {
    console.timeEnd('First Render Time')
  }
  render() {
    const { store } = this.props
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern='/' component={IndexView} />
          <Miss component={NotFoundView} />
        </div>
      </BrowserRouter>
    )
  }
}

export default fixIt(RootView)
