import React from 'react'
import { Component, PropTypes, connect } from 'core'
import classes from 'classnames'
import TransitionGroup from 'react-addons-css-transition-group'
import actions from 'core/actions'
import Box from './Box'
import './index.sass'

@connect({
  count: 'counter.count'
})
export default class IndexView extends Component {
  static displayName = 'IndexView'
  static defaultState = {
    show: false
  }
  static propTypes = {
    count: PropTypes.number.isRequired
  }

  showBox () {
    this.setState({show: !this.state.show})
    actions.counter.increment()
  }

  render() {
    return (
      <div className='home-view'>
        {this.props.count}
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
