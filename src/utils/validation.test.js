import { describe, it, expect } from 'vitest'
import { validateQuestion, validateQuestionBank } from './validation.js'

describe('validateQuestion', () => {
	const validQuestion = {
		id: 'test-001',
		text: 'What is the capital of France?',
		answers: ['Paris', 'London', 'Berlin', 'Madrid'],
		difficulty: 'easy',
		category: 'html',
		topic: 'semantics'
	}

	it('should return valid for a complete question', () => {
		const result = validateQuestion(validQuestion)
		expect(result.valid).toBe(true)
		expect(result.errors).toHaveLength(0)
	})

	it('should return valid for a question without optional topic', () => {
		const questionWithoutTopic = { ...validQuestion }
		delete questionWithoutTopic.topic
		const result = validateQuestion(questionWithoutTopic)
		expect(result.valid).toBe(true)
		expect(result.errors).toHaveLength(0)
	})

	it('should return invalid for null input', () => {
		const result = validateQuestion(null)
		expect(result.valid).toBe(false)
		expect(result.errors).toContain('Question must be a non-null object')
	})

	it('should return invalid for non-object input', () => {
		const result = validateQuestion('not an object')
		expect(result.valid).toBe(false)
		expect(result.errors).toContain('Question must be a non-null object')
	})

	it('should return invalid for array input', () => {
		const result = validateQuestion([])
		expect(result.valid).toBe(false)
		expect(result.errors).toContain('Question must be a non-null object')
	})

	describe('id validation', () => {
		it('should return error for missing id', () => {
			const question = { ...validQuestion }
			delete question.id
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Missing required field: id')
		})

		it('should return error for non-string id', () => {
			const question = { ...validQuestion, id: 123 }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Field "id" must be a string')
		})

		it('should return error for empty id', () => {
			const question = { ...validQuestion, id: '   ' }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Field "id" cannot be empty')
		})
	})

	describe('text validation', () => {
		it('should return error for missing text', () => {
			const question = { ...validQuestion }
			delete question.text
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Missing required field: text')
		})

		it('should return error for non-string text', () => {
			const question = { ...validQuestion, text: 123 }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Field "text" must be a string')
		})

		it('should return error for empty text', () => {
			const question = { ...validQuestion, text: '' }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Field "text" cannot be empty')
		})
	})

	describe('answers validation', () => {
		it('should return error for missing answers', () => {
			const question = { ...validQuestion }
			delete question.answers
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Missing required field: answers')
		})

		it('should return error for non-array answers', () => {
			const question = { ...validQuestion, answers: 'not an array' }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Field "answers" must be an array')
		})

		it('should return error for wrong number of answers', () => {
			const question = { ...validQuestion, answers: ['A', 'B', 'C'] }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors.some(e => e.includes('must contain exactly 4 options'))).toBe(true)
		})

		it('should return error for non-string answer', () => {
			const question = { ...validQuestion, answers: ['A', 123, 'C', 'D'] }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Answer at index 1 must be a string')
		})

		it('should return error for empty answer', () => {
			const question = { ...validQuestion, answers: ['A', '', 'C', 'D'] }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Answer at index 1 cannot be empty')
		})
	})

	describe('difficulty validation', () => {
		it('should return error for missing difficulty', () => {
			const question = { ...validQuestion }
			delete question.difficulty
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Missing required field: difficulty')
		})

		it('should return error for invalid difficulty', () => {
			const question = { ...validQuestion, difficulty: 'extreme' }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors.some(e => e.includes('must be one of: easy, medium, hard'))).toBe(true)
		})

		it('should accept valid difficulty levels', () => {
			['easy', 'medium', 'hard'].forEach(difficulty => {
				const question = { ...validQuestion, difficulty }
				const result = validateQuestion(question)
				expect(result.valid).toBe(true)
			})
		})
	})

	describe('category validation', () => {
		it('should return error for missing category', () => {
			const question = { ...validQuestion }
			delete question.category
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Missing required field: category')
		})

		it('should return error for invalid category', () => {
			const question = { ...validQuestion, category: 'python' }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors.some(e => e.includes('must be one of: html, css, javascript, react'))).toBe(true)
		})

		it('should accept valid categories', () => {
			['html', 'css', 'javascript', 'react'].forEach(category => {
				const question = { ...validQuestion, category }
				const result = validateQuestion(question)
				expect(result.valid).toBe(true)
			})
		})
	})

	describe('topic validation (optional)', () => {
		it('should return error for non-string topic when provided', () => {
			const question = { ...validQuestion, topic: 123 }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Field "topic" must be a string when provided')
		})

		it('should return error for empty topic when provided', () => {
			const question = { ...validQuestion, topic: '   ' }
			const result = validateQuestion(question)
			expect(result.valid).toBe(false)
			expect(result.errors).toContain('Field "topic" cannot be empty when provided')
		})

		it('should allow null topic', () => {
			const question = { ...validQuestion, topic: null }
			const result = validateQuestion(question)
			expect(result.valid).toBe(true)
		})

		it('should allow undefined topic', () => {
			const question = { ...validQuestion, topic: undefined }
			const result = validateQuestion(question)
			expect(result.valid).toBe(true)
		})
	})

	it('should collect multiple errors', () => {
		const question = {
			text: '',
			answers: ['A', 'B'],
			difficulty: 'extreme',
			category: 'python'
		}
		const result = validateQuestion(question)
		expect(result.valid).toBe(false)
		expect(result.errors.length).toBeGreaterThan(1)
	})
})

