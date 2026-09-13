import quizLogo from '../../assets/quiz-logo.png'
import { useSound } from '../../context/SoundContext.jsx'
import { Toggle } from '../ui/Toggle.jsx'

/**
 * Header component with app title and sound toggle
 *
 * Displays the app logo, title, and a sound effects toggle.
 * The sound toggle persists preference to localStorage.
 */
export function Header() {
	const { enabled, setEnabled } = useSound()

	return (
		<header className="header" role="banner">
			<div className="header__logo">
				<img src={quizLogo} alt="" aria-hidden="true" />
				<h1>Frontend Quiz</h1>
			</div>
			<nav className="header__controls" aria-label="Settings">
				<Toggle checked={enabled} onChange={setEnabled} label="Sound effects" />
			</nav>
		</header>
	)
}
