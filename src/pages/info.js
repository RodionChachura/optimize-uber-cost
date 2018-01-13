import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs'

import PersonalInfo from '../components/personal-info'
import { connectTo } from '../utils/generic'
import * as actions from '../actions'

const calcSecondsLeft = requestsHistory =>
  requestsHistory.length === 0 ? (Date.now() - requestsHistory[0]) / 1000 : 0

export default connectTo(
  state => state,
  actions,
  class Info extends React.Component {
    constructor(props) {
      super(props)
      this.state = { secondsLeft: calcSecondsLeft(props.requestsHistory) }
    }
    render() {
      return (
        <div className="info page">
          {this.state.secondsLeft > 1 ? (
            <h1>{this.state.secondsLeft} seconds left to wait</h1>
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
              <div className="content">
                <ol>
                  <li>
                    <a
                      href="https://developer.uber.com/dashboard/create"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      create your uber app
                    </a>
                  </li>
                  <li>
                    fill the fields and select <b>request</b> scope
                  </li>
                  <li>
                    go to the setting tabs in left menu and set{' '}
                    <b>https://rodionchachura.github.io</b> in origins URIs
                  </li>
                  <li>save all the changes</li>
                  <li>
                    go back to auth tab and click{' '}
                    <b>GENERATE NEW ACCESS TOKEN</b>
                  </li>
                </ol>
              </div>
            </Tab>
            <Tab label="About project" value="about">
              <div className="content">
                <h2>
                  Application in case you want to go somewhere but do not rush
                  (Build with React/Redux)
                </h2>
                <PersonalInfo />
              </div>
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
      this.setState({ secondsLeft: calcSecondsLeft(this.props) })
    }
  }
)
