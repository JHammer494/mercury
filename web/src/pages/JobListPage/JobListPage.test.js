import { render } from '@redwoodjs/testing/web'

import JobListPage from './JobListPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('JobListPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<JobListPage />)
    }).not.toThrow()
  })
})
