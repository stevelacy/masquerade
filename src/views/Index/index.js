import React from 'react'
import { Component, PropTypes } from 'core'
import classes from 'classnames'
import TransitionGroup from 'react-addons-css-transition-group'
import Navbar from 'components/Navbar'
import MapView from 'views/Map'
import './index.sass'

export default class IndexView extends Component {
  static displayName = 'IndexView'
  static propTypes = {
  }

  render() {
    return (
      <div className='home-view'>
        <Navbar />
        home
        <MapView />
      </div>
    )
  }
}
