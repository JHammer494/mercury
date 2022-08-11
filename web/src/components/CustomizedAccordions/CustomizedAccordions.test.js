import { render } from '@redwoodjs/testing/web'

import CustomizedAccordions from './CustomizedAccordions'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomizedAccordions', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomizedAccordions />)
    }).not.toThrow()
  })
})
