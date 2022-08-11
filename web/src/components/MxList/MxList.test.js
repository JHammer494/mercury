import { render } from '@redwoodjs/testing/web'

import MxList from './MxList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MxList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MxList />)
    }).not.toThrow()
  })
})
