import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HighScoreDisplay } from './HighScoreDisplay'

describe('HighScoreDisplay', () => {
	it('renders "No high score yet" when highScore is null', () => {
		render(<HighScoreDisplay highScore={null} />)

		expect(screen.getByText('High Score')).toBeTruthy()
		expect(screen.getByText('No high score yet')).toBeTruthy()
	})

	it('renders "No high score yet" when highScore is undefined', () => {
		render(<HighScoreDisplay highScore={undefined} />)

		expect(screen.getByText('High Score')).toBeTruthy()
		expect(screen.getByText('No high score yet')).toBeTruthy()
	})

	it('renders the high score percentage when highScore is provided', () => {
		const highScore = { score: 85, correctCount: 17, totalCount: 20 }
		render(<HighScoreDisplay highScore={highScore} />)

		expect(screen.getByText('High Score')).toBeTruthy()
		expect(screen.getByText('85%')).toBeTruthy()
	})

	it('renders 0% when high score is 0', () => {
		const highScore = { score: 0, correctCount: 0, totalCount: 10 }
		render(<HighScoreDisplay highScore={highScore} />)

		expect(screen.getByText('0%')).toBeTruthy()
	})

	it('renders 100% when high score is perfect', () => {
		const highScore = { score: 100, correctCount: 10, totalCount: 10 }
		render(<HighScoreDisplay highScore={highScore} />)

		expect(screen.getByText('100%')).toBeTruthy()
	})

	it('has correct CSS classes for styling', () => {
		const { container } = render(<HighScoreDisplay highScore={{ score: 75 }} />)

		expect(container.querySelector('.high-score-display')).toBeTruthy()
		expect(container.querySelector('.high-score-display__label')).toBeTruthy()
		expect(container.querySelector('.high-score-display__value')).toBeTruthy()
	})
})
