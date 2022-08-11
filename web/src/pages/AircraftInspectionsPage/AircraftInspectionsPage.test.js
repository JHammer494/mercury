import { render } from '@redwoodjs/testing/web'

import AircraftInspectionsPage from './AircraftInspectionsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AircraftInspectionsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AircraftInspectionsPage />)
    }).not.toThrow()
  })
})
