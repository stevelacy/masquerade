import React, { PropTypes, Component } from 'react'
import ViewportMercator from 'viewport-mercator-project'

export default class SVGOverlay extends Component {
  static propTypes = {
    style: PropTypes.shape(),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    redraw: PropTypes.func.isRequired,
    locations: PropTypes.shape(),
    isDragging: PropTypes.bool
  }
  render () {
    const { width, height } = this.props
    const style = {
      pointerEvents: 'none',
      position: 'absolute',
      left: 0,
      top: 0,
      ...this.props.style
    }

    const mercator = ViewportMercator(this.props)
    const { project, unproject } = mercator

    return (
      <svg
        ref='overlay'
        width={ width }
        height={ height }
        style={ style }>
        { this.props.redraw({
          ...this.props,
          project,
          unproject
        })}
      </svg>
    )
  }
}
