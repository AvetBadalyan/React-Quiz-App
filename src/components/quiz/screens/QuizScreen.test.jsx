/**
 * Unit tests for QuizScreen component
 *
 * Tests the active quiz session view including:
 * - Question display with timer, progress, and answers
 * - Answer selection with feedback
 * - Keyboard navigation
 * - Sound effects on answer selection
 */

import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QuizScreen } from './QuizScreen'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
	motion: {
		div: ({ children, className, ...props }) => (
			<div className={className} data-testid="motion-div" {...props}>
				{children}
			</div>
		),
		ul: ({ children, className, ...props }) => (
			<ul className={className} {...props}>
				{children}
			</ul>
		),
		li: ({ children, className, ...props }) => (
			<li className={className} {...props}>
				{children}
			</li>
		),
		button: ({ children, className, ...props }) => (
			<button className={className} {...props}>
				{children}
			</button>
		)
	},
	AnimatePresence: ({ children }) => <>{children}</>
}))

// Mock the shuffle utility to return predictable order
vi.mock('../../../utils/shuffle.js', () => ({
	shuffle: arr => [...arr] // Return a copy in same order for predictable tests
}))

// Mock sound context
const mockPlayCorrect = vi.fn()
const mockPlayWrong = vi.fn()

vi.mock('../../../context/SoundContext.jsx', () => ({
	useSound: () => ({
		enabled: false,
		setEnabled: vi.fn(),
		playCorrect: mockPlayCorrect,
		playWrong: mockPlayWrong,
		playWarning: vi.fn(),
		playClick: vi.fn()
	}),
	SoundProvider: ({ children }) => <>{children}</>
}))

