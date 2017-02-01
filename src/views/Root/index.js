import React from 'react'
import window from 'global'
import { Component } from 'core'
import { BrowserRouter, Match, Miss } from 'react-router'
import TransitionGroup from 'react-addons-css-transition-group'
import css from 'classnames'
import IndexView from 'views/Index'
import ServicesView from 'views/Services'
import SettingsView from 'views/Settings'
import NotFoundView from 'views/NotFound'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import Notification from 'components/Notification'
import 'styles/globals.sass'
import './index.sass'

const links = [
  {
    href: '/services',
    text: 'services',
    icon: 'server'
  },
  {
    href: '/settings',
    text: 'settings',
    icon: 'cogs'
  }
]

class RootView extends Component {
  static displayName = 'RootView'
  static defaultState = {
    loaded: false,
    services: [],
    notification: {
      title: null,
      message: null
    }
  }
  componentWillMount () {
    console.time('First Render Time')
    window.fetch(window.config.api + '/services')
      .then(res => res.json())
      .then((body) => {
        console.log(body)
        this.setState({
          loaded: true,
          services: body
        })
      })
      .catch((err) => {
        this.actions().notification.create({
          title: 'Error',
          message: String(err),
          type: 'error'
        })
      })
  }
  componentDidMount () {
    console.timeEnd('First Render Time')
  }
  actions () {
    return {
      notification: {
        create: (notification) => {
          this.setState({ notification })
        },
        cancel: () => {
          this.setState({ notification: {} })
        }
      }
    }
  }
  render () {
    return (
      <BrowserRouter>
        <div className={css('root-view')}>
          <TransitionGroup
            transitionName='loader-animation'
            transitionEnterTimeout={0}
            transitionLeaveTimeout={1000}>
            {!this.state.loaded && <Loader full />}
          </TransitionGroup>

          <Sidebar links={links} />
          <Notification
            cancel={this.actions().notification.cancel}
            notification={this.state.notification} />
          <div className={css('content-view')}>
            <Match exactly pattern='/' component={IndexView} />
            <Match
              pattern='/services'
              render={() =>
                <ServicesView services={this.state.services} />
              } />
            <Match
              pattern='/settings'
              render={() => <SettingsView /> } />
            <Miss component={NotFoundView} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default RootView
