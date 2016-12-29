import React from 'react'
import { Component, PropTypes } from 'core'
import { Flex, Box, withReflex } from 'reflexbox'
import Title from 'components/Title'
import './index.sass'

const FlexImg = withReflex()((props) => <img {...props} />)

export default class SettingsView extends Component {
  static displayName = 'SettingsView'
  static propTypes = {
  }
  static defaultProps = {
  }

  render () {
    return (
      <Flex column p={2} className='settings-view'>
        <Title uppercase>settings </Title>
      </Flex>
    )
  }
}
