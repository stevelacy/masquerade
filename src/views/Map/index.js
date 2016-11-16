import React from 'react'
import { Component } from 'core'
import MapGl from 'react-map-gl'
import './index.sass'

const accessToken = 'pk.eyJ1Ijoic3RldmVsYWN5IiwiYSI6ImNpdmtpejc4NTA4NmUyb2x2YTB5cnlremgifQ.KsPYeRPvv5AJKF3g84LOHg'

export default class MapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 37.7555,
        longitude: -122.4375,
        zoom: 8,
        width: 0
      }
    }
  }

  static displayName = 'MapView'

  handleViewportChange (viewport = {}) {
    this.setState({ viewport })
  }

  render() {
    return (
      <div
        ref={(e) => e ? this.setState({ width: e.offsetWidth }) : null}
        className='map-view'>
        <MapGl
          width={this.state.width}
          height={400}
          {...this.state.viewport}
          mapboxApiAccessToken={accessToken}
          onChangeViewport={this.handleViewportChange} />
      </div>
    )
  }
}
