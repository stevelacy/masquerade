import React from 'react'
import { PropTypes, Component } from 'core'
import classNames from 'classnames'
import './index.sass'

export class Title extends Component {
  static displayName = 'Title'
  static propTypes = {
    className: PropTypes.string,
    uppercase: PropTypes.bool
  }
  render () {
    const { uppercase, ...reset } = this.props
    const ourClass = classNames('title-component', this.props.className, {
      uppercase
    })
    return <div {...reset} className={ourClass} />
  }
}

export default Title
