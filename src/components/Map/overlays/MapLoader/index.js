import React, { Component } from 'react'
import Loader from 'components/Loader'
import './index.sass'

export default class MapLoaderOverlay extends Component {
  render () {
    return (
      <div className='map-loader'>
        <Loader />
      </div>
    )
  }
}
