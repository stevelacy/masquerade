import React from 'react'
import { Component } from 'core'
import { Flex } from 'reflexbox'
import Title from 'components/Title'
import './index.sass'

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
