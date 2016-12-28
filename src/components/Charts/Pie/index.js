import React from 'react'
import { Component, PropTypes } from 'core'
import classes from 'classnames'
import TransitionGroup from 'react-addons-css-transition-group'
import {
  Pie, PieChart, ResponsiveContainer, Sector
} from 'recharts'
import Box from './Box'
import './index.sass'

export default class ChartView extends Component {
  static displayName = 'ChartView'
  static defaultState = {
    activeIndex: 0
  }
  onPieEnter (data, index) {
    this.setState({
      activeIndex: index
    })
  }
  renderActiveShape (props) {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  render() {
    const data = [
      {
        name: 'test',
        value: 100
      },
      {
        name: 'blue',
        value: 240
      }
    ]
    return (
      <div className='chart-view'>
        <div className='chart-wrapper'>
          <ResponsiveContainer>
            <PieChart
              onMouseEnter={this.onPieEnter}>
              <Pie
                fill='#15A0D7'
                isAnimationActive={false}
                innerRadius={60}
                data={data}
                activeIndex={this.state.activeIndex}
                activeShape={this.renderActiveShape}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}
