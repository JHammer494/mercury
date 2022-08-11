import { render } from '@redwoodjs/testing/web'

import SortieDirectoryPage from './SortieDirectoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SortieDirectoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortieDirectoryPage />)
    }).not.toThrow()
  })
})
