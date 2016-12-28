import React from 'react'
import { Component } from 'core'
// import MapView from 'views/Map'
import './index.sass'

export default class IndexView extends Component {
  static displayName = 'IndexView'
  static propTypes = {
  }

  render () {
    return (
      <div className='index-view'>
        index
        {/* <MapView /> */}
      </div>
    )
  }
}
