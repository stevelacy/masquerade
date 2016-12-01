import React from 'react'
import { Component, PropTypes } from 'core'
import classes from 'classnames'
import TransitionGroup from 'react-addons-css-transition-group'
import Box from './Box'
import './index.sass'

export default class IndexView extends Component {
  static displayName = 'IndexView'
  static defaultState = {
    show: false
  }
  static propTypes = {
  }

  showBox () {
    this.setState({show: !this.state.show})
  }

  render() {
    return (
      <div className='home-view'>
        <button
          onClick={() => this.showBox()}>
          toggle
        </button>
        <TransitionGroup
          transitionName="box-animation"
          transitionEnterTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={300}>
          {this.state.show && <Box key='test' />}
        </TransitionGroup>
      </div>
    )
  }
}
