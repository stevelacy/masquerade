import React from 'react'
import { Component } from 'core'
import { BrowserRouter, Match, Miss } from 'react-router'
import TransitionGroup from 'react-addons-css-transition-group'
import css from 'classnames'
import IndexView from 'views/Index'
import SourcesView from 'views/Sources'
import SettingsView from 'views/Settings'
import NotFoundView from 'views/NotFound'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import 'styles/globals.sass'
import './index.sass'

const links = [
  {
    href: '/sources',
    text: 'sources'
  },
  {
    href: '/settings',
    text: 'settings'
  }
]

class RootView extends Component {
  static displayName = 'RootView'
  static defaultState = {
    loaded: false,
    body: []
  }

  componentWillMount () {
    console.time('First Render Time')
    fetch('/v1/sources')
      .then(res => res.json())
      .then((body) => {
        console.log(body)
        this.setState({
          loaded: true,
          sources: body
        })
      })
      .catch((err) => {
        this.setState({
          error: err
        })
      })
  }
  componentDidMount () {
    console.timeEnd('First Render Time')
  }
  render () {
    if (this.state.error) {
      return <div> {this.state.error} </div>
    }
    return (
      <BrowserRouter>
        <div
          className={css('root-view')}>
          <TransitionGroup
            transitionName='loader-animation'
            transitionEnterTimeout={0}
            transitionLeaveTimeout={1000}>
            {!this.state.loaded && <Loader full />}
          </TransitionGroup>

          <Sidebar links={links} />
          <div className={css('content-view')}>
            <Match exactly pattern='/' component={IndexView} />
            <Match
              pattern='/sources'
              render={(props) =>
                <SourcesView sources={this.state.sources} />
              } />
            <Match
              pattern='/settings'
              render={(props) =>
                <SettingsView />
              } />
            <Miss component={NotFoundView} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default RootView
