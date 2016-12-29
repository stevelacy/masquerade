import React from 'react'
import { PropTypes, Component } from 'core'
import classNames from 'classnames'
import './index.sass'

export class Notification extends Component {
  static displayName = 'Notification'
  static propTypes = {
    className: PropTypes.string,
    cancel: PropTypes.func,
    notification: PropTypes.shape({
      message: PropTypes.string,
      title: PropTypes.string,
      type: PropTypes.oneOf(['info', 'error', 'success', 'warning'])
    })
  }
  static defaultProps = {
    notification: {
      type: 'info'
    }
  }
  render () {
    const { message, title, type } = this.props.notification
    if (!message) return null
    const ourClass = classNames(
      'notification-component',
      this.props.className,
      type
    )

    return (
      <div className={ourClass}>
        <div className='notification-title'>
          {title}
        </div>
        <div className='notification-title'>
          {message}
        </div>
        <div
          onClick={this.props.cancel}
          className='notification-cancel'>
          X
        </div>
      </div>
    )
  }
}

export default Notification
