import React from 'react'
import { Component, PropTypes, connect } from 'core'
import classes from 'classnames'
import TransitionGroup from 'react-addons-css-transition-group'
import actions from 'core/actions'
import './index.sass'

@connect({
  count: 'counter.count'
})
export default class IndexView extends Component {
  static displayName = 'IndexView'
  static propTypes = {
    count: PropTypes.number.isRequired
  }

  render() {
    return (
      <div className='home-view'>
        home
      </div>
    )
  }
}
