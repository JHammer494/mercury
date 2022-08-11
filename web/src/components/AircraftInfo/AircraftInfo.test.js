import { render } from '@redwoodjs/testing/web'

import AircraftInfo from './AircraftInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AircraftInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AircraftInfo />)
    }).not.toThrow()
  })
})
