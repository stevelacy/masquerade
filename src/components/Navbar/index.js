import React from 'react'
import { PropTypes, Component } from 'core'
import classNames from 'classnames'
import './index.sass'

export class Navbar extends Component {
  static displayName = 'Navbar'

  render() {
    const ourClass = classNames('navbar-component', this.props.className)
    return <div {...this.props} className={ourClass} />
  }
}

export default Navbar
