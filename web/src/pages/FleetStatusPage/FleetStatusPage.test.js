import { render } from '@redwoodjs/testing/web'

import FleetStatusPage from './FleetStatusPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FleetStatusPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FleetStatusPage />)
    }).not.toThrow()
  })
})
