import React from 'react'
import { Component, PropTypes } from 'core'
import { Flex, Box, withReflex } from 'reflexbox'
import Title from 'components/Title'
import './index.sass'

const FlexImg = withReflex()((props) => <img {...props} />)

export default class SourcesView extends Component {
  static displayName = 'SourcesView'
  static propTypes = {
    sources: PropTypes.array.isRequired
  }
  static defaultProps = {
    sources: []
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
      <Flex column p={2} className='sources-view'>
        <Title uppercase>enabled sources </Title>
        <Flex
          column
          mt={2}>
          {this.props.sources.map(this.renderSource)}
        </Flex>
      </Flex>
    )
  }
}
