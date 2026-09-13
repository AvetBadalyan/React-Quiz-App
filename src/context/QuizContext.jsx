import { createContext, useContext, useReducer, useMemo } from 'react'

/**
 * @typedef {'idle' | 'configuring' | 'active' | 'feedback' | 'completed'} QuizStatus
 */

/**
 * @typedef {Object} UserAnswer
 * @property {string} questionId - Question ID
 * @property {string|null} selectedAnswer - User's selected answer (null if skipped)
 * @property {boolean} isCorrect - Whether the answer was correct
 * @property {number} timeSpent - Time spent on question in ms
 */

/**
 * @typedef {Object} QuizSessionState
 * @property {QuizStatus} status - Current quiz status
 * @property {string|null} category - Selected category
 * @property {'easy' | 'medium' | 'hard' | null} difficulty - Selected difficulty
 * @property {string[]} selectedTopics - Selected topic filters
 * @property {Object[]} questions - Shuffled questions for this session
 * @property {number} currentQuestionIndex - 0-based index of current question
 * @property {UserAnswer[]} userAnswers - Array of user's answers
 * @property {string|null} pendingAnswer - Currently selected but unconfirmed answer
 * @property {number|null} startTime - Session start timestamp
 * @property {number|null} endTime - Session end timestamp
 */

// Action types for the quiz reducer
export const QUIZ_ACTIONS = {
	SET_CATEGORY: 'SET_CATEGORY',
	SET_DIFFICULTY: 'SET_DIFFICULTY',
	SET_TOPICS: 'SET_TOPICS',
	START_QUIZ: 'START_QUIZ',
	SELECT_ANSWER: 'SELECT_ANSWER',
	CONFIRM_ANSWER: 'CONFIRM_ANSWER',
	SKIP_QUESTION: 'SKIP_QUESTION',
	NEXT_QUESTION: 'NEXT_QUESTION',
	COMPLETE_QUIZ: 'COMPLETE_QUIZ',
	RESET_QUIZ: 'RESET_QUIZ'
}

/**
 * Initial state for the quiz session
 * @type {QuizSessionState}
 */
const initialState = {
	status: 'idle',
	category: null,
	difficulty: null,
	selectedTopics: [],
	questions: [],
	currentQuestionIndex: 0,
	userAnswers: [],
	pendingAnswer: null,
	startTime: null,
	endTime: null
}

/**
 * Quiz reducer function for managing quiz session state
 * @param {QuizSessionState} state - Current state
 * @param {Object} action - Action to dispatch
 * @returns {QuizSessionState} New state
 */
function quizReducer(state, action) {
	switch (action.type) {
		case QUIZ_ACTIONS.SET_CATEGORY:
			return {
				...state,
				category: action.payload,
				selectedTopics: [], // Reset topics when category changes
				status: 'configuring'
			}

		case QUIZ_ACTIONS.SET_DIFFICULTY:
			return {
				...state,
				difficulty: action.payload,
				status: 'configuring'
			}

		case QUIZ_ACTIONS.SET_TOPICS:
			return {
				...state,
				selectedTopics: action.payload
			}

		case QUIZ_ACTIONS.START_QUIZ:
			return {
				...state,
				status: 'active',
				questions: action.payload.questions,
				currentQuestionIndex: 0,
				userAnswers: [],
				pendingAnswer: null,
				startTime: Date.now(),
				endTime: null
			}

		case QUIZ_ACTIONS.SELECT_ANSWER:
			return {
				...state,
				pendingAnswer: action.payload
			}

		case QUIZ_ACTIONS.CONFIRM_ANSWER: {
			const currentQuestion = state.questions[state.currentQuestionIndex]
			// The first answer in the original question is the correct one
			const isCorrect = action.payload === currentQuestion.answers[0]
			const userAnswer = {
				questionId: currentQuestion.id,
				selectedAnswer: action.payload,
				isCorrect,
				timeSpent: action.timeSpent || 0
			}

			return {
				...state,
				status: 'feedback',
				userAnswers: [...state.userAnswers, userAnswer],
				pendingAnswer: null
			}
		}

		case QUIZ_ACTIONS.SKIP_QUESTION: {
			const currentQuestion = state.questions[state.currentQuestionIndex]
			const userAnswer = {
				questionId: currentQuestion.id,
				selectedAnswer: null,
				isCorrect: false,
				timeSpent: action.timeSpent || 0
			}

			return {
				...state,
				status: 'feedback',
				userAnswers: [...state.userAnswers, userAnswer],
				pendingAnswer: null
			}
		}

		case QUIZ_ACTIONS.NEXT_QUESTION: {
			const nextIndex = state.currentQuestionIndex + 1
			const isComplete = nextIndex >= state.questions.length

			return {
				...state,
				status: isComplete ? 'completed' : 'active',
				currentQuestionIndex: isComplete ? state.currentQuestionIndex : nextIndex,
				pendingAnswer: null,
				endTime: isComplete ? Date.now() : state.endTime
			}
		}

		case QUIZ_ACTIONS.COMPLETE_QUIZ:
			return {
				...state,
				status: 'completed',
				endTime: Date.now()
			}

		case QUIZ_ACTIONS.RESET_QUIZ:
			return {
				...initialState,
				status: 'idle'
			}

		default:
			return state
	}
}

