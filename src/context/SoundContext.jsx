import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react'
import { soundManager } from '../services/soundManager.js'
import { storageService } from '../services/storageService.js'

const SoundContext = createContext(null)

// Keep this in sync with STORAGE_KEYS.SOUND_ENABLED in storageService.js
const SOUND_ENABLED_KEY = 'soundEnabled'

/**
 * SoundProvider — manages sound enabled/disabled state with localStorage persistence
 * and exposes playback helpers for the four sound types.
 *
 * Sound is OFF by default.
 */
export function SoundProvider({ children }) {
	const [enabled, setEnabled] = useState(() =>
		storageService.get(SOUND_ENABLED_KEY, false)
	)

	// Pre-load audio files once on mount
	useEffect(() => {
		soundManager.initialize()
	}, [])

	// Keep soundManager and localStorage in sync whenever enabled changes
	useEffect(() => {
		soundManager.setEnabled(enabled)
		storageService.set(SOUND_ENABLED_KEY, enabled)
	}, [enabled])

	const playCorrect = useCallback(
		() => soundManager.play('correct', 'high'),
		[]
	)
	const playWrong = useCallback(() => soundManager.play('wrong', 'high'), [])
	const playWarning = useCallback(
		() => soundManager.play('warning', 'normal'),
		[]
	)
	const playClick = useCallback(() => soundManager.play('click', 'low'), [])

	return (
		<SoundContext.Provider
			value={{
				enabled,
				setEnabled,
				playCorrect,
				playWrong,
				playWarning,
				playClick
			}}
		>
			{children}
		</SoundContext.Provider>
	)
}

export function useSound() {
	const context = useContext(SoundContext)
	if (!context) throw new Error('useSound must be used within SoundProvider')
	return context
}
