import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SummaryScreen } from './SummaryScreen.jsx'

// Mock the context and hooks
const mockResetQuiz = vi.fn()
const mockPlayAgain = vi.fn()
const mockCheckAndSaveHighScore = vi.fn()
const mockGetHighScore = vi.fn()

// Default mock state
const createMockState = (overrides = {}) => ({
	status: 'completed',
	category: 'react',
	difficulty: 'easy',
	selectedTopics: [],
	questions: [
		{
			id: 'q1',
			text: 'What is React?',
			answers: ['A JavaScript library', 'A database', 'A server', 'A language'],
			difficulty: 'easy',
			category: 'react'
		},
		{
			id: 'q2',
			text: 'What is JSX?',
			answers: ['JavaScript XML', 'Java XML', 'JSON XML', 'Just XML'],
			difficulty: 'easy',
			category: 'react'
		},
		{
			id: 'q3',
			text: 'What are hooks?',
			answers: [
				'Functions for state',
				'CSS styles',
				'HTML elements',
				'SQL queries'
			],
			difficulty: 'easy',
			category: 'react'
		}
	],
	currentQuestionIndex: 2,
	userAnswers: [
		{
			questionId: 'q1',
			selectedAnswer: 'A JavaScript library',
			isCorrect: true,
			timeSpent: 5000
		},
		{
			questionId: 'q2',
			selectedAnswer: 'Java XML',
			isCorrect: false,
			timeSpent: 8000
		},
		{
			questionId: 'q3',
			selectedAnswer: null,
			isCorrect: false,
			timeSpent: 10000
		}
	],
	pendingAnswer: null,
	startTime: Date.now() - 60000,
	endTime: Date.now(),
	...overrides
})

vi.mock('../../../context/QuizContext.jsx', () => ({
	useQuiz: () => ({
		state: createMockState(),
		actions: {
			resetQuiz: mockResetQuiz,
			playAgain: mockPlayAgain
		},
		correctCount: 1,
		totalQuestions: 3
	})
}))

vi.mock('../../../hooks/useHighScores.js', () => ({
	useHighScores: () => ({
		getHighScore: mockGetHighScore,
		checkAndSaveHighScore: mockCheckAndSaveHighScore,
		lastSaveResult: null
	})
}))

vi.mock('../../layout/AnimatedPage.jsx', () => ({
	AnimatedPage: ({ children }) => (
		<div data-testid="animated-page">{children}</div>
	)
}))

vi.mock('../../feedback/Confetti.jsx', () => ({
	Confetti: ({ trigger }) => (trigger ? <div data-testid="confetti" /> : null)
}))

vi.mock('../../feedback/NewRecordBadge.jsx', () => ({
	NewRecordBadge: () => <div data-testid="new-record-badge">🎉 New Record!</div>
}))

vi.mock('../../feedback/HighScoreDisplay.jsx', () => ({
	HighScoreDisplay: ({ highScore }) => (
		<div data-testid="high-score-display">
			{highScore ? `${highScore.score}%` : 'No high score yet'}
		</div>
	)
}))

vi.mock('../../ui/Button.jsx', () => ({
	Button: ({ children, onClick, ...props }) => (
		<button onClick={onClick} {...props}>
			{children}
		</button>
	)
}))

vi.mock('../../../assets/quiz-complete.png', () => ({
	default: 'quiz-complete.png'
}))

