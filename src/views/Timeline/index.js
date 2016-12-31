import React from 'react'
import { fromJS, List } from 'immutable'
import { Component } from 'core'
import TimeAgo from 'react-timeago'
import css from 'classnames'
import { Icon } from 'react-fa'
import Title from 'components/Title'
import './index.sass'

const events = fromJS([
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
  },
  {
    id: 'event-123',
    name: 'Checked in at Piestewa Peak',
    image: 'http://1.bp.blogspot.com/-zqeUtxb6ags/UH-QdDASWjI/AAAAAAAAGiU/Tcs-O3VkrTc/s1600/DSCN2051.JPG',
    userId: '1',
    source: 'facebook',
    dateRecorded: 'Mon Dec 30 2016 14:30:33 GMT-0700 (MST)',
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
  }
])

export default class TimelineView extends Component {
  static displayName = 'TimelineView'
  static defaultState = {
    events: List([])
  }

  componentDidMount () {
    this.setState({ events })
  }

  renderEvent (opts, index) {
    const next = this.state.events.get(index + 1)
    const prior = this.state.events.get(index - 1)
    const currentDate = new Date(opts.get('dateRecorded'))

    let groupPrior = false
    // let groupNext = false

    if (prior && index - 1 >= 0) {
      const date = new Date(prior.get('dateRecorded'))
      const diff = (date - currentDate) / 1000 / 60 / 60
      console.log(diff)
      if (diff < 2) {
        groupPrior = true
      }
    }
    // if (next) {
    //   const date = new Date(next.get('dateRecorded'))
    //   const diff = (currentDate - date) / 1000 / 60 / 60
    //   if (diff < 2) {
    //     groupNext = true
    //   }
    // }

    const eventBreak = <div className='event-prefix'>
      <div className='event-break' />
      <TimeAgo date={opts.get('dateRecorded')} />
      <div className='event-break small' />
    </div>

    return (
      <div className='event-component' key={opts.get('id')}>
        {groupPrior ? <div className='event-break small' /> : eventBreak}
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
                <span className='event-friends' key={i}>
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
      <div className='timeline-view'>
        <div className='events-component'>
          <Title> Timeline </Title>
          {this.state.events.map(this.renderEvent)}
        </div>
      </div>
    )
  }
}
