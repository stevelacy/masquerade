import React from 'react'
import { Component } from 'core'
import update from 'immutability-helper'
import MapGl from 'react-map-gl'
import ScatterPlotOverlay from 'react-map-gl/dist/overlays/scatterplot.react'
import SvgOverlay from './SVGOverlay'
import pointPulse from 'components/Map/overlays/pointPulse'
import { fromJS } from 'immutable'
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
        width: 0,
        height: 0
      },
      locations: fromJS([
        [-112.023856, 33.535649],
        [-112.030343, 33.512322],
        [-112.049836, 33.565902],
        [-112.158856, 33.549022]
      ])
    }
  }

  static displayName = 'MapView'

  componentDidMount () {
    window.addEventListener('resize', this.setBounds)
  }

  componentWillUnmount () {
    window.removeEventListener('resize')
  }

  handleViewportChange (viewport = {}) {
    this.setState({
      viewport: update(this.state.viewport, { $merge: viewport })
    })
  }

  setBounds (element) {
    console.log(element.clientWidth)
    this.setState({
      viewport: update(this.state.viewport, {
        $merge: {
          height: element.clientHeight,
          width: element.clientWidth
        }
      })
    })
  }

  renderSvgLine (opt) {
    const pointString = this.state.locations.map(
      point => opt.project([point.get(0), point.get(1)])
    ).join('L')

    // this svg uses both inline style and css
    return (
      <svg>
        <path
          xlinkHref='svg-line'
          style={{stroke: '#1FBAD6'}}
          d={`M${pointString}`} />
      </svg>
    )
  }

  render () {
    return (
      <div className='map-view' ref={this.setBounds}>
        <MapGl
          mapStyle={mapStyle}
          mapboxApiAccessToken={accessToken}
          onChangeViewport={this.handleViewportChange}
          {...this.state.viewport}>
          <SvgOverlay
            {...this.state.viewport}
            redraw={this.renderSvgLine}
            isDragging={false}
          />
          <SvgOverlay
            {...this.state.viewport}
            locations={this.state.locations}
            redraw={pointPulse}
            isDragging={false}
          />
          <ScatterPlotOverlay
            {...this.state.viewport}
            locations={this.state.locations}
            dotRadius={6}
            globalOpacity={1}
            compositeOperation='screen'
            dotFill='#53dee4'
            renderWhileDragging
            isDragging={false}
          />
        </MapGl>
      </div>
    )
  }
}
