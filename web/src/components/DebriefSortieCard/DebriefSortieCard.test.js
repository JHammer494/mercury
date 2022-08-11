import { render } from '@redwoodjs/testing/web'

import DebriefSortieCard from './DebriefSortieCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DebriefSortieCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DebriefSortieCard />)
    }).not.toThrow()
  })
})
