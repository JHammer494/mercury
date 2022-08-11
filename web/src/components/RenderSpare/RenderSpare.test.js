import { render } from '@redwoodjs/testing/web'

import RenderSpare from './RenderSpare'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RenderSpare', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RenderSpare />)
    }).not.toThrow()
  })
})
