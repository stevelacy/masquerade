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

  renderSource (source) {
    return (
      <Flex
        p={2}
        className='source-box'
        align='center'
        mt={1}
        key={source.name}>
          <Box col={3} p={1}> {source.name} </Box>
          <FlexImg col={3} p={2} src={source.image} className='source-image' />
      </Flex>
    )
  }

  render () {
    return (
      <Flex column p={2} className='settings-view'>
        <Title uppercase>settings </Title>
      </Flex>
    )
  }
}
