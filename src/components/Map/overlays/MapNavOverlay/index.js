import React, { Component } from 'react'
import { Icon } from 'react-fa'
import './index.sass'

export default class SVGOverlay extends Component {
  render () {
    return (
      <div className='map-nav-overlay-component'>
        <div className='nav-button active'>
          <Icon name='map-marker' />
        </div>
        <div className='nav-button'>
          <Icon name='refresh' />
        </div>
        <div className='nav-button'>
          STATUS
        </div>
        <div className='nav-button'>
          <Icon name='terminal' />
        </div>
      </div>
    )
  }
}
