import { render } from '@redwoodjs/testing/web'

import ScheduleTodayAircraftInfo from './ScheduleTodayAircraftInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScheduleTodayAircraftInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScheduleTodayAircraftInfo />)
    }).not.toThrow()
  })
})
