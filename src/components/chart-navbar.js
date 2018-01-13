import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const priceColor = prices => {
  const best = Math.min(...prices)
  const worst = Math.max(...prices)
  const now = prices.last_()
  const ratio = now === best ? 0 : now === worst ? 1 : now - best / worst - best
  const hue = ((1 - ratio) * 120).toString(10)

  return `hsl(${hue},100%,50%)`
}

export default ({ toStart, currency, prices }) => {
  return (
    <div className="chart-navbar">
      <RaisedButton secondary onClick={toStart} label="Change ride" />
      <div className="price">
        <p>Price now</p>
        <h3 style={{ color: priceColor(prices) }}>
          {prices.last_()} {currency}
        </h3>
      </div>
    </div>
  )
}
