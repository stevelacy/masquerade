import React from 'react'
import { Component, PropTypes, connect } from 'core'
import classes from 'classnames'
import actions from 'core/actions'
import './index.sass'

export default class Box extends Component {
  static displayName = 'Box'

  render() {
    return (
      <div className='box-view'>
      </div>
    )
  }
}
