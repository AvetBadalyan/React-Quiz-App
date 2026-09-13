/**
 * App Component - Main Application Entry Point
 *
 * Wraps the application with context providers and implements
 * screen routing based on quiz session status.
 *
 * Features:
 * - SoundProvider for audio management
 * - QuizProvider for quiz session state
 * - AnimatePresence for smooth screen transitions
 * - Screen routing based on quiz status
 *
 * @validates Requirements 1.11, 7.2, 7.8, 15.1
 */

import { AnimatePresence } from 'framer-motion'
import { Header } from './components/layout/Header.jsx'
import { QuizScreen } from './components/quiz/screens/QuizScreen.jsx'
import { StartScreen } from './components/quiz/screens/StartScreen.jsx'
import { SummaryScreen } from './components/quiz/screens/SummaryScreen.jsx'
import { QuizProvider, useQuiz } from './context/QuizContext.jsx'
import { SoundProvider } from './context/SoundContext.jsx'

/**
 * AppContent Component
 *
 * Handles screen routing based on quiz status.
 * Uses QuizContext to determine which screen to display.
 *
 * Status mapping:
 * - idle, configuring → StartScreen
 * - active, feedback → QuizScreen
 * - completed → SummaryScreen
 */
function AppContent() {
	const { state } = useQuiz()

	/**
	 * Renders the appropriate screen based on current quiz status
	 * Each screen has a unique key for AnimatePresence transitions
	 */
	const renderScreen = () => {
		switch (state.status) {
			case 'idle':
			case 'configuring':
				return <StartScreen key="start" />
			case 'active':
			case 'feedback':
				return <QuizScreen key="quiz" />
			case 'completed':
				return <SummaryScreen key="summary" />
			default:
				// Fallback to StartScreen for any unknown status
				return <StartScreen key="start" />
		}
	}

	return (
		<>
			<Header />
			<main>
				<AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
			</main>
		</>
	)
}

/**
 * App Component - Root Application
 *
 * Provides context providers in the correct order:
 * 1. SoundProvider (outermost) - manages audio state
 * 2. QuizProvider - manages quiz session state
 *
 * The order matters because QuizProvider components may
 * need access to SoundContext.
 */
function App() {
	return (
		<SoundProvider>
			<QuizProvider>
				<AppContent />
			</QuizProvider>
		</SoundProvider>
	)
}

export default App
