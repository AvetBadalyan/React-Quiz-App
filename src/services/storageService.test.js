import { describe, it, expect, beforeEach } from 'vitest'
import { storageService, STORAGE_KEYS } from './storageService.js'

describe('storageService', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	describe('get / set', () => {
		it('stores and retrieves a value', () => {
			storageService.set('key', { a: 1 })
			expect(storageService.get('key')).toEqual({ a: 1 })
		})

		it('returns the default value when the key is missing', () => {
			expect(storageService.get('missing', 'fallback')).toBe('fallback')
		})

		it('returns the default value when stored JSON is corrupt', () => {
			localStorage.setItem('bad', '{not json')
			expect(storageService.get('bad', null)).toBeNull()
		})
	})

	describe('high scores', () => {
		it('returns null when no score is stored', () => {
			expect(storageService.getHighScore('react', 'easy')).toBeNull()
		})

		it('saves a first score and reports it as a new record', () => {
			const isNew = storageService.saveHighScore('react', 'easy', {
				score: 80,
				correctCount: 8,
				totalCount: 10
			})
			expect(isNew).toBe(true)
			expect(storageService.getHighScore('react', 'easy').score).toBe(80)
		})

		it('overwrites only when the new score is higher', () => {
			storageService.saveHighScore('css', 'hard', {
				score: 50,
				correctCount: 5,
				totalCount: 10
			})

			const higher = storageService.saveHighScore('css', 'hard', {
				score: 90,
				correctCount: 9,
				totalCount: 10
			})
			expect(higher).toBe(true)
			expect(storageService.getHighScore('css', 'hard').score).toBe(90)

			const lower = storageService.saveHighScore('css', 'hard', {
				score: 60,
				correctCount: 6,
				totalCount: 10
			})
			expect(lower).toBe(false)
			expect(storageService.getHighScore('css', 'hard').score).toBe(90)
		})

		it('keeps scores for different category/difficulty combinations separate', () => {
			storageService.saveHighScore('html', 'easy', {
				score: 70,
				correctCount: 7,
				totalCount: 10
			})
			storageService.saveHighScore('html', 'hard', {
				score: 40,
				correctCount: 8,
				totalCount: 20
			})

			expect(storageService.getHighScore('html', 'easy').score).toBe(70)
			expect(storageService.getHighScore('html', 'hard').score).toBe(40)
		})

		it('stores scores under the shared high-scores key', () => {
			storageService.saveHighScore('react', 'medium', {
				score: 100,
				correctCount: 15,
				totalCount: 15
			})
			expect(localStorage.getItem(STORAGE_KEYS.HIGH_SCORES)).not.toBeNull()
		})
	})
})
