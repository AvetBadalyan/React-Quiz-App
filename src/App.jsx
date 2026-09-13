import { AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { Header } from './components/layout/Header.jsx'
import { QuizScreen } from './components/quiz/screens/QuizScreen.jsx'
import { StartScreen } from './components/quiz/screens/StartScreen.jsx'
import { SummaryScreen } from './components/quiz/screens/SummaryScreen.jsx'
import { QuizProvider, useQuiz } from './context/QuizContext.jsx'
import { SoundProvider } from './context/SoundContext.jsx'

/**
 * Picks the screen to render based on the quiz status:
 * - idle / configuring → StartScreen
 * - active / feedback   → QuizScreen
 * - completed           → SummaryScreen
 *
 * Each screen has a stable key so AnimatePresence can animate transitions.
 */
function AppContent() {
	const { state } = useQuiz()

	const renderScreen = () => {
		switch (state.status) {
			case 'active':
			case 'feedback':
				return <QuizScreen key="quiz" />
			case 'completed':
				return <SummaryScreen key="summary" />
			default:
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
 * Root component. SoundProvider wraps QuizProvider so quiz components can
 * trigger sound effects. ErrorBoundary catches render errors and shows a
 * fallback instead of a blank screen.
 */
function App() {
	return (
		<ErrorBoundary>
			<SoundProvider>
				<QuizProvider>
					<AppContent />
				</QuizProvider>
			</SoundProvider>
		</ErrorBoundary>
	)
}

export default App
