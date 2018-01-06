import React from 'react'

import * as pages from '../pages'
import { connectTo } from '../utils/generic'

const Root = ({ page }) => {
  const Page = pages[page]
  return (
    <div className="main-layout">
      <Page />
    </div>
  )
}

export default connectTo(state => ({ page: state.navigation.page }), {}, Root)
