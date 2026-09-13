/**
 * Sound Context
 *
 * Provides sound preference state and playback functions to the application.
 * Manages sound enabled/disabled state with localStorage persistence.
 *
 * Validates: Requirements 10.1, 10.2, 10.6
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import { soundManager } from '../services/soundManager.js'
import { storageService } from '../services/storageService.js'

const SoundContext = createContext(null)

/**
 * SoundProvider - Provides sound state and playback functions to children
 *
 * Responsibilities:
 * - Initialize soundManager on mount
 * - Read enabled state from localStorage (default false per Requirement 10.1)
 * - Sync enabled state to soundManager and localStorage
 * - Provide playback functions for different sound types
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function SoundProvider({ children }) {
  // Requirement 10.1: Sound effects disabled by default
  // Requirement 10.2: Persist preference to localStorage
  const [enabled, setEnabled] = useState(() => {
    return storageService.get('soundEnabled', false)
  })

  // Initialize sound manager on mount
  useEffect(() => {
    soundManager.initialize()
  }, [])

  // Requirement 10.6: Immediately enable or disable all sound effects
  // Sync enabled state to soundManager and localStorage
  useEffect(() => {
    soundManager.setEnabled(enabled)
    storageService.set('soundEnabled', enabled)
  }, [enabled])

  /**
   * Play correct answer sound (high priority)
   * Requirement 10.3: Play success sound effect on correct answer
   */
  const playCorrect = useCallback(() => {
    soundManager.play('correct', 'high')
  }, [])

  /**
   * Play wrong answer sound (high priority)
   * Requirement 10.4: Play error sound effect on incorrect answer
   */
  const playWrong = useCallback(() => {
    soundManager.play('wrong', 'high')
  }, [])

  /**
   * Play timer warning sound (normal priority)
   * Requirement 10.5: Play warning sound when timer reaches 5000ms remaining
   */
  const playWarning = useCallback(() => {
    soundManager.play('warning', 'normal')
  }, [])

  /**
   * Play button click sound (low priority)
   */
  const playClick = useCallback(() => {
    soundManager.play('click', 'low')
  }, [])

  const value = {
    enabled,
    setEnabled,
    playCorrect,
    playWrong,
    playWarning,
    playClick
  }

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

/**
 * useSound hook - Access sound context values and functions
 *
 * Returns:
 * - enabled: boolean - Whether sound is currently enabled
 * - setEnabled: function - Toggle sound on/off
 * - playCorrect: function - Play correct answer sound (high priority)
 * - playWrong: function - Play wrong answer sound (high priority)
 * - playWarning: function - Play timer warning sound (normal priority)
 * - playClick: function - Play button click sound (low priority)
 *
 * @throws {Error} If used outside SoundProvider
 */
export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within SoundProvider')
  }
  return context
}
