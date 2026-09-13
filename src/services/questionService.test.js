import { describe, it, expect } from 'vitest'
import {
	selectQuestions,
	getTopicsForCategory,
	countAvailableQuestions
} from './questionService.js'

describe('selectQuestions', () => {
	it('returns the requested number of questions', () => {
		const questions = selectQuestions('javascript', 'easy', [], 5)
		expect(questions).toHaveLength(5)
	})

	it('returns questions only from the requested category', () => {
		const questions = selectQuestions('react', 'medium', [], 5)
		questions.forEach(q => expect(q.category).toBe('react'))
	})

	it('filters by topic when topics are provided', () => {
		const topics = ['hooks']
		const questions = selectQuestions('react', 'easy', topics, 3)
		questions.forEach(q => expect(topics).toContain(q.topic))
	})

	it('returns an empty array for an unknown category', () => {
		expect(selectQuestions('unknown', 'easy', [], 5)).toEqual([])
	})

	it('never returns more questions than are available', () => {
		const available = countAvailableQuestions('html', [])
		const questions = selectQuestions('html', 'easy', [], available + 50)
		expect(questions.length).toBeLessThanOrEqual(available)
	})
})

describe('getTopicsForCategory', () => {
	it('returns the unique topics found in a category', () => {
		const topics = getTopicsForCategory('css')
		expect(topics.length).toBeGreaterThan(0)
		expect(new Set(topics).size).toBe(topics.length)
	})

	it('returns an empty array for an unknown category', () => {
		expect(getTopicsForCategory('unknown')).toEqual([])
	})
})

describe('countAvailableQuestions', () => {
	it('counts all questions when no topics are given', () => {
		expect(countAvailableQuestions('javascript', [])).toBeGreaterThan(0)
	})

	it('counts fewer questions when filtered by topic', () => {
		const all = countAvailableQuestions('react', [])
		const filtered = countAvailableQuestions('react', ['hooks'])
		expect(filtered).toBeLessThanOrEqual(all)
	})
})
