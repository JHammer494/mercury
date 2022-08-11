import { render } from '@redwoodjs/testing/web'

import CalendarInspectionsCard from './CalendarInspectionsCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarInspectionsCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarInspectionsCard />)
    }).not.toThrow()
  })
})
