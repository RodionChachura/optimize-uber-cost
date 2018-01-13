import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line
} from 'recharts'

import ChartNavbar from '../components/chart-navbar'
import PersonalInfo from '../components/personal-info'
import { connectTo } from '../utils/generic'
import * as actions from '../actions'

export default connectTo(
  state => state,
  actions,
  ({ toStart, currency, prices }) => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
    const chartNavbarProps = { toStart, currency, prices }
    const data = prices.map((price, index) => ({ price, index }))
    return (
      <div className="chart page">
        <ChartNavbar {...chartNavbarProps} />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <PersonalInfo />
      </div>
    )
  }
)
