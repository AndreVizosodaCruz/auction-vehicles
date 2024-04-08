import Home from '@/pages'
import { render, screen } from '@testing-library/react'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})