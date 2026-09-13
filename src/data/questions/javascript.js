/**
 * JavaScript Questions Bank
 * Topics: closures, promises, dom, arrays
 * Minimum 20 questions with mix of difficulty levels
 *
 * Note: First answer in each answers array is always the correct answer (before shuffling)
 */

export default [
	// ==================== CLOSURES (5+ questions) ====================
	{
		id: 'js-001',
		text: 'What is a closure in JavaScript?',
		answers: [
			'A function that has access to variables from its outer scope even after the outer function has returned',
			'A way to close a browser window using JavaScript',
			'A method to end a loop early',
			'A technique for hiding HTML elements'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'closures'
	},
	{
		id: 'js-002',
		text: 'What will be logged to the console?\n\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\nconsole.log(counter());\nconsole.log(counter());',
		answers: [
			'1, then 2',
			'0, then 1',
			'1, then 1',
			'undefined, then undefined'
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'closures'
	},
	{
		id: 'js-003',
		text: 'Which of the following is a common use case for closures?',
		answers: [
			'Creating private variables and data encapsulation',
			'Making HTTP requests to servers',
			'Styling DOM elements',
			'Converting data types'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'closures'
	},
	{
		id: 'js-004',
		text: 'What problem does the closure solve in this code?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(function() {\n    console.log(i);\n  }, 1000);\n}',
		answers: [
			'Without closure, all timeouts log the same final value of i (3)',
			'Closures prevent the loop from running',
			'Closures make setTimeout synchronous',
			'There is no problem with this code'
		],
		difficulty: 'hard',
		category: 'javascript',
		topic: 'closures'
	},
	{
		id: 'js-005',
		text: 'How can you fix the loop problem to log 0, 1, 2 separately?',
		answers: [
			'Use let instead of var, or wrap in an IIFE',
			'Use var instead of let',
			'Remove the setTimeout',
			'Add a return statement inside the loop'
		],
		difficulty: 'hard',
		category: 'javascript',
		topic: 'closures'
	},
	{
		id: 'js-006',
		text: 'What is the lexical environment in the context of closures?',
		answers: [
			'The environment where a function was defined, containing the variables accessible to it',
			'The global window object',
			'The current call stack',
			"The browser's document object"
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'closures'
	},

	// ==================== PROMISES (5+ questions) ====================
	{
		id: 'js-007',
		text: 'What are the three states of a JavaScript Promise?',
		answers: [
			'Pending, Fulfilled, Rejected',
			'Start, Process, End',
			'Open, Closed, Error',
			'Loading, Success, Failure'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'promises'
	},
	{
		id: 'js-008',
		text: 'What does the .then() method return?',
		answers: [
			'A new Promise',
			'undefined',
			'The original Promise',
			'A callback function'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'promises'
	},
	{
		id: 'js-009',
		text: 'What is the purpose of Promise.all()?',
		answers: [
			'To wait for all promises in an array to resolve, or reject if any fails',
			'To execute promises one at a time in sequence',
			'To cancel all pending promises',
			'To create a new promise from an array'
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'promises'
	},
	{
		id: 'js-010',
		text: 'What is the difference between Promise.all() and Promise.allSettled()?',
		answers: [
			'Promise.allSettled waits for all promises regardless of rejection, while Promise.all rejects immediately if any promise rejects',
			'There is no difference, they are aliases',
			'Promise.all is faster than Promise.allSettled',
			'Promise.allSettled only works with async/await'
		],
		difficulty: 'hard',
		category: 'javascript',
		topic: 'promises'
	},
	{
		id: 'js-011',
		text: 'What will this code output?\n\nPromise.resolve(1)\n  .then(x => x + 1)\n  .then(x => { throw new Error("fail"); })\n  .catch(e => 3)\n  .then(x => console.log(x));',
		answers: ['3', '1', '2', 'Error: fail'],
		difficulty: 'hard',
		category: 'javascript',
		topic: 'promises'
	},
	{
		id: 'js-012',
		text: 'What does async/await provide over traditional Promise .then() chains?',
		answers: [
			'More readable, synchronous-looking code for handling asynchronous operations',
			'Better performance for API calls',
			'The ability to use callbacks',
			'Automatic error handling without try/catch'
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'promises'
	},

	// ==================== DOM (5+ questions) ====================
	{
		id: 'js-013',
		text: 'What does DOM stand for?',
		answers: [
			'Document Object Model',
			'Data Object Management',
			'Document Oriented Middleware',
			'Dynamic Object Manipulation'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'dom'
	},
	{
		id: 'js-014',
		text: 'Which method selects the first element matching a CSS selector?',
		answers: [
			'document.querySelector()',
			'document.getElementById()',
			'document.getElementsByClassName()',
			'document.selectElement()'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'dom'
	},
	{
		id: 'js-015',
		text: 'What is event bubbling?',
		answers: [
			'When an event triggers on an element, then bubbles up to its parent elements',
			'When multiple events are combined into one',
			'When an event is prevented from firing',
			'When events are queued in order'
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'dom'
	},
	{
		id: 'js-016',
		text: 'What is event delegation?',
		answers: [
			'Attaching a single event listener to a parent element to handle events for its children',
			'Preventing an event from propagating',
			'Assigning an event to multiple elements at once',
			'Removing event listeners after they fire'
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'dom'
	},
	{
		id: 'js-017',
		text: 'What is the difference between innerHTML and textContent?',
		answers: [
			'innerHTML parses content as HTML, textContent treats it as plain text',
			'textContent is faster but innerHTML is more secure',
			'innerHTML only works in IE, textContent is modern standard',
			'There is no difference, they are aliases'
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'dom'
	},
	{
		id: 'js-018',
		text: 'Which method creates a new DOM element?',
		answers: [
			'document.createElement()',
			'document.newElement()',
			'document.addElement()',
			'document.makeElement()'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'dom'
	},
	{
		id: 'js-019',
		text: 'What does event.stopPropagation() do?',
		answers: [
			'Prevents the event from bubbling up to parent elements',
			'Prevents the default action of the event',
			'Removes the event listener',
			'Cancels all pending events'
		],
		difficulty: 'hard',
		category: 'javascript',
		topic: 'dom'
	},

	// ==================== ARRAYS (5+ questions) ====================
	{
		id: 'js-020',
		text: 'What does the Array.map() method return?',
		answers: [
			'A new array with the results of calling a function on every element',
			'The original array modified in place',
			'A single value computed from the array',
			'undefined'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'arrays'
	},
	{
		id: 'js-021',
		text: 'What is the difference between .map() and .forEach()?',
		answers: [
			'.map() returns a new array, .forEach() returns undefined',
			'.forEach() returns a new array, .map() returns undefined',
			'They are identical in functionality',
			'.map() is for objects, .forEach() is for arrays'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'arrays'
	},
	{
		id: 'js-022',
		text: 'What does Array.filter() do?',
		answers: [
			'Creates a new array with elements that pass a test function',
			'Removes elements from the original array',
			'Sorts the array based on a condition',
			'Combines two arrays into one'
		],
		difficulty: 'easy',
		category: 'javascript',
		topic: 'arrays'
	},
	{
		id: 'js-023',
		text: 'What will [1, 2, 3].reduce((acc, val) => acc + val, 0) return?',
		answers: ['6', '[1, 2, 3]', '0', 'undefined'],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'arrays'
	},
	{
		id: 'js-024',
		text: 'Which array method modifies the original array?',
		answers: ['.push()', '.map()', '.filter()', '.concat()'],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'arrays'
	},
	{
		id: 'js-025',
		text: 'What does the spread operator (...) do with arrays?',
		answers: [
			'Expands an array into individual elements',
			'Combines all elements into a string',
			'Removes duplicate elements',
			'Reverses the array order'
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'arrays'
	},
	{
		id: 'js-026',
		text: 'What is the output of [...new Set([1, 2, 2, 3, 3, 3])]?',
		answers: [
			'[1, 2, 3]',
			'[1, 2, 2, 3, 3, 3]',
			'[3, 2, 1]',
			'Set { 1, 2, 3 }'
		],
		difficulty: 'hard',
		category: 'javascript',
		topic: 'arrays'
	},
	{
		id: 'js-027',
		text: 'What does Array.find() return?',
		answers: [
			'The first element that satisfies the test function, or undefined',
			'An array of all matching elements',
			'The index of the first matching element',
			'A boolean indicating if an element exists'
		],
		difficulty: 'medium',
		category: 'javascript',
		topic: 'arrays'
	}
]
