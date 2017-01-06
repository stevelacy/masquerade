import React from 'react'
import { Component, PropTypes } from 'core'
import { Flex, Box } from 'reflexbox'
import Toggle from 'components/Toggle'
import Title from 'components/Title'
import Button from 'components/Button'
import './index.sass'

export default class ServicesView extends Component {
  static displayName = 'ServicesView'
  static propTypes = {
    services: PropTypes.array.isRequired
  }
  static defaultProps = {
    services: []
  }
  static defaultState = {
    selectedService: {}
  }

  onToggle (service, enabled) {
    console.log(service, enabled)
  }

  onToggleSettings (selectedService) {
    if (this.state.selectedService.id) {
      return this.setState({ selectedService: {} })
    }
    this.setState({ selectedService })
  }

  renderServiceSettings (service) {
    if (this.state.selectedService.id !== service.id) return null
    return (
      <div
        className='service-expand-box'>
        <input name='client_secret' value={service.client_secret} />
        <input name='client_secret' value={service.client_secret} />
        <Button onClick={this.saveService}> save </Button>
      </div>
    )
  }

  renderService (service) {
    return (
      <Flex
        p={2}
        className='service-box'
        onClick={() => this.onToggleSettings(service)}
        key={service.name}>
        <Flex className='service-info'>
          <Box col={3} p={1}> {service.name} </Box>
          <Toggle
            checked={service.enabled}
            onChange={(enabled) => this.onToggle(service, enabled)} />
        </Flex>
        {
          this.renderServiceSettings(service)
        }
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
          {this.props.services.map(this.renderService)}
        </Flex>
      </Flex>
    )
  }
}
