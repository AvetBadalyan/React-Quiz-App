import { createContext, useContext, useMemo, useReducer } from 'react'

/**
 * @typedef {'idle' | 'configuring' | 'active' | 'feedback' | 'completed'} QuizStatus
 */

/**
 * @typedef {Object} UserAnswer
 * @property {string} questionId
 * @property {string|null} selectedAnswer - null if skipped
 * @property {boolean} isCorrect
 * @property {number} timeSpent - ms
 */

/**
 * @typedef {Object} QuizSessionState
 * @property {QuizStatus} status
 * @property {string|null} category
 * @property {'easy' | 'medium' | 'hard' | null} difficulty
 * @property {string[]} selectedTopics
 * @property {Object[]} questions
 * @property {number} currentQuestionIndex
 * @property {UserAnswer[]} userAnswers
 * @property {number|null} startTime
 * @property {number|null} endTime
 */

export const QUIZ_ACTIONS = {
	SET_CATEGORY: 'SET_CATEGORY',
	SET_DIFFICULTY: 'SET_DIFFICULTY',
	SET_TOPICS: 'SET_TOPICS',
	START_QUIZ: 'START_QUIZ',
	CONFIRM_ANSWER: 'CONFIRM_ANSWER',
	SKIP_QUESTION: 'SKIP_QUESTION',
	NEXT_QUESTION: 'NEXT_QUESTION',
	RESET_QUIZ: 'RESET_QUIZ'
}

const initialState = {
	status: 'idle',
	category: null,
	difficulty: null,
	selectedTopics: [],
	questions: [],
	currentQuestionIndex: 0,
	userAnswers: [],
	startTime: null,
	endTime: null
}

function quizReducer(state, action) {
	switch (action.type) {
		case QUIZ_ACTIONS.SET_CATEGORY:
			return {
				...state,
				category: action.payload,
				selectedTopics: [],
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
				startTime: Date.now(),
				endTime: null
			}

		case QUIZ_ACTIONS.CONFIRM_ANSWER: {
			const currentQuestion = state.questions[state.currentQuestionIndex]
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
				userAnswers: [...state.userAnswers, userAnswer]
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
				userAnswers: [...state.userAnswers, userAnswer]
			}
		}

		case QUIZ_ACTIONS.NEXT_QUESTION: {
			const nextIndex = state.currentQuestionIndex + 1
			const isComplete = nextIndex >= state.questions.length
			return {
				...state,
				status: isComplete ? 'completed' : 'active',
				currentQuestionIndex: isComplete
					? state.currentQuestionIndex
					: nextIndex,
				endTime: isComplete ? Date.now() : state.endTime
			}
		}

		case QUIZ_ACTIONS.RESET_QUIZ:
			return { ...initialState }

		default:
			return state
	}
}

const QuizContext = createContext(null)

export function QuizProvider({ children }) {
	const [state, dispatch] = useReducer(quizReducer, initialState)

	// useMemo with empty deps — dispatch is stable, so actions never change
	const actions = useMemo(
		() => ({
			setCategory: category =>
				dispatch({ type: QUIZ_ACTIONS.SET_CATEGORY, payload: category }),

			setDifficulty: difficulty =>
				dispatch({ type: QUIZ_ACTIONS.SET_DIFFICULTY, payload: difficulty }),

			setTopics: topics =>
				dispatch({ type: QUIZ_ACTIONS.SET_TOPICS, payload: topics }),

			startQuiz: questions =>
				dispatch({ type: QUIZ_ACTIONS.START_QUIZ, payload: { questions } }),

			confirmAnswer: (answer, timeSpent) =>
				dispatch({
					type: QUIZ_ACTIONS.CONFIRM_ANSWER,
					payload: answer,
					timeSpent
				}),

			skipQuestion: timeSpent =>
				dispatch({ type: QUIZ_ACTIONS.SKIP_QUESTION, timeSpent }),

			nextQuestion: () => dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION }),

			resetQuiz: () => dispatch({ type: QUIZ_ACTIONS.RESET_QUIZ })
		}),
		[]
	)

	const value = useMemo(
		() => ({
			state,
			actions,
			currentQuestion: state.questions[state.currentQuestionIndex] || null,
			canStartQuiz: state.category !== null && state.difficulty !== null,
			totalQuestions: state.questions.length,
			correctCount: state.userAnswers.filter(a => a.isCorrect).length
		}),
		[state, actions]
	)

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz() {
	const context = useContext(QuizContext)
	if (!context) throw new Error('useQuiz must be used within a QuizProvider')
	return context
}

// Exported for testing
export { initialState, quizReducer }
