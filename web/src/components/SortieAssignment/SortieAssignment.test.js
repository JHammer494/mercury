import { render } from '@redwoodjs/testing/web'

import SortieAssignment from './SortieAssignment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SortieAssignment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortieAssignment />)
    }).not.toThrow()
  })
})
