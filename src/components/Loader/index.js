import React from 'react'
import { PropTypes, Component } from 'core'
import classNames from 'classnames'
import './index.sass'

export class Loader extends Component {
  static displayName = 'Loader'
  static propTypes = {
    className: PropTypes.string,
    full: PropTypes.bool
  }
  render () {
    const { full, ...rest} = this.props
    const ourClass = classNames('loader-component', this.props.className, {
      full
    })
    return (
      <div {...rest} className={ourClass}>
        <div className='cube-box'>
          <div className='cube1 cube' />
          <div className='cube2 cube' />
          <div className='cube4 cube' />
          <div className='cube3 cube' />
        </div>
        <div className='loader-title'>
          Loading...
        </div>
      </div>
    )
  }
}

export default Loader
