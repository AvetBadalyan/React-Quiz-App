import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react'
import { soundManager } from '../services/soundManager.js'
import { STORAGE_KEYS, storageService } from '../services/storageService.js'

const SoundContext = createContext(null)

/**
 * SoundProvider — manages sound enabled/disabled state with localStorage persistence
 * and exposes playback helpers for the four sound types.
 *
 * Sound is OFF by default.
 */
export function SoundProvider({ children }) {
	const [enabled, setEnabled] = useState(() =>
		storageService.get(STORAGE_KEYS.SOUND_ENABLED, false)
	)

	// Pre-load audio files once on mount
	useEffect(() => {
		soundManager.initialize()
	}, [])

	// Keep soundManager and localStorage in sync whenever enabled changes
	useEffect(() => {
		soundManager.setEnabled(enabled)
		storageService.set(STORAGE_KEYS.SOUND_ENABLED, enabled)
	}, [enabled])

	const playCorrect = useCallback(() => soundManager.play('correct'), [])
	const playWrong = useCallback(() => soundManager.play('wrong'), [])
	const playWarning = useCallback(() => soundManager.play('warning'), [])
	const playClick = useCallback(() => soundManager.play('click'), [])

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
