/**
 * Question bank — combines each category's questions into a single lookup.
 */

import cssQuestions from './css.js'
import htmlQuestions from './html.js'
import javascriptQuestions from './javascript.js'
import jstrickyQuestions from './jstricky.js'
import reactQuestions from './react.js'

const questionBank = {
	html: htmlQuestions,
	css: cssQuestions,
	javascript: javascriptQuestions,
	react: reactQuestions,
	jstricky: jstrickyQuestions
}

/**
 * Returns the questions for a category, or an empty array if unknown.
 * @param {string} category - 'html' | 'css' | 'javascript' | 'react' | 'jstricky'
 * @returns {Array}
 */
export function getQuestionsByCategory(category) {
	return questionBank[category] || []
}
