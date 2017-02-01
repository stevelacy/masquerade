import React from 'react'
import { Component, PropTypes } from 'core'
import update from 'immutability-helper'
import MapGl from 'react-map-gl'
import { fromJS } from 'immutable'
import TransitionGroup from 'react-addons-css-transition-group'
import ScatterPlotOverlay from 'react-map-gl/dist/overlays/scatterplot.react'
import SvgOverlay from './overlays/SVGOverlay'
import MapNavOverlay from './overlays/MapNavOverlay'
import MapLoader from './overlays/MapLoader'
import pointPulse from './overlays/pointPulse'
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
        height: props.height,
        width: props.width
      },
      locations: props.locations
    }
  }

  static displayName = 'MapView'
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }
  static defaultProps = {
    locations: fromJS([])
  }
  static defaultState = {
    loaded: true
  }

  componentWillUpdate ({ width, height }) {
    if (width === this.state.viewport.width) return
    this.setState({
      viewport: update(this.state.viewport, {
        $merge: {
          height, width
        }
      })
    })
  }

  handleLoad () {
    // TODO: Enable this once react-map-gl lands the onLoad function
    this.setState({ loaded: true })
  }

  handleViewportChange (viewport = {}) {
    this.setState({
      viewport: update(this.state.viewport, { $merge: viewport })
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
      <div className='map-view'>
        <MapGl
          onLoad={this.handleLoad}
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
          <MapNavOverlay />
          <TransitionGroup
            transitionName='loader-animation'
            transitionEnterTimeout={0}
            transitionLeaveTimeout={1000}>
            {this.state.loaded && <MapLoader />}
          </TransitionGroup>
        </MapGl>
      </div>
    )
  }
}