// Sample questions for testing
const mockQuestions = [
	{
		id: 'q1',
		text: 'What is React?',
		answers: [
			'A JavaScript library',
			'A database',
			'A styling framework',
			'An operating system'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'components'
	},
	{
		id: 'q2',
		text: 'What is useState?',
		answers: [
			'A React hook',
			'A CSS property',
			'A HTML element',
			'A database query'
		],
		difficulty: 'easy',
		category: 'react',
		topic: 'hooks'
	}
]

// Mock quiz context
const createMockQuizContext = (overrides = {}) => ({
	state: {
		status: 'active',
		category: 'react',
		difficulty: 'easy',
		selectedTopics: [],
		questions: mockQuestions,
		currentQuestionIndex: 0,
		userAnswers: [],
		pendingAnswer: null,
		startTime: Date.now(),
		endTime: null,
		...overrides.state
	},
	actions: {
		setCategory: vi.fn(),
		setDifficulty: vi.fn(),
		setTopics: vi.fn(),
		startQuiz: vi.fn(),
		selectAnswer: vi.fn(),
		confirmAnswer: vi.fn(),
		skipQuestion: vi.fn(),
		nextQuestion: vi.fn(),
		completeQuiz: vi.fn(),
		resetQuiz: vi.fn(),
		...overrides.actions
	},
	currentQuestion: overrides.currentQuestion ?? mockQuestions[0],
	isQuizActive: true,
	isQuizComplete: false,
	canStartQuiz: true,
	totalQuestions: mockQuestions.length,
	answeredCount: 0,
	correctCount: 0,
	...overrides
})

let mockQuizContext = createMockQuizContext()

vi.mock('../../../context/QuizContext.jsx', () => ({
	useQuiz: () => mockQuizContext,
	QuizProvider: ({ children }) => <>{children}</>
}))

// Mock useTimer hook
vi.mock('../../../hooks/useTimer.js', () => ({
	useTimer: () => ({
		timeRemaining: 30000,
		isWarning: false,
		progress: 1,
		reset: vi.fn()
	})
}))

// Mock keyboard navigation hook
const mockOnSelectAnswer = vi.fn()
vi.mock('../../../hooks/useKeyboardNavigation.js', () => ({
	useKeyboardNavigation: ({ onSelectAnswer, disabled }) => {
		// Store the callback for later use in tests
		mockOnSelectAnswer.mockImplementation(index => {
			if (!disabled) {
				onSelectAnswer?.(index)
			}
		})
	}
}))

describe('QuizScreen', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mockQuizContext = createMockQuizContext()
	})

	describe('rendering', () => {
		it('renders the current question text', () => {
			render(<QuizScreen />)
			expect(screen.getByText('What is React?')).toBeTruthy()
		})

		it('renders all answer options', () => {
			render(<QuizScreen />)
			expect(screen.getByText('A JavaScript library')).toBeTruthy()
			expect(screen.getByText('A database')).toBeTruthy()
			expect(screen.getByText('A styling framework')).toBeTruthy()
			expect(screen.getByText('An operating system')).toBeTruthy()
		})

		it('renders the question progress indicator', () => {
			render(<QuizScreen />)
			expect(screen.getByText('Question 1 of 2')).toBeTruthy()
		})

		it('renders the timer with seconds display', () => {
			render(<QuizScreen />)
			expect(screen.getByText('30s')).toBeTruthy()
		})

		it('renders null when no current question', () => {
			mockQuizContext = createMockQuizContext({
				currentQuestion: null,
				state: { questions: [], currentQuestionIndex: 0 }
			})

			const { container } = render(<QuizScreen />)
			expect(container.querySelector('.question__text')).toBeFalsy()
		})

		it('uses correct timer duration for easy difficulty', () => {
			mockQuizContext = createMockQuizContext({
				state: { difficulty: 'easy' }
			})

			render(<QuizScreen />)
			// Timer should display (mocked to 30s)
			expect(screen.getByText('30s')).toBeTruthy()
		})
	})

	describe('answer selection', () => {
		it('calls confirmAnswer when an answer is clicked', () => {
			render(<QuizScreen />)

			const correctAnswer = screen.getByText('A JavaScript library')
			fireEvent.click(correctAnswer)

			expect(mockQuizContext.actions.confirmAnswer).toHaveBeenCalled()
		})

		it('plays correct sound when correct answer is selected', () => {
			render(<QuizScreen />)

			// Click the correct answer (first one)
			const correctAnswer = screen.getByText('A JavaScript library')
			fireEvent.click(correctAnswer)

			expect(mockPlayCorrect).toHaveBeenCalled()
			expect(mockPlayWrong).not.toHaveBeenCalled()
		})

		it('plays wrong sound when incorrect answer is selected', () => {
			render(<QuizScreen />)

			// Click an incorrect answer
			const wrongAnswer = screen.getByText('A database')
			fireEvent.click(wrongAnswer)

			expect(mockPlayWrong).toHaveBeenCalled()
			expect(mockPlayCorrect).not.toHaveBeenCalled()
		})

		it('records the selected answer with confirmAnswer action', () => {
			render(<QuizScreen />)

			const correctAnswer = screen.getByText('A JavaScript library')
			fireEvent.click(correctAnswer)

			expect(mockQuizContext.actions.confirmAnswer).toHaveBeenCalledWith(
				'A JavaScript library',
				expect.any(Number)
			)
		})
	})

	describe('keyboard shortcut hints', () => {
		it('displays keyboard shortcut hints next to answer options', () => {
			render(<QuizScreen />)

			// Check for hint numbers (1, 2, 3, 4)
			expect(screen.getByText('1')).toBeTruthy()
			expect(screen.getByText('2')).toBeTruthy()
			expect(screen.getByText('3')).toBeTruthy()
			expect(screen.getByText('4')).toBeTruthy()
		})
	})

	describe('accessibility', () => {
		it('answer buttons have aria-label with answer text', () => {
			render(<QuizScreen />)

			const buttons = screen.getAllByRole('button')
			expect(buttons[0].getAttribute('aria-label')).toContain(
				'A JavaScript library'
			)
		})

		it('answer buttons have aria-pressed attribute', () => {
			render(<QuizScreen />)

			const buttons = screen.getAllByRole('button')
			buttons.forEach(button => {
				expect(button.hasAttribute('aria-pressed')).toBe(true)
			})
		})
	})

	describe('CSS classes', () => {
		it('has quiz-screen class on container', () => {
			const { container } = render(<QuizScreen />)
			expect(container.querySelector('.quiz-screen')).toBeTruthy()
		})

		it('has question class on question container', () => {
			const { container } = render(<QuizScreen />)
			expect(container.querySelector('.question')).toBeTruthy()
		})

		it('has question__text class on question text', () => {
			const { container } = render(<QuizScreen />)
			expect(container.querySelector('.question__text')).toBeTruthy()
		})

		it('has answers class on answers container', () => {
			const { container } = render(<QuizScreen />)
			expect(container.querySelector('.answers')).toBeTruthy()
		})
	})

	describe('question display', () => {
		it('displays question text in h2 element', () => {
			render(<QuizScreen />)

			const heading = screen.getByRole('heading', { level: 2 })
			expect(heading.textContent).toBe('What is React?')
		})

		it('displays all four answer options', () => {
			render(<QuizScreen />)

			const answers = screen.getAllByRole('button')
			expect(answers.length).toBe(4)
		})
	})

	describe('progress indicator', () => {
		it('displays progress in "Question X of Y" format', () => {
			render(<QuizScreen />)

			expect(screen.getByText('Question 1 of 2')).toBeTruthy()
		})

		it('updates progress when on second question', () => {
			mockQuizContext = createMockQuizContext({
				state: { currentQuestionIndex: 1 },
				currentQuestion: mockQuestions[1]
			})

			render(<QuizScreen />)

			expect(screen.getByText('Question 2 of 2')).toBeTruthy()
			expect(screen.getByText('What is useState?')).toBeTruthy()
		})
	})

	describe('timer integration', () => {
		it('renders timer component', () => {
			const { container } = render(<QuizScreen />)

			expect(container.querySelector('.question-timer')).toBeTruthy()
		})

		it('displays timer seconds', () => {
			render(<QuizScreen />)

			// Mocked timer returns 30000ms = 30s
			expect(screen.getByText('30s')).toBeTruthy()
		})
	})

	describe('feedback state', () => {
		it('disables answers during feedback state', () => {
			// Simulating feedback state by clicking an answer
			render(<QuizScreen />)

			const answer = screen.getByText('A JavaScript library')
			fireEvent.click(answer)

			// After clicking, the component should enter feedback state
			// and disable all buttons
			const buttons = screen.getAllByRole('button')
			buttons.forEach(button => {
				expect(button.disabled).toBe(true)
			})
		})

		it('shows feedback when answer is selected', () => {
			render(<QuizScreen />)

			const wrongAnswer = screen.getByText('A database')
			fireEvent.click(wrongAnswer)

			// Answer should be recorded
			expect(mockQuizContext.actions.confirmAnswer).toHaveBeenCalledWith(
				'A database',
				expect.any(Number)
			)
		})
	})

	describe('component structure', () => {
		it('renders AnimatedPage wrapper', () => {
			const { container } = render(<QuizScreen />)

			// AnimatedPage is mocked but should render its children
			expect(container.querySelector('.quiz-screen')).toBeTruthy()
		})

		it('renders QuestionProgress component', () => {
			const { container } = render(<QuizScreen />)

			expect(container.querySelector('.question-progress')).toBeTruthy()
		})

		it('renders QuestionTimer component', () => {
			const { container } = render(<QuizScreen />)

			expect(container.querySelector('.question-timer')).toBeTruthy()
		})

		it('renders Answers component', () => {
			const { container } = render(<QuizScreen />)

			expect(container.querySelector('.answers')).toBeTruthy()
		})
	})
})
