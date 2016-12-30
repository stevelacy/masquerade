import React from 'react'
import { PropTypes, Component } from 'core'
import classNames from 'classnames'
import './index.sass'

export class Toggle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: props.checked || false
    }
  }
  static displayName = 'Toggle'
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  }
  static defaultProps = {
    checked: false,
    onChange: () => {}
  }
  toggle () {
    const checked = !this.state.checked
    this.setState({ checked })
    this.props.onChange(checked)
  }
  render () {
    const ourClass = classNames(
      'toggle-component',
      this.props.className,
      { checked: this.state.checked }
    )
    return (
      <div
        className={ourClass}
        onClick={() => this.toggle()}>
        <div className='toggle-button' />
      </div>
    )
  }
}

export default Toggle
