/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import { Component, PropTypes } from 'core'
import { BrowserRouter, Match, Miss } from 'react-router'
import fixIt from 'react-fix-it'

import IndexView from 'views/Index'
import ChartView from 'views/Charts'
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
        <div
          style={{
            height: '100%',
            width: '100%'
          }}>
          <Match exactly pattern='/' component={IndexView} />
          <Match pattern='/charts' component={ChartView} />
          <Miss component={NotFoundView} />
        </div>
      </BrowserRouter>
    )
  }
}

export default fixIt(RootView)
