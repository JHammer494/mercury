import { render } from '@redwoodjs/testing/web'

import SortieInfo from './SortieInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SortieInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortieInfo />)
    }).not.toThrow()
  })
})