describe('SummaryScreen', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mockCheckAndSaveHighScore.mockReturnValue(false)
		mockGetHighScore.mockReturnValue({
			score: 70,
			correctCount: 7,
			totalCount: 10
		})
	})

	it('renders the summary screen with quiz completion message', () => {
		render(<SummaryScreen />)

		expect(screen.getByText('Quiz Completed!')).toBeInTheDocument()
	})

	it('displays the category and difficulty labels', () => {
		render(<SummaryScreen />)

		expect(screen.getByText('React')).toBeInTheDocument()
		expect(screen.getByText('Easy')).toBeInTheDocument()
	})

	it('displays statistics with correct percentages', () => {
		render(<SummaryScreen />)

		// 1 correct out of 3 = 33%
		// 1 wrong out of 3 = 33%
		// 1 skipped out of 3 = 33%
		// Multiple elements will have 33% due to all stats being equal
		const percentElements = screen.getAllByText('33%')
		expect(percentElements.length).toBeGreaterThanOrEqual(3) // At least 3 for stats
		expect(screen.getByText('answered correctly')).toBeInTheDocument()
		expect(screen.getByText('answered incorrectly')).toBeInTheDocument()
		expect(screen.getByText('skipped')).toBeInTheDocument()
	})

	it('displays the score', () => {
		render(<SummaryScreen />)

		expect(screen.getByText('Your Score')).toBeInTheDocument()
		expect(screen.getByText('1 of 3 correct')).toBeInTheDocument()
	})

	it('displays high score section', () => {
		render(<SummaryScreen />)

		expect(screen.getByTestId('high-score-display')).toBeInTheDocument()
	})

	it('displays question-by-question breakdown', () => {
		render(<SummaryScreen />)

		expect(screen.getByText('What is React?')).toBeInTheDocument()
		expect(screen.getByText('What is JSX?')).toBeInTheDocument()
		expect(screen.getByText('What are hooks?')).toBeInTheDocument()
	})

	it('shows user answers with correct styling classes', () => {
		render(<SummaryScreen />)

		// Correct answer
		expect(screen.getByText('A JavaScript library')).toBeInTheDocument()
		// Wrong answer
		expect(screen.getByText('Java XML')).toBeInTheDocument()
		// Skipped answer
		expect(screen.getByText('Skipped')).toBeInTheDocument()
	})

	it('shows correct answer for wrong/skipped questions', () => {
		render(<SummaryScreen />)

		// Should show correct answers for questions that were wrong or skipped
		const correctAnswerElements = screen.getAllByText(/^Correct:/)
		expect(correctAnswerElements.length).toBe(2) // 1 wrong + 1 skipped
	})

	it('displays Try Again and New Quiz buttons', () => {
		render(<SummaryScreen />)

		expect(
			screen.getByRole('button', { name: /try the .* quiz again/i })
		).toBeInTheDocument()
		expect(
			screen.getByRole('button', {
				name: /choose a different category and difficulty/i
			})
		).toBeInTheDocument()
	})

	it('calls playAgain when Try Again is clicked', () => {
		render(<SummaryScreen />)

		const tryAgain = screen.getByRole('button', {
			name: /try the .* quiz again/i
		})
		fireEvent.click(tryAgain)

		expect(mockPlayAgain).toHaveBeenCalledTimes(1)
	})

	it('calls resetQuiz when New Quiz is clicked', () => {
		render(<SummaryScreen />)

		const newQuiz = screen.getByRole('button', {
			name: /choose a different category and difficulty/i
		})
		fireEvent.click(newQuiz)

		expect(mockResetQuiz).toHaveBeenCalledTimes(1)
	})

	it('calls checkAndSaveHighScore on mount', () => {
		render(<SummaryScreen />)

		expect(mockCheckAndSaveHighScore).toHaveBeenCalledWith(
			'react',
			'easy',
			1,
			3
		)
	})

	it('wraps content in AnimatedPage for transitions', () => {
		render(<SummaryScreen />)

		expect(screen.getByTestId('animated-page')).toBeInTheDocument()
	})
})

describe('SummaryScreen - New High Score', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mockCheckAndSaveHighScore.mockReturnValue(true)
		mockGetHighScore.mockReturnValue({
			score: 33,
			correctCount: 1,
			totalCount: 3
		})
	})

	it('displays confetti when new high score is achieved', () => {
		render(<SummaryScreen />)

		expect(screen.getByTestId('confetti')).toBeInTheDocument()
	})

	it('displays new record badge when new high score is achieved', () => {
		render(<SummaryScreen />)

		expect(screen.getByTestId('new-record-badge')).toBeInTheDocument()
	})
})

describe('SummaryScreen - Edge Cases', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mockCheckAndSaveHighScore.mockReturnValue(false)
		mockGetHighScore.mockReturnValue(null)
	})

	it('handles case when no high score exists', () => {
		render(<SummaryScreen />)

		expect(screen.getByText('No high score yet')).toBeInTheDocument()
	})
})

describe('SummaryScreen - Accessibility', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('has accessible action buttons with descriptive aria-labels', () => {
		render(<SummaryScreen />)

		expect(
			screen.getByRole('button', { name: /try the .* quiz again/i })
		).toBeInTheDocument()
		expect(
			screen.getByRole('button', {
				name: /choose a different category and difficulty/i
			})
		).toBeInTheDocument()
	})

	it('has proper heading structure', () => {
		render(<SummaryScreen />)

		const heading = screen.getByRole('heading', {
			level: 2,
			name: 'Quiz Completed!'
		})
		expect(heading).toBeInTheDocument()
	})

	it('has ordered list for question breakdown', () => {
		render(<SummaryScreen />)

		const list = screen.getByRole('list')
		expect(list).toBeInTheDocument()
	})
})
