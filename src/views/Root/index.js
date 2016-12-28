import React from 'react'
import { Component } from 'core'
import { BrowserRouter, Match, Miss } from 'react-router'
import TransitionGroup from 'react-addons-css-transition-group'
import fixIt from 'react-fix-it'
import css from 'classnames'
import IndexView from 'views/Index'
import SourcesView from 'views/Sources'
import NotFoundView from 'views/NotFound'
import Sidebar from 'components/Sidebar'
import Loader from 'components/Loader'
import 'styles/globals.sass'
import './index.sass'

const links = [
  {
    href: '/sources',
    text: 'sources'
  }
]

class RootView extends Component {
  static displayName = 'RootView'
  static defaultState = {
    loaded: false
  }

  componentWillMount () {
    console.time('First Render Time')
    fetch('/v1/sources')
      .then((res) => {
        this.setState({ loaded: true })
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

          <Sidebar links={links}/>
          <div className={css('content-view')}>
            <Match exactly pattern='/' component={IndexView} />
            <Match pattern='/sources' component={SourcesView} />
            <Miss component={NotFoundView} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default fixIt(RootView)
