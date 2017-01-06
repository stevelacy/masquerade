import React from 'react'
import { fromJS, List } from 'immutable'
import { Component } from 'core'
import TimeAgo from 'react-timeago'
import moment from 'moment'
import css from 'classnames'
import { Icon } from 'react-fa'
import Title from 'components/Title'
import './index.sass'

const serviceIcons = {
  facebook: true,
  foursquare: true,
  github: true,
  swarm: false
}

const eventsSource = fromJS([
  {
    id: 'event-124',
    name: 'Checked in at Pomo Pizzeria',
    image: 'https://lh3.googleusercontent.com/-IKQiZ5dzkZo/Vo2bCRTsv8I/AAAAAAAAACE/KgUXc80kHssjC4VnDAvqax6yId1_e4T2ACJkC/w80-h92-p-k-no/',
    userId: '1',
    service: 'swarm',
    dateRecorded: 'Fri Dec 30 2016 15:45:33 GMT-0700 (MST)',
    location: {
      id: 'loc-13',
      lat: 33.456021,
      lon: -112.072372,
      name: 'Pomo Pizzeria'
    }
  },
  {
    id: 'event-123',
    name: 'Checked in at Piestewa Peak',
    image: 'http://1.bp.blogspot.com/-zqeUtxb6ags/UH-QdDASWjI/AAAAAAAAGiU/Tcs-O3VkrTc/s1600/DSCN2051.JPG',
    userId: '1',
    service: 'facebook',
    dateRecorded: 'Fri Dec 30 2016 15:00:33 GMT-0700 (MST)',
    location: {
      id: 'loc-12',
      lat: 33.547367,
      lon: -112.020838,
      name: 'Piestewa Peak'
    }
  },
  {
    id: 'event-122',
    name: 'Checked in at Infusion Coffee and Tea',
    image: 'http://st.hzcdn.com/simgs/78b187e201acf913_4-3324/industrial-espresso-coffee-machines.jpg',
    userId: '1',
    service: 'swarm',
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
    id: 'event-121',
    name: 'Checked in at Infusion Coffee and Tea',
    image: 'http://st.hzcdn.com/simgs/78b187e201acf913_4-3324/industrial-espresso-coffee-machines.jpg',
    userId: '1',
    service: 'facebook',
    dateRecorded: 'Fri Dec 23 2016 15:59:33 GMT-0700 (MST)',
    location: {
      id: 'loc-12',
      lat: 33.419521,
      lon: -111.916878,
      name: 'Infusion Coffee and Tea'
    },
    friends: [
      {
        name: 'James W'
      }
    ]
  }
])

export default class TimelineView extends Component {
  static displayName = 'TimelineView'
  static defaultState = {
    events: List([])
  }

  componentDidMount () {
    const events = eventsSource.groupBy((item) =>
      moment(new Date(item.get('dateRecorded')))
        .startOf('hour')
        .format('MM:DD:HH')
    ).toArray()
    this.setState({ events })
  }

  renderEvent (opts, index) {
    const service = opts.get('service')
    const serviceIcon = serviceIcons[service]
      ? <Icon name={service} />
      : <div> {String(service.charAt(0)).toUpperCase()} </div>

    return (
      <div className='event-content' key={opts.get('id')}>
        <div
          style={{
            backgroundImage: `url(${opts.get('image')})`
          }}
          className='event-image'>
          <div
            title={service}
            className={css('event-service-image', service)}>
            {serviceIcon}
          </div>
        </div>

        {opts.get('name')}
        {opts.get('friends') && <div className='event-friends'>
          with -
          {opts.get('friends').map((friend, i) => {
            return (
              <span className='event-friends' key={i}>
                {i > 0 && ', '}
                {friend.get('name')}
              </span>
            )
          })}
        </div>
        }
      </div>

    )
  }

  renderEvents (opts, index) {
    console.log(opts.toJS(), index)
    const eventBreak = <div className='event-prefix'>
      <div className='event-break' />
      <TimeAgo date={opts.getIn([0, 'dateRecorded'])} />
      <div className='event-break small' />
    </div>

    return (
      <div className='event-component-wrapper' key={opts.getIn([0, 'id'])}>
        {eventBreak}
        <div className='event-component'>
          {opts.map(this.renderEvent)}
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='timeline-view'>
        <div className='events-component'>
          <Title> Timeline </Title>
          {this.state.events.map(this.renderEvents)}
        </div>
      </div>
    )
  }
}
