import { render } from '@redwoodjs/testing/web'

import RenderInsp from './RenderInsp'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RenderInsp', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RenderInsp />)
    }).not.toThrow()
  })
})
