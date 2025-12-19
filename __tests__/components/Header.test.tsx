import { render, screen } from '@testing-library/react'
import { Header } from '@/components/Header'

describe('Header', () => {
    it('renders navigation links', () => {
        render(<Header />)

        expect(screen.getByText('Leistungen')).toBeInTheDocument()
        expect(screen.getByText('Team')).toBeInTheDocument()
        expect(screen.getByText('Partner')).toBeInTheDocument()
    })

    it('renders contact button', () => {
        render(<Header />)
        const button = screen.getByRole('link', { name: /kontakt/i })
        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('href', '/kontakt')
    })
})
