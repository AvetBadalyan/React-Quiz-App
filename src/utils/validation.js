/**
 * Validation utilities for question objects and question banks
 *
 * @module utils/validation
 */

import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from '../data/constants.js'

/**
 * Valid difficulty levels
 * @type {string[]}
 */
const VALID_DIFFICULTIES = Object.keys(DIFFICULTY_CONFIG)

/**
 * Valid categories
 * @type {string[]}
 */
const VALID_CATEGORIES = Object.keys(CATEGORY_CONFIG)

/**
 * Required number of answer options per question
 * @type {number}
 */
const REQUIRED_ANSWER_COUNT = 4

/**
 * Validates a single question object
 * Checks that all required fields are present and have correct types/values
 *
 * @param {Object} question - Question to validate
 * @returns {Object} Validation result with { valid: boolean, errors: string[] }
 */
export function validateQuestion(question) {
	const errors = []

	// Check if question is an object
	if (!question || typeof question !== 'object' || Array.isArray(question)) {
		return {
			valid: false,
			errors: ['Question must be a non-null object']
		}
	}

	// Validate id field
	if (!question.id) {
		errors.push('Missing required field: id')
	} else if (typeof question.id !== 'string') {
		errors.push('Field "id" must be a string')
	} else if (question.id.trim() === '') {
		errors.push('Field "id" cannot be empty')
	}

	// Validate text field
	if (question.text === undefined || question.text === null) {
		errors.push('Missing required field: text')
	} else if (typeof question.text !== 'string') {
		errors.push('Field "text" must be a string')
	} else if (question.text.trim() === '') {
		errors.push('Field "text" cannot be empty')
	}

	// Validate answers field
	if (!question.answers) {
		errors.push('Missing required field: answers')
	} else if (!Array.isArray(question.answers)) {
		errors.push('Field "answers" must be an array')
	} else {
		if (question.answers.length !== REQUIRED_ANSWER_COUNT) {
			errors.push(
				`Field "answers" must contain exactly ${REQUIRED_ANSWER_COUNT} options, found ${question.answers.length}`
			)
		}

		// Validate each answer is a non-empty string
		question.answers.forEach((answer, index) => {
			if (typeof answer !== 'string') {
				errors.push(`Answer at index ${index} must be a string`)
			} else if (answer.trim() === '') {
				errors.push(`Answer at index ${index} cannot be empty`)
			}
		})
	}

	// Validate difficulty field
	if (!question.difficulty) {
		errors.push('Missing required field: difficulty')
	} else if (typeof question.difficulty !== 'string') {
		errors.push('Field "difficulty" must be a string')
	} else if (!VALID_DIFFICULTIES.includes(question.difficulty)) {
		errors.push(
			`Field "difficulty" must be one of: ${VALID_DIFFICULTIES.join(', ')}. Found: "${question.difficulty}"`
		)
	}

	// Validate category field
	if (!question.category) {
		errors.push('Missing required field: category')
	} else if (typeof question.category !== 'string') {
		errors.push('Field "category" must be a string')
	} else if (!VALID_CATEGORIES.includes(question.category)) {
		errors.push(
			`Field "category" must be one of: ${VALID_CATEGORIES.join(', ')}. Found: "${question.category}"`
		)
	}

	// Validate topic field (optional but must be string if present)
	if (question.topic !== undefined && question.topic !== null) {
		if (typeof question.topic !== 'string') {
			errors.push('Field "topic" must be a string when provided')
		} else if (question.topic.trim() === '') {
			errors.push('Field "topic" cannot be empty when provided')
		}
	}

	return {
		valid: errors.length === 0,
		errors
	}
}

/**
 * Validates an entire question bank (array of questions)
 * Checks that all questions are valid and IDs are unique
 *
 * @param {Array} questions - Array of questions to validate
 * @returns {Object} Validation result with { valid: boolean, errors: string[], questionCount: number }
 */
export function validateQuestionBank(questions) {
	const errors = []

	// Check if questions is an array
	if (!questions || !Array.isArray(questions)) {
		return {
			valid: false,
			errors: ['Question bank must be an array'],
			questionCount: 0
		}
	}

	// Check if array is empty
	if (questions.length === 0) {
		return {
			valid: false,
			errors: ['Question bank cannot be empty'],
			questionCount: 0
		}
	}

	// Track IDs to check for duplicates
	const seenIds = new Set()
	const duplicateIds = new Set()

	// Validate each question
	questions.forEach((question, index) => {
		const result = validateQuestion(question)

		if (!result.valid) {
			// Prefix each error with the question index
			result.errors.forEach(error => {
				errors.push(`Question at index ${index}: ${error}`)
			})
		}

		// Check for duplicate IDs
		if (question && question.id) {
			if (seenIds.has(question.id)) {
				duplicateIds.add(question.id)
			} else {
				seenIds.add(question.id)
			}
		}
	})

	// Add duplicate ID errors
	if (duplicateIds.size > 0) {
		duplicateIds.forEach(id => {
			errors.push(`Duplicate question ID found: "${id}"`)
		})
	}

	return {
		valid: errors.length === 0,
		errors,
		questionCount: questions.length
	}
}
