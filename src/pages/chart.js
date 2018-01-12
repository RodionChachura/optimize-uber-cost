import React from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts'

import ChartNavbar from '../components/chart-navbar'
import { connectTo } from '../utils/generic'
import * as actions from '../actions'

export default connectTo(
  state => state,
  actions,
  ({ toStart, currency, prices }) => {
    const chartNavbarProps = { toStart, currency, prices }
    const data = prices.map((price, index) => ({ price, index }))
    return (
      <div className="chart page">
        <ChartNavbar {...chartNavbarProps} />
        <LineChart
          data={data}
          width={window.innerWidth}
          height={window.innerHeight - 200}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </div>
    )
  }
)
