import React from 'react'
import { Component } from 'core'
import update from 'immutability-helper'
import MapGl from 'react-map-gl'
import './index.sass'

const accessToken = 'pk.eyJ1Ijoic3RldmVsYWN5IiwiYSI6ImNpdmtpejc4NTA4NmUyb2x2YTB5cnlremgifQ.KsPYeRPvv5AJKF3g84LOHg'
const mapStyle = 'mapbox://styles/stevelacy/civkk44n1007t2kqqewcqsa4k'


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
    this.setState({
      viewport: update(this.state.viewport, { $merge: viewport })
    })
  }

  handleMapLoad (e) {
    if (!e) return
    this.setState({
      viewport: update(this.state.viewport, {$merge: { width: e.offsetWidth }})
    })
  }

  render() {
    return (
      <div
        ref={this.handleMapLoad}
        className='map-view'>
        <MapGl
          height={400}
          mapStyle={mapStyle}
          mapboxApiAccessToken={accessToken}
          onChangeViewport={this.handleViewportChange}
          {...this.state.viewport} />
      </div>
    )
  }
}
