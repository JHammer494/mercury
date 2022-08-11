import { render } from '@redwoodjs/testing/web'

import AircraftDetailsLayout from './AircraftDetailsLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AircraftDetailsLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AircraftDetailsLayout />)
    }).not.toThrow()
  })
})
