import React from 'react'
import { fromJS } from 'immutable'
import { Component } from 'core'
import TimeAgo from 'react-timeago'
import css from 'classnames'
import { Icon } from 'react-fa'
import Map from 'components/Map'
import Title from 'components/Title'
import './index.sass'

const locations = fromJS([
  [-112.023856, 33.535649],
  [-112.030343, 33.512322],
  [-112.049836, 33.565902],
  [-112.158856, 33.549022]
])

const SIDEBAR_WIDTH = 200

const events = fromJS([
  {
    id: 'event-123',
    name: 'Checked in at Infusion Coffee and Tea',
    image: 'http://st.hzcdn.com/simgs/78b187e201acf913_4-3324/industrial-espresso-coffee-machines.jpg',
    userId: '1',
    source: 'facebook',
    dateRecorded: 'Mon Dec 25 2016 15:59:33 GMT-0700 (MST)',
    location: {
      id: 'loc-12',
      lat: 33.419521,
      lon: -111.916878,
      name: 'Infusion Coffee and Tea'
    },
    friends: [
      {
        name: 'James W'
      },
      {
        name: 'Sarah G'
      }
    ]
  },
  {
    id: 'event-124',
    name: 'Checked in at Pomo Pizzeria',
    image: 'https://lh3.googleusercontent.com/-IKQiZ5dzkZo/Vo2bCRTsv8I/AAAAAAAAACE/KgUXc80kHssjC4VnDAvqax6yId1_e4T2ACJkC/w80-h92-p-k-no/',
    userId: '1',
    source: 'foursquare',
    dateRecorded: 'Fri Dec 30 2016 15:59:33 GMT-0700 (MST)',
    location: {
      id: 'loc-13',
      lat: 33.456021,
      lon: -112.072372,
      name: 'Pomo Pizzeria'
    }
  }
])

export default class IndexView extends Component {
  static displayName = 'IndexView'
  static propTypes = {
  }

  static defaultState = {
    width: window.innerWidth - SIDEBAR_WIDTH,
    height: 500
  }

  updateBounds () {
    this.setState({
      width: window.innerWidth - SIDEBAR_WIDTH
    })
  }

  componentWillMount () {
    this.updateBounds()
    window.addEventListener('resize', this.updateBounds)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateBounds)
  }

  renderEvent (opts) {
    return (
      <div className='event-component' key={opts.get('id')}>
        <div className='event-prefix break' />
        <TimeAgo date={opts.get('dateRecorded')} />
        <div className='event-prefix' />
        <div className='event-content'>
          <div
            style={{
              backgroundImage: `url(${opts.get('image')})`
            }}
            className='event-image'>
            <div className={css('event-source-image', opts.get('source'))}>
              <Icon name={opts.get('source')} />
            </div>
          </div>

          {opts.get('name')}
          {opts.get('friends') && <div className='event-friends'>
            with -
            {opts.get('friends').map((friend, i) => {
              return (
                <span className='event-friends'>
                  {i > 0 && ', '}
                  {friend.get('name')}
                </span>
              )
            })}
          </div>
          }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='index-view'>
        <Map
          height={this.state.height}
          width={this.state.width}
          locations={locations} />
        <div className='events-component'>
          <Title> Timeline </Title>
          {events.map(this.renderEvent)}
        </div>
      </div>
    )
  }
}
