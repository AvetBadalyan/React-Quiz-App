/**
 * useKeyboardNavigation Hook
 *
 * Handles keyboard navigation for the quiz, including:
 * - Number keys 1-4 for answer selection
 * - Enter key for confirmation
 * - Proper handling of disabled state
 *
 * Validates: Requirements 12.1-12.5
 */

import { useEffect, useCallback } from 'react'

/**
 * Keyboard navigation hook for quiz
 *
 * @param {Object} options - Configuration options
 * @param {Function} options.onSelectAnswer - Callback when 1-4 pressed, receives index (0-3)
 * @param {Function} options.onConfirm - Callback when Enter pressed
 * @param {boolean} options.disabled - Whether to ignore keyboard input
 * @param {number} options.answerCount - Number of answer options (default 4)
 *
 * @example
 * useKeyboardNavigation({
 *   onSelectAnswer: (index) => handleSelectAnswer(index),
 *   onConfirm: () => handleConfirmAnswer(),
 *   disabled: isAnswered,
 *   answerCount: currentQuestion.answers.length
 * })
 */
export function useKeyboardNavigation(options = {}) {
  const {
    onSelectAnswer,
    onConfirm,
    disabled = false,
    answerCount = 4
  } = options

  const handleKeyDown = useCallback(
    (event) => {
      // Ignore keyboard input when disabled
      // Validates: Requirement 12.5 - ignore key press when answers are disabled
      if (disabled) return

      // Handle number keys 1-4 for answer selection
      // Validates: Requirement 12.1, 12.2
      const num = parseInt(event.key, 10)
      if (num >= 1 && num <= answerCount) {
        // Convert to 0-based index for the answer array
        // Key 1 selects first answer (index 0), key 2 selects second (index 1), etc.
        onSelectAnswer?.(num - 1)
        return
      }

      // Handle Enter key for confirmation
      // Validates: Requirement 12.3
      if (event.key === 'Enter') {
        onConfirm?.()
        return
      }
    },
    [disabled, onSelectAnswer, onConfirm, answerCount]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
