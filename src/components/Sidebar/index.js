import React from 'react'
import { PropTypes, Component } from 'core'
import { Link } from 'react-router'
import Icon from 'components/Icon'
import css from 'classnames'
import './index.sass'

export class Sidebar extends Component {
  static displayName = 'Sidebar'
  static propTypes = {
    className: PropTypes.string,
    links: PropTypes.array
  }
  renderLink (opts) {
    return (
      <Link
        activeClassName='active'
        key={opts.href}
        className={css('link-item')}
        to={opts.href}>
        <Icon name={opts.icon} />
        {opts.text}
      </Link>
    )
  }
  render () {
    const { links, ...rest } = this.props
    const ourClass = css('sidebar-component', this.props.className)
    return (
      <div {...rest} className={ourClass}>
        <Link
          to='/'
          className='sidebar-header'>
          home
        </Link>
        {links.map(this.renderLink)}
      </div>
    )
  }
}

export default Sidebar
