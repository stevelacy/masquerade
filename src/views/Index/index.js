import React from 'react'
import { fromJS } from 'immutable'
import { Component } from 'core'
import Map from 'components/Map'
import Timeline from 'views/Timeline'
import './index.sass'

const locations = fromJS([
  [-112.023856, 33.535649],
  [-112.030343, 33.512322],
  [-112.049836, 33.565902],
  [-112.158856, 33.549022]
])

const SIDEBAR_WIDTH = 200

export default class IndexView extends Component {
  static displayName = 'IndexView'
  static propTypes = {
  }

  static defaultState = {
    width: window.innerWidth - SIDEBAR_WIDTH,
    height: 500
  }

  updateBounds () {
    this.setState({
      width: window.innerWidth - SIDEBAR_WIDTH
    })
  }

  componentWillMount () {
    this.updateBounds()
    window.addEventListener('resize', this.updateBounds)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateBounds)
  }

  render () {
    return (
      <div className='index-view'>
        <Map
          height={this.state.height}
          width={this.state.width}
          locations={locations} />
        <Timeline />
      </div>
    )
  }
}