describe('validateQuestionBank', () => {
	const validQuestion1 = {
		id: 'test-001',
		text: 'Question 1?',
		answers: ['A', 'B', 'C', 'D'],
		difficulty: 'easy',
		category: 'html'
	}

	const validQuestion2 = {
		id: 'test-002',
		text: 'Question 2?',
		answers: ['W', 'X', 'Y', 'Z'],
		difficulty: 'medium',
		category: 'css',
		topic: 'flexbox'
	}

	it('should return valid for an array of valid questions', () => {
		const result = validateQuestionBank([validQuestion1, validQuestion2])
		expect(result.valid).toBe(true)
		expect(result.errors).toHaveLength(0)
		expect(result.questionCount).toBe(2)
	})

	it('should return invalid for null input', () => {
		const result = validateQuestionBank(null)
		expect(result.valid).toBe(false)
		expect(result.errors).toContain('Question bank must be an array')
		expect(result.questionCount).toBe(0)
	})

	it('should return invalid for non-array input', () => {
		const result = validateQuestionBank('not an array')
		expect(result.valid).toBe(false)
		expect(result.errors).toContain('Question bank must be an array')
		expect(result.questionCount).toBe(0)
	})

	it('should return invalid for empty array', () => {
		const result = validateQuestionBank([])
		expect(result.valid).toBe(false)
		expect(result.errors).toContain('Question bank cannot be empty')
		expect(result.questionCount).toBe(0)
	})

	it('should report errors from individual questions with index', () => {
		const invalidQuestion = { ...validQuestion1 }
		delete invalidQuestion.id
		const result = validateQuestionBank([validQuestion1, invalidQuestion])
		expect(result.valid).toBe(false)
		expect(result.errors.some(e => e.startsWith('Question at index 1:'))).toBe(true)
		expect(result.questionCount).toBe(2)
	})

	it('should detect duplicate IDs', () => {
		const duplicateQuestion = { ...validQuestion2, id: 'test-001' }
		const result = validateQuestionBank([validQuestion1, duplicateQuestion])
		expect(result.valid).toBe(false)
		expect(result.errors).toContain('Duplicate question ID found: "test-001"')
	})

	it('should report multiple duplicate IDs', () => {
		const questions = [
			validQuestion1,
			{ ...validQuestion2, id: 'test-001' },
			{ ...validQuestion2, id: 'test-002' },
			{ ...validQuestion1, id: 'test-002' }
		]
		const result = validateQuestionBank(questions)
		expect(result.valid).toBe(false)
		expect(result.errors).toContain('Duplicate question ID found: "test-001"')
		expect(result.errors).toContain('Duplicate question ID found: "test-002"')
	})

	it('should return correct questionCount regardless of validity', () => {
		const invalidQuestion = { ...validQuestion1 }
		delete invalidQuestion.id
		const result = validateQuestionBank([validQuestion1, invalidQuestion, validQuestion2])
		expect(result.questionCount).toBe(3)
	})
})
