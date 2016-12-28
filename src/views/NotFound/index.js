import React from 'react'
import { Link } from 'react-router'
import { Component } from 'core'
import DocumentMeta from 'react-document-meta'
import Title from 'components/Title'

export default class NotFoundView extends Component {
  static displayName = 'NotFoundView'
  render () {
    return (
      <div>
        <DocumentMeta title='404 - Not Found' />
        <Title className='large'>Not Found!</Title>
        <Title>
          <Link to='/'>Back To Home</Link>
        </Title>
      </div>
    )
  }
}
