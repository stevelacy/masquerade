import React from 'react'
import { PropTypes, Component } from 'core'
import classNames from 'classnames'
import './index.sass'

export class Button extends Component {
  static displayName = 'Button'
  static propTypes = {
    className: PropTypes.string,
    uppercase: PropTypes.bool
  }
  render () {
    const { uppercase, ...reset } = this.props
    const ourClass = classNames('button-component', this.props.className, {
      uppercase
    })
    return <div {...reset} className={ourClass} />
  }
}

export default Button
