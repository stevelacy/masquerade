import React from 'react'
import { PropTypes, Component } from 'core'
import classNames from 'classnames'

export class Icon extends Component {
  static displayName = 'Icon'
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string
  }
  render () {
    const { name, ...reset } = this.props
    const ourClass = classNames('icon-component', this.props.className)
    return <i className={`fa fa-${name}`} />
  }
}

export default Icon
