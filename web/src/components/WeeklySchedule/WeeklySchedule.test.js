import { render } from '@redwoodjs/testing/web'

import WeeklySchedule from './WeeklySchedule'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WeeklySchedule', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WeeklySchedule />)
    }).not.toThrow()
  })
})
