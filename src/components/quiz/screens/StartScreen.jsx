import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuiz } from '../../../context/QuizContext.jsx'
import { useSound } from '../../../context/SoundContext.jsx'
import { DIFFICULTY_CONFIG } from '../../../data/constants.js'
import { useHighScores } from '../../../hooks/useHighScores.js'
import {
	countAvailableQuestions,
	selectQuestions
} from '../../../services/questionService.js'
import { HighScoreDisplay } from '../../feedback/HighScoreDisplay.jsx'
import { AnimatedPage } from '../../layout/AnimatedPage.jsx'
import { Button } from '../../ui/Button.jsx'
import { CategorySelector } from '../CategorySelector.jsx'
import { TopicFilter } from '../TopicFilter.jsx'

/**
 * StartScreen Component
 *
 * Initial view for quiz configuration. Displays category selection,
 * difficulty selection, topic filtering, and high score for current selection.
 *
 * Responsibilities:
 * - Display category selection (HTML, CSS, JavaScript, React)
 * - Display difficulty selection (Easy, Medium, Hard)
 * - Show topic filters based on selected category
 * - Display high score for current selection
 * - Enable/disable start button based on selection state
 * - Manage focus for keyboard accessibility
 */
export function StartScreen() {
	const { state, actions, canStartQuiz } = useQuiz()
	const { playClick } = useSound()
	const { getHighScore } = useHighScores()
	const [errorMessage, setErrorMessage] = useState(null)
	const [showInsufficientWarning, setShowInsufficientWarning] = useState(false)
	const screenRef = useRef(null)

	const { category, difficulty, selectedTopics } = state

	// Focus management: focus the screen container when mounted for keyboard users
	useEffect(() => {
		// Small delay to allow animation to start
		const timer = setTimeout(() => {
			screenRef.current?.focus()
		}, 100)
		return () => clearTimeout(timer)
	}, [])

	// Get high score for current selection
	const highScore =
		category && difficulty ? getHighScore(category, difficulty) : null

	// Get the difficulty configuration for the selected difficulty
	const difficultyConfig = difficulty ? DIFFICULTY_CONFIG[difficulty] : null

	// Check if there are insufficient questions for the selected configuration
	const availableQuestionCount = category
		? countAvailableQuestions(category, selectedTopics)
		: 0

	const requiredQuestionCount = difficultyConfig?.questionCount || 0

	// Update insufficient warning state when selection changes
	useEffect(() => {
		if (category && difficulty && selectedTopics.length > 0) {
			setShowInsufficientWarning(availableQuestionCount < requiredQuestionCount)
		} else {
			setShowInsufficientWarning(false)
		}
	}, [
		category,
		difficulty,
		selectedTopics,
		availableQuestionCount,
		requiredQuestionCount
	])

	/**
	 * Handle category selection
	 * @param {string} categoryId - Selected category id
	 */
	const handleCategorySelect = useCallback(
		categoryId => {
			playClick()
			setErrorMessage(null)
			actions.setCategory(categoryId)
		},
		[actions, playClick]
	)

	/**
	 * Handle difficulty selection
	 * @param {string} difficultyKey - Selected difficulty key
	 */
	const handleDifficultySelect = useCallback(
		difficultyKey => {
			playClick()
			setErrorMessage(null)
			actions.setDifficulty(difficultyKey)
		},
		[actions, playClick]
	)

	/**
	 * Handle topic selection changes
	 * @param {string[]} topics - New selected topics array
	 */
	const handleTopicsChange = useCallback(
		topics => {
			playClick()
			actions.setTopics(topics)
		},
		[actions, playClick]
	)

	/**
	 * Handle start quiz button click
	 * Validates selection and starts the quiz with selected questions
	 */
	const handleStartQuiz = useCallback(() => {
		if (!canStartQuiz) {
			setErrorMessage(
				'Please select a category and difficulty level before starting.'
			)
			return
		}

		// Get questions for the quiz
		const questions = selectQuestions(
			category,
			difficulty,
			selectedTopics,
			difficultyConfig.questionCount
		)

		if (questions.length === 0) {
			setErrorMessage('No questions available for the selected configuration.')
			return
		}

		playClick()
		actions.startQuiz(questions)
	}, [
		canStartQuiz,
		category,
		difficulty,
		selectedTopics,
		difficultyConfig,
		actions,
		playClick
	])

	/**
	 * Get difficulty label with timer and question count info
	 * @param {string} diffKey - Difficulty key
	 * @returns {Object} Difficulty display info
	 */
	const getDifficultyInfo = diffKey => {
		const config = DIFFICULTY_CONFIG[diffKey]
		const timerSeconds = config.timerDuration / 1000
		return {
			label: config.label,
			description: `${timerSeconds} seconds, ${config.questionCount} questions`
		}
	}

	const difficulties = Object.keys(DIFFICULTY_CONFIG)

	return (
		<AnimatedPage>
			<div
				className="start-screen"
				ref={screenRef}
				tabIndex={-1}
				aria-label="Quiz configuration screen"
			>
				<h2 className="start-screen__title">Frontend Quiz</h2>
				<p className="start-screen__subtitle">
					Test your knowledge across HTML, CSS, JavaScript, and React
				</p>

				{/* Category selection */}
				<CategorySelector selected={category} onSelect={handleCategorySelect} />

				{/* Difficulty selection */}
				<div
					className="difficulty-selector"
					role="group"
					aria-labelledby="difficulty-selector-label"
				>
					<h3 id="difficulty-selector-label">Select Difficulty</h3>
					<div
						className="difficulty-selector__options"
						role="radiogroup"
						aria-label="Difficulty levels"
					>
						{difficulties.map(diffKey => {
							const info = getDifficultyInfo(diffKey)
							const isSelected = difficulty === diffKey
							return (
								<button
									key={diffKey}
									className={`difficulty-selector__option ${isSelected ? 'difficulty-selector__option--selected' : ''}`}
									onClick={() => handleDifficultySelect(diffKey)}
									type="button"
									aria-pressed={isSelected}
									aria-label={`${info.label} difficulty: ${info.description}`}
								>
									<span className="difficulty-selector__label">
										{info.label}
									</span>
									<span className="difficulty-selector__info">
										{info.description}
									</span>
								</button>
							)
						})}
					</div>
				</div>

				{/* Topic filter — shown once a category is selected */}
				{category && (
					<TopicFilter
						category={category}
						selectedTopics={selectedTopics}
						onTopicsChange={handleTopicsChange}
						difficulty={difficulty}
					/>
				)}

				{/* Warning when the topic selection has fewer questions than needed */}
				{showInsufficientWarning && (
					<div className="start-screen__warning" role="alert">
						<p>
							Only {availableQuestionCount} questions available for your
							selection. The quiz will use all {availableQuestionCount}{' '}
							questions instead of {requiredQuestionCount}.
						</p>
					</div>
				)}

				{/* High score for the current category + difficulty */}
				{category && difficulty && (
					<div className="start-screen__high-score">
						<HighScoreDisplay highScore={highScore} />
					</div>
				)}

				{/* Validation error message */}
				{errorMessage && (
					<div className="start-screen__error" role="alert">
						{errorMessage}
					</div>
				)}

				{/* Start button — enabled once category and difficulty are chosen */}
				<div className="start-screen__actions">
					<Button
						variant="primary"
						disabled={!canStartQuiz}
						onClick={handleStartQuiz}
						aria-describedby={!canStartQuiz ? 'start-button-hint' : undefined}
					>
						Start Quiz
					</Button>
					{!canStartQuiz && (
						<p id="start-button-hint" className="start-screen__hint">
							Select both a category and difficulty to start
						</p>
					)}
				</div>
			</div>
		</AnimatedPage>
	)
}
