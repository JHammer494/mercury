import { render } from '@redwoodjs/testing/web'

import ScheduleBuilderPage from './ScheduleBuilderPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ScheduleBuilderPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScheduleBuilderPage />)
    }).not.toThrow()
  })
})
