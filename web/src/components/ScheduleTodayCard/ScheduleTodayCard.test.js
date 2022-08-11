import { render } from '@redwoodjs/testing/web'

import ScheduleTodayCard from './ScheduleTodayCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScheduleTodayCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScheduleTodayCard />)
    }).not.toThrow()
  })
})
