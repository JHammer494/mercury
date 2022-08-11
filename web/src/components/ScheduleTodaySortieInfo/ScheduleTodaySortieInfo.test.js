import { render } from '@redwoodjs/testing/web'

import ScheduleTodaySortieInfo from './ScheduleTodaySortieInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScheduleTodaySortieInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScheduleTodaySortieInfo />)
    }).not.toThrow()
  })
})
