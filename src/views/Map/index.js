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
        latitude: 33.446204,
        longitude: -112.073388,
        zoom: 8,
        width: document.body.clientWidth
      }
    }
  }

  static displayName = 'MapView'

  componentDidMount () {
    window.addEventListener('resize', () =>
      this.setState({
        viewport: update(this.state.viewport, {
          $merge: {
            width: document.body.clientWidth
          }
        })
      })
    )
  }

  componentWillUnmount () {
    window.removeEventListener('resize')
  }

  handleViewportChange (viewport = {}) {
    this.setState({
      viewport: update(this.state.viewport, { $merge: viewport })
    })
  }

  render() {
    return (
      <div className='map-view'>
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
