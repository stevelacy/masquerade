import React, { PropTypes, Component } from 'react'
import { Icon } from 'react-fa'
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
