import { render } from '@redwoodjs/testing/web'

import HourlyInspectionsCard from './HourlyInspectionsCard.1'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HourlyInspectionsCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HourlyInspectionsCard />)
    }).not.toThrow()
  })
})
