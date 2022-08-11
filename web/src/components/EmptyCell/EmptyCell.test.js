import { render } from '@redwoodjs/testing/web'

import EmptyCell from './EmptyCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EmptyCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmptyCell />)
    }).not.toThrow()
  })
})
