import React from 'react'
import { Component, PropTypes } from 'core'
import { Flex, Box } from 'reflexbox'
import Toggle from 'components/Toggle'
import Title from 'components/Title'
import './index.sass'

export default class SourcesView extends Component {
  static displayName = 'SourcesView'
  static propTypes = {
    services: PropTypes.array.isRequired
  }
  static defaultProps = {
    services: []
  }
  onToggle (source, enabled) {
    console.log(source, enabled)
  }
  renderSource (source) {
    return (
      <Flex
        p={2}
        className='source-box'
        align='center'
        key={source.name}>
        <Box col={3} p={1}> {source.name} </Box>
        <Toggle
          checked={source.enabled}
          onChange={(enabled) => this.onToggle(source, enabled)} />
      </Flex>
    )
  }
  render () {
    return (
      <Flex column p={2} className='services-view'>
        <Title>Enabled Services </Title>
        <Flex
          className='services-table'
          column
          p={2}
          mt={2}>
          {this.props.services.map(this.renderSource)}
        </Flex>
      </Flex>
    )
  }
}
