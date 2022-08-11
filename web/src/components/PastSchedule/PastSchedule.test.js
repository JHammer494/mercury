import { render } from '@redwoodjs/testing/web'

import PastSchedule from './PastSchedule'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PastSchedule', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PastSchedule />)
    }).not.toThrow()
  })
})
