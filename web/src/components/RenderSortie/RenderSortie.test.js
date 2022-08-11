import { render } from '@redwoodjs/testing/web'

import RenderSortie from './RenderSortie'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RenderSortie', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RenderSortie />)
    }).not.toThrow()
  })
})