// Create the context
const QuizContext = createContext(null)

/**
 * QuizProvider component that wraps the app with quiz state
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function QuizProvider({ children }) {
	const [state, dispatch] = useReducer(quizReducer, initialState)

	// Memoized action creators to prevent unnecessary re-renders
	const actions = useMemo(
		() => ({
			/**
			 * Set the selected category
			 * @param {string} category - Category id
			 */
			setCategory: category =>
				dispatch({ type: QUIZ_ACTIONS.SET_CATEGORY, payload: category }),

			/**
			 * Set the selected difficulty
			 * @param {'easy' | 'medium' | 'hard'} difficulty - Difficulty level
			 */
			setDifficulty: difficulty =>
				dispatch({ type: QUIZ_ACTIONS.SET_DIFFICULTY, payload: difficulty }),

			/**
			 * Set the selected topics for filtering
			 * @param {string[]} topics - Array of topic tags
			 */
			setTopics: topics =>
				dispatch({ type: QUIZ_ACTIONS.SET_TOPICS, payload: topics }),

			/**
			 * Start the quiz with the given questions
			 * @param {Object[]} questions - Array of shuffled questions
			 */
			startQuiz: questions =>
				dispatch({ type: QUIZ_ACTIONS.START_QUIZ, payload: { questions } }),

			/**
			 * Select an answer (pending confirmation)
			 * @param {string} answer - The selected answer text
			 */
			selectAnswer: answer =>
				dispatch({ type: QUIZ_ACTIONS.SELECT_ANSWER, payload: answer }),

			/**
			 * Confirm the selected answer
			 * @param {string} answer - The answer to confirm
			 * @param {number} timeSpent - Time spent on the question in ms
			 */
			confirmAnswer: (answer, timeSpent) =>
				dispatch({
					type: QUIZ_ACTIONS.CONFIRM_ANSWER,
					payload: answer,
					timeSpent
				}),

			/**
			 * Skip the current question
			 * @param {number} timeSpent - Time spent on the question in ms
			 */
			skipQuestion: timeSpent =>
				dispatch({ type: QUIZ_ACTIONS.SKIP_QUESTION, timeSpent }),

			/**
			 * Advance to the next question
			 */
			nextQuestion: () => dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION }),

			/**
			 * Mark the quiz as complete
			 */
			completeQuiz: () => dispatch({ type: QUIZ_ACTIONS.COMPLETE_QUIZ }),

			/**
			 * Reset the quiz to initial state
			 */
			resetQuiz: () => dispatch({ type: QUIZ_ACTIONS.RESET_QUIZ })
		}),
		[]
	)

	const value = useMemo(
		() => ({
			state,
			actions,
			// Convenience getters for commonly accessed state
			currentQuestion: state.questions[state.currentQuestionIndex] || null,
			isQuizActive: state.status === 'active' || state.status === 'feedback',
			isQuizComplete: state.status === 'completed',
			canStartQuiz: state.category !== null && state.difficulty !== null,
			totalQuestions: state.questions.length,
			answeredCount: state.userAnswers.length,
			correctCount: state.userAnswers.filter(a => a.isCorrect).length
		}),
		[state, actions]
	)

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

/**
 * Custom hook to access quiz context
 * @returns {Object} Quiz context value with state and actions
 * @throws {Error} If used outside of QuizProvider
 */
export function useQuiz() {
	const context = useContext(QuizContext)
	if (!context) {
		throw new Error('useQuiz must be used within a QuizProvider')
	}
	return context
}

// Export the reducer for testing purposes
export { quizReducer, initialState }
