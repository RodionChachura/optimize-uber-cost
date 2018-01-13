import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs'

import { connectTo } from '../utils/generic'
import actions from '../actions'

export default connectTo(
  ({ prices }) => ({ prices }),
  actions,
  class Info extends React.Component {
    constructor(props) {
      super(props)
      this.state = { secondsLeft: Date.now() - this.props.prices[0] / 1000 }
    }
    render() {
      return (
        <div>
          {this.state.secondsLeft < 1 ? (
            <h1>{this.state.secondsLeft}</h1>
          ) : (
            <RaisedButton
              secondary
              onClick={this.props.toStart}
              label="To map"
            />
          )}
          <Tabs
            onChange={this.props.onChangeInfoTab}
            value={this.props.activeInfoTab}
          >
            <Tab label="API key" value="apiKey">
              <h1>Api key</h1>
            </Tab>
            <Tab label="About project" value="about">
              <h1>About</h1>
            </Tab>
          </Tabs>
        </div>
      )
    }
    componentDidMount() {
      this.interval = setInterval(this.tick, 1000)
    }
    componentWillUnmount() {
      clearInterval(this.interval)
    }
    tick = () => {
      const secondsLeft = Date.now() - this.props.prices[0] / 1000
      this.setState({ secondsLeft })
    }
  }
)
