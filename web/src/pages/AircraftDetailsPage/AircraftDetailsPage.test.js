import { render } from '@redwoodjs/testing/web'

import AircraftDetailsPage from './AircraftDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AircraftDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AircraftDetailsPage />)
    }).not.toThrow()
  })
})
