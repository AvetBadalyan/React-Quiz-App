/**
 * Shuffles an array using the Fisher-Yates (Knuth) shuffle algorithm.
 * This implementation creates a new shuffled array without mutating the original.
 *
 * @param {Array} array - The array to shuffle
 * @returns {Array} A new shuffled array (does not mutate original)
 *
 * @example
 * const original = [1, 2, 3, 4, 5];
 * const shuffled = shuffle(original);
 * // original remains [1, 2, 3, 4, 5]
 * // shuffled is a new array with elements in random order
 *
 * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 *
 * Requirements: 2.5 (answer shuffling)
 */
export function shuffle(array) {
  // Create a shallow copy to avoid mutating the original array
  const result = [...array];

  // Fisher-Yates shuffle: iterate from the end to the beginning
  for (let i = result.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
