/**
 * JS Tricky Questions
 *
 * 155 output-prediction questions sourced from
 * https://github.com/lydiahallie/javascript-questions
 * by Lydia Hallie (MIT License).
 *
 * Schema: { id, text, codeBlock, answers, difficulty, topic, category }
 * answers[0] is always the correct answer.
 * codeBlock is a raw code string rendered in a <pre><code> block in the UI.
 */

const jstrickyQuestions = [
	{
		id: 'jstricky-001',
		text: `What's the output?`,
		codeBlock: `function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}

sayHi();`,
		answers: [
			`undefined and ReferenceError`,
			`Lydia and undefined`,
			`Lydia and ReferenceError`,
			`ReferenceError and 21`
		],
		difficulty: 'easy',
		topic: 'hoisting',
		category: 'jstricky'
	},

	{
		id: 'jstricky-002',
		text: `What's the output?`,
		codeBlock: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}`,
		answers: [`3 3 3 and 0 1 2`, `0 1 2 and 0 1 2`, `0 1 2 and 3 3 3`],
		difficulty: 'easy',
		topic: 'event-loop',
		category: 'jstricky'
	},

	{
		id: 'jstricky-003',
		text: `What's the output?`,
		codeBlock: `const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());`,
		answers: [
			`20 and NaN`,
			`20 and 62.83185307179586`,
			`20 and 63`,
			`NaN and 63`
		],
		difficulty: 'easy',
		topic: 'this',
		category: 'jstricky'
	},

	{
		id: 'jstricky-004',
		text: `What's the output?`,
		codeBlock: `+true;
!'Lydia';`,
		answers: [`1 and false`, `false and NaN`, `false and false`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-005',
		text: `Which one is true?`,
		codeBlock: `const bird = {
  size: 'small',
};

const mouse = {
  name: 'Mickey',
  small: true,
};`,
		answers: [
			`mouse.bird.size is not valid`,
			`mouse[bird.size] is not valid`,
			`mouse[bird["size"]] is not valid`,
			`All of them are valid`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-006',
		text: `What's the output?`,
		codeBlock: `let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';
console.log(d.greeting);`,
		answers: [`Hello`, `Hey!`, `undefined`, `ReferenceError`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-007',
		text: `What's the output?`,
		codeBlock: `let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);`,
		answers: [
			`true false false`,
			`true false true`,
			`false false true`,
			`false true true`
		],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-008',
		text: `What's the output?`,
		codeBlock: `class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: 'purple' });
console.log(freddie.colorChange('orange'));`,
		answers: [`TypeError`, `orange`, `purple`, `green`],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-009',
		text: `What's the output?`,
		codeBlock: `let greeting;
greetign = {}; // Typo!
console.log(greetign);`,
		answers: [`{}`, `ReferenceError: greetign is not defined`, `undefined`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-010',
		text: `What happens when we do this?`,
		codeBlock: `function bark() {
  console.log('Woof!');
}

bark.animal = 'dog';`,
		answers: [
			`Nothing, this is totally fine!`,
			`SyntaxError. You cannot add properties to a function this way.`,
			`"Woof" gets logged.`,
			`ReferenceError`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-011',
		text: `What's the output?`,
		codeBlock: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie');
Person.getFullName = function() {
  return \`\${this.firstName} \${this.lastName}\`;
};

console.log(member.getFullName());`,
		answers: [
			`TypeError`,
			`SyntaxError`,
			`Lydia Hallie`,
			`undefined undefined`
		],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-012',
		text: `What's the output?`,
		codeBlock: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);`,
		answers: [
			`Person {firstName: "Lydia", lastName: "Hallie"} and undefined`,
			`Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}`,
			`Person {firstName: "Lydia", lastName: "Hallie"} and {}`,
			`Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError`
		],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-013',
		text: `What are the three phases of event propagation?`,
		codeBlock: null,
		answers: [
			`Capturing > Target > Bubbling`,
			`Target > Capturing > Bubbling`,
			`Bubbling > Target > Capturing`,
			`Target > Bubbling > Capturing`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-014',
		text: `All object have prototypes.`,
		codeBlock: null,
		answers: [`false`, `true`],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-015',
		text: `What's the output?`,
		codeBlock: `function sum(a, b) {
  return a + b;
}

sum(1, '2');`,
		answers: [`"12"`, `NaN`, `TypeError`, `3`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-016',
		text: `What's the output?`,
		codeBlock: `let number = 0;
console.log(number++);
console.log(++number);
console.log(number);`,
		answers: [`0 2 2`, `1 1 2`, `1 2 2`, `0 1 2`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-017',
		text: `What's the output?`,
		codeBlock: `function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo\`\${person} is \${age} years old\`;`,
		answers: [
			`["", " is ", " years old"] "Lydia" 21`,
			`"Lydia" 21 ["", " is ", " years old"]`,
			`"Lydia" ["", " is ", " years old"] 21`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-018',
		text: `What's the output?`,
		codeBlock: `function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(\`Hmm.. You don't have an age I guess\`);
  }
}

checkAge({ age: 18 });`,
		answers: [
			`Hmm.. You don't have an age I guess`,
			`You are an adult!`,
			`You are still an adult.`
		],
		difficulty: 'easy',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-019',
		text: `What's the output?`,
		codeBlock: `function getAge(...args) {
  console.log(typeof args);
}

getAge(21);`,
		answers: [`"object"`, `"number"`, `"array"`, `"NaN"`],
		difficulty: 'easy',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-020',
		text: `What's the output?`,
		codeBlock: `function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();`,
		answers: [`ReferenceError`, `21`, `undefined`, `TypeError`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-021',
		text: `What's the value of \`sum\`?`,
		codeBlock: `const sum = eval('10*10+5');`,
		answers: [`105`, `"105"`, `TypeError`, `"10*10+5"`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-022',
		text: `How long is cool_secret accessible?`,
		codeBlock: `sessionStorage.setItem('cool_secret', 123);`,
		answers: [
			`When the user closes the tab.`,
			`Forever, the data doesn't get lost.`,
			`When the user closes the entire browser, not only the tab.`,
			`When the user shuts off their computer.`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-023',
		text: `What's the output?`,
		codeBlock: `var num = 8;
var num = 10;

console.log(num);`,
		answers: [`10`, `8`, `SyntaxError`, `ReferenceError`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-024',
		text: `What's the output?`,
		codeBlock: `const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);`,
		answers: [
			`true true false true`,
			`false true false true`,
			`false true true true`,
			`true true true true`
		],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-025',
		text: `What's the output?`,
		codeBlock: `const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);`,
		answers: [
			`{ a: "three", b: "two" }`,
			`{ a: "one", b: "two" }`,
			`{ b: "two", a: "three" }`,
			`SyntaxError`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-026',
		text: `The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.`,
		codeBlock: null,
		answers: [`true`, `false`, `it depends`],
		difficulty: 'easy',
		topic: 'this',
		category: 'jstricky'
	},

	{
		id: 'jstricky-027',
		text: `What's the output?`,
		codeBlock: `for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}`,
		answers: [`1 2 4`, `1 2`, `1 2 3`, `1 3 4`],
		difficulty: 'easy',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-028',
		text: `What's the output?`,
		codeBlock: `String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!';
};

const name = 'Lydia';

console.log(name.giveLydiaPizza())`,
		answers: [
			`"Just give Lydia pizza already!"`,
			`TypeError: not a function`,
			`SyntaxError`,
			`undefined`
		],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-029',
		text: `What's the output?`,
		codeBlock: `const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);`,
		answers: [`456`, `123`, `undefined`, `ReferenceError`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-030',
		text: `What's the output?`,
		codeBlock: `const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'));
const baz = () => console.log('Third');

bar();
foo();
baz();`,
		answers: [
			`First Third Second`,
			`First Second Third`,
			`Second First Third`,
			`Second Third First`
		],
		difficulty: 'easy',
		topic: 'event-loop',
		category: 'jstricky'
	},

	{
		id: 'jstricky-031',
		text: `What is the event.target when clicking the button?

\`\`\`html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>
\`\`\``,
		codeBlock: null,
		answers: [
			`button`,
			`Outer div`,
			`Inner div`,
			`An array of all nested elements.`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-032',
		text: `When you click the paragraph, what's the logged output?

\`\`\`html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>
\`\`\``,
		codeBlock: null,
		answers: [`p div`, `div p`, `p`, `div`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-033',
		text: `What's the output?`,
		codeBlock: `const person = { name: 'Lydia' };

function sayHi(age) {
  return \`\${this.name} is \${age}\`;
}

console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));`,
		answers: [
			`Lydia is 21 function`,
			`undefined is 21 Lydia is 21`,
			`function function`,
			`Lydia is 21 Lydia is 21`
		],
		difficulty: 'easy',
		topic: 'this',
		category: 'jstricky'
	},

	{
		id: 'jstricky-034',
		text: `What's the output?`,
		codeBlock: `function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi());`,
		answers: [`"number"`, `"object"`, `"function"`, `"undefined"`],
		difficulty: 'easy',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-035',
		text: `Which of these values are falsy?`,
		codeBlock: `0;
new Number(0);
('');
(' ');
new Boolean(false);
undefined;`,
		answers: [
			`0, '', undefined`,
			`0, new Number(0), '', new Boolean(false), undefined`,
			`0, '', new Boolean(false), undefined`,
			`All of them are falsy`
		],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-036',
		text: `What's the output?`,
		codeBlock: `console.log(typeof typeof 1);`,
		answers: [`"string"`, `"number"`, `"object"`, `"undefined"`],
		difficulty: 'easy',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-037',
		text: `What's the output?`,
		codeBlock: `const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);`,
		answers: [
			`[1, 2, 3, empty x 7, 11]`,
			`[1, 2, 3, null x 7, 11]`,
			`[1, 2, 3, 11]`,
			`SyntaxError`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-038',
		text: `What's the output?`,
		codeBlock: `(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();`,
		answers: [
			`1 undefined 2`,
			`undefined undefined undefined`,
			`1 1 2`,
			`1 undefined undefined`
		],
		difficulty: 'easy',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-039',
		text: `Everything in JavaScript is either a...`,
		codeBlock: null,
		answers: [
			`primitive or object`,
			`function or object`,
			`trick question! only objects`,
			`number or object`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-040',
		text: `What's the output?`,
		codeBlock: `[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);`,
		answers: [
			`[1, 2, 0, 1, 2, 3]`,
			`[0, 1, 2, 3, 1, 2]`,
			`[6, 1, 2]`,
			`[1, 2, 6]`
		],
		difficulty: 'easy',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-041',
		text: `What's the output?`,
		codeBlock: `!!null;
!!'';
!!1;`,
		answers: [
			`false false true`,
			`false true false`,
			`false true true`,
			`true true false`
		],
		difficulty: 'easy',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-042',
		text: `What does the \`setInterval\` method return in the browser?`,
		codeBlock: `setInterval(() => console.log('Hi'), 1000);`,
		answers: [
			`a unique id`,
			`the amount of milliseconds specified`,
			`the passed function`,
			`undefined`
		],
		difficulty: 'easy',
		topic: 'event-loop',
		category: 'jstricky'
	},

	{
		id: 'jstricky-043',
		text: `What does this return?`,
		codeBlock: `[...'Lydia'];`,
		answers: [
			`["L", "y", "d", "i", "a"]`,
			`["Lydia"]`,
			`[[], "Lydia"]`,
			`[["L", "y", "d", "i", "a"]]`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-044',
		text: `What's the output?`,
		codeBlock: `function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);`,
		answers: [`10, 20`, `[0, 10], [10, 20]`, `20, 20`, `0, 10 and 10, 20`],
		difficulty: 'easy',
		topic: 'es6',
		category: 'jstricky'
	},

	{
		id: 'jstricky-045',
		text: `What does this return?`,
		codeBlock: `const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));`,
		answers: [`"two"`, `"one"`, `"two" "one"`, `"one" "two"`],
		difficulty: 'easy',
		topic: 'event-loop',
		category: 'jstricky'
	},

	{
		id: 'jstricky-046',
		text: `What's the output?`,
		codeBlock: `let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);`,
		answers: [`[{ name: "Lydia" }]`, `null`, `[null]`, `[{}]`],
		difficulty: 'easy',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-047',
		text: `What's the output?`,
		codeBlock: `const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}`,
		answers: [
			`"name", "age"`,
			`{ name: "Lydia" }, { age: 21 }`,
			`"Lydia", 21`,
			`["name", "Lydia"], ["age", 21]`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-048',
		text: `What's the output?`,
		codeBlock: `console.log(3 + 4 + '5');`,
		answers: [`"75"`, `"345"`, `12`, `"12"`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-049',
		text: `What's the value of \`num\`?`,
		codeBlock: `const num = parseInt('7*6', 10);`,
		answers: [`7`, `42`, `"42"`, `NaN`],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-050',
		text: `What's the output?`,
		codeBlock: `[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});`,
		answers: [
			`[undefined, undefined, undefined]`,
			`[]`,
			`[null, null, null]`,
			`[ 3 x empty ]`
		],
		difficulty: 'easy',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-051',
		text: `What's the output?`,
		codeBlock: `function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);

console.log(person, birthYear);`,
		answers: [
			`{ name: "Lydia" }, "1997"`,
			`{ name: "Sarah" }, "1998"`,
			`{ name: "Lydia" }, "1998"`,
			`{ name: "Sarah" }, "1997"`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-052',
		text: `What's the output?`,
		codeBlock: `function greeting() {
  throw 'Hello world!';
}

function sayHi() {
  try {
    const data = greeting();
    console.log('It worked!', data);
  } catch (e) {
    console.log('Oh no an error:', e);
  }
}

sayHi();`,
		answers: [
			`Oh no an error: Hello world!`,
			`It worked! Hello world!`,
			`Oh no an error: undefined`,
			`SyntaxError: can only throw Error objects`
		],
		difficulty: 'easy',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-053',
		text: `What's the output?`,
		codeBlock: `function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);`,
		answers: [`"Maserati"`, `"Lamborghini"`, `ReferenceError`, `TypeError`],
		difficulty: 'medium',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-054',
		text: `What's the output?`,
		codeBlock: `(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);`,
		answers: [
			`"undefined", "number"`,
			`"number", "number"`,
			`"object", "number"`,
			`"number", "undefined"`
		],
		difficulty: 'medium',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-055',
		text: `What's the output?`,
		codeBlock: `class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function() {
  console.log(\`Woof I am \${this.name}\`);
};

const pet = new Dog('Mara');

pet.bark();

delete Dog.prototype.bark;

pet.bark();`,
		answers: [
			`"Woof I am Mara", TypeError`,
			`"Woof I am Mara", "Woof I am Mara"`,
			`"Woof I am Mara", undefined`,
			`TypeError, TypeError`
		],
		difficulty: 'medium',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-056',
		text: `What's the output?`,
		codeBlock: `const set = new Set([1, 1, 2, 3, 4]);

console.log(set);`,
		answers: [
			`{1, 2, 3, 4}`,
			`[1, 1, 2, 3, 4]`,
			`[1, 2, 3, 4]`,
			`{1, 1, 2, 3, 4}`
		],
		difficulty: 'medium',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-057',
		text: `What's the output?`,
		codeBlock: `// counter.js
let counter = 10;
export default counter;`,
		answers: [`Error`, `10`, `11`, `NaN`],
		difficulty: 'medium',
		topic: 'closures',
		category: 'jstricky'
	},

	{
		id: 'jstricky-058',
		text: `What's the output?`,
		codeBlock: `const name = 'Lydia';
age = 21;

console.log(delete name);
console.log(delete age);`,
		answers: [
			`false, true`,
			`"Lydia", 21`,
			`true, true`,
			`undefined, undefined`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-059',
		text: `What's the output?`,
		codeBlock: `const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);`,
		answers: [`1`, `[[1, 2, 3, 4, 5]]`, `[1, 2, 3, 4, 5]`, `[1]`],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-060',
		text: `What's the output?`,
		codeBlock: `const user = { name: 'Lydia', age: 21 };
const admin = { admin: true, ...user };

console.log(admin);`,
		answers: [
			`{ admin: true, name: "Lydia", age: 21 }`,
			`{ admin: true, user: { name: "Lydia", age: 21 } }`,
			`{ admin: true, user: ["Lydia", 21] }`,
			`{ admin: true }`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-061',
		text: `What's the output?`,
		codeBlock: `const person = { name: 'Lydia' };

Object.defineProperty(person, 'age', { value: 21 });

console.log(person);
console.log(Object.keys(person));`,
		answers: [
			`{ name: "Lydia", age: 21 }, ["name"]`,
			`{ name: "Lydia", age: 21 }, ["name", "age"]`,
			`{ name: "Lydia"}, ["name", "age"]`,
			`{ name: "Lydia"}, ["age"]`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-062',
		text: `What's the output?`,
		codeBlock: `const settings = {
  username: 'lydiahallie',
  level: 19,
  health: 90,
};

const data = JSON.stringify(settings, ['level', 'health']);
console.log(data);`,
		answers: [
			`"{"level":19, "health":90}"`,
			`"{"username": "lydiahallie"}"`,
			`"["level", "health"]"`,
			`"{"username": "lydiahallie", "level":19, "health":90}"`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-063',
		text: `What's the output?`,
		codeBlock: `let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);`,
		answers: [`10, 10`, `10, 11`, `11, 11`, `11, 12`],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-064',
		text: `What's the output?`,
		codeBlock: `const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);`,
		answers: [
			`20, 20, 20, 40`,
			`20, 40, 80, 160`,
			`20, 40, 20, 40`,
			`NaN, NaN, 20, 40`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-065',
		text: `What's the output?`,
		codeBlock: `[1, 2, 3, 4].reduce((x, y) => console.log(x, y));`,
		answers: [
			`1 2 and undefined 3 and undefined 4`,
			`1 2 and 3 3 and 6 4`,
			`1 2 and 2 3 and 3 4`,
			`1 undefined and 2 undefined and 3 undefined and 4 undefined`
		],
		difficulty: 'medium',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-066',
		text: `With which constructor can we successfully extend the \`Dog\` class?`,
		codeBlock: `class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  // 1
  constructor(name, size) {
    this.size = size;
  }
  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }
  // 4
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

};`,
		answers: [`2`, `1`, `3`, `4`],
		difficulty: 'medium',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-067',
		text: `What's the output?`,
		codeBlock: `// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;`,
		answers: [
			`running sum.js, running index.js, 3`,
			`running index.js, running sum.js, 3`,
			`running sum.js, 3, running index.js`,
			`running index.js, undefined, running sum.js`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-068',
		text: `What's the output?`,
		codeBlock: `console.log(Number(2) === Number(2));
console.log(Boolean(false) === Boolean(false));
console.log(Symbol('foo') === Symbol('foo'));`,
		answers: [
			`true, true, false`,
			`false, true, false`,
			`true, false, true`,
			`true, true, true`
		],
		difficulty: 'medium',
		topic: 'es6',
		category: 'jstricky'
	},

	{
		id: 'jstricky-069',
		text: `What's the output?`,
		codeBlock: `const name = 'Lydia Hallie';
console.log(name.padStart(13));
console.log(name.padStart(2));`,
		answers: [
			`" Lydia Hallie", "Lydia Hallie" ("[1x whitespace]Lydia Hallie", "Lydia Hallie")`,
			`"Lydia Hallie", "Lydia Hallie"`,
			`" Lydia Hallie", " Lydia Hallie" ("[13x whitespace]Lydia Hallie", "[2x whitespace]Lydia Hallie")`,
			`"Lydia Hallie", "Lyd",`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-070',
		text: `What's the output?`,
		codeBlock: `console.log('🥑' + '💻');`,
		answers: [
			`"🥑💻"`,
			`257548`,
			`A string containing their code points`,
			`Error`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-071',
		text: `How can we log the values that are commented out after the console.log statement?`,
		codeBlock: `function* startGame() {
  const answer = yield 'Do you love JavaScript?';
  if (answer !== 'Yes') {
    return "Oh wow... Guess we're done here";
  }
  return 'JavaScript loves you back ❤️';
}

const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️`,
		answers: [
			`game.next().value and game.next("Yes").value`,
			`game.next("Yes").value and game.next().value`,
			`game.next.value("Yes") and game.next.value()`,
			`game.next.value() and game.next.value("Yes")`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-072',
		text: `What's the output?`,
		codeBlock: `console.log(String.raw\`Hello\\nworld\`);`,
		answers: [
			`Hello\\nworld`,
			`Hello world!`,
			`Hello <br />&nbsp; &nbsp; &nbsp;world`,
			`Hello\\n <br /> &nbsp; &nbsp; &nbsp;world`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-073',
		text: `What's the output?`,
		codeBlock: `async function getData() {
  return await Promise.resolve('I made it!');
}

const data = getData();
console.log(data);`,
		answers: [
			`Promise {<pending>}`,
			`"I made it!"`,
			`Promise {<resolved>: "I made it!"}`,
			`undefined`
		],
		difficulty: 'medium',
		topic: 'promises',
		category: 'jstricky'
	},

	{
		id: 'jstricky-074',
		text: `What's the output?`,
		codeBlock: `function addToList(item, list) {
  return list.push(item);
}

const result = addToList('apple', ['banana']);
console.log(result);`,
		answers: [`2`, `['apple', 'banana']`, `true`, `undefined`],
		difficulty: 'medium',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-075',
		text: `What's the output?`,
		codeBlock: `const box = { x: 10, y: 20 };

Object.freeze(box);

const shape = box;
shape.x = 100;

console.log(shape);`,
		answers: [
			`{ x: 10, y: 20 }`,
			`{ x: 100, y: 20 }`,
			`{ x: 100 }`,
			`ReferenceError`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-076',
		text: `What's the output?`,
		codeBlock: `const { firstName: myName } = { firstName: 'Lydia' };

console.log(firstName);`,
		answers: [`ReferenceError`, `"Lydia"`, `"myName"`, `undefined`],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-077',
		text: `Is this a pure function?`,
		codeBlock: `function sum(a, b) {
  return a + b;
}`,
		answers: [`Yes`, `No`],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-078',
		text: `What is the output?`,
		codeBlock: `const add = () => {
  const cache = {};
  return num => {
    if (num in cache) {
      return \`From cache! \${cache[num]}\`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return \`Calculated! \${result}\`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));`,
		answers: [
			`Calculated! 20 From cache! 20 From cache! 20`,
			`Calculated! 20 Calculated! 20 Calculated! 20`,
			`Calculated! 20 From cache! 20 Calculated! 20`,
			`Calculated! 20 From cache! 20 Error`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-079',
		text: `What is the output?`,
		codeBlock: `const myLifeSummedUp = ['☕', '💻', '🍷', '🍫'];

for (let item in myLifeSummedUp) {
  console.log(item);
}

for (let item of myLifeSummedUp) {
  console.log(item);
}`,
		answers: [
			`0 1 2 3 and "☕" "💻" "🍷" "🍫"`,
			`"☕" "💻" "🍷" "🍫" and "☕" "💻" "🍷" "🍫"`,
			`"☕" "💻" "🍷" "🍫" and 0 1 2 3`,
			`0 1 2 3 and {0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-080',
		text: `What is the output?`,
		codeBlock: `const list = [1 + 2, 1 * 2, 1 / 2];
console.log(list);`,
		answers: [
			`[3, 2, 0.5]`,
			`["1 + 2", "1 * 2", "1 / 2"]`,
			`["12", 2, 0.5]`,
			`[1, 1, 1]`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-081',
		text: `What is the output?`,
		codeBlock: `function sayHi(name) {
  return \`Hi there, \${name}\`;
}

console.log(sayHi());`,
		answers: [
			`Hi there, undefined`,
			`Hi there,`,
			`Hi there, null`,
			`ReferenceError`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-082',
		text: `What is the output?`,
		codeBlock: `var status = '😎';

setTimeout(() => {
  const status = '😍';

  const data = {
    status: '🥑',
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
}, 0);`,
		answers: [
			`"🥑" and "😎"`,
			`"🥑" and "😍"`,
			`"😍" and "😎"`,
			`"😎" and "😎"`
		],
		difficulty: 'medium',
		topic: 'event-loop',
		category: 'jstricky'
	},

	{
		id: 'jstricky-083',
		text: `What is the output?`,
		codeBlock: `const person = {
  name: 'Lydia',
  age: 21,
};

let city = person.city;
city = 'Amsterdam';

console.log(person);`,
		answers: [
			`{ name: "Lydia", age: 21 }`,
			`{ name: "Lydia", age: 21, city: "Amsterdam" }`,
			`{ name: "Lydia", age: 21, city: undefined }`,
			`"Amsterdam"`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-084',
		text: `What is the output?`,
		codeBlock: `function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you're too young.";
  } else {
    const message = "Yay! You're old enough!";
  }

  return message;
}

console.log(checkAge(21));`,
		answers: [
			`ReferenceError`,
			`"Sorry, you're too young."`,
			`"Yay! You're old enough!"`,
			`undefined`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-085',
		text: `What kind of information would get logged?`,
		codeBlock: `fetch('https://www.website.com/api/user/1')
  .then(res => res.json())
  .then(res => console.log(res));`,
		answers: [
			`The result of the callback in the previous .then().`,
			`The result of the fetch method.`,
			`The result of the second invocation of the fetch method.`,
			`It would always be undefined.`
		],
		difficulty: 'medium',
		topic: 'promises',
		category: 'jstricky'
	},

	{
		id: 'jstricky-086',
		text: `Which option is a way to set \`hasName\` equal to \`true\`, provided you cannot pass \`true\` as an argument?`,
		codeBlock: `function getName(name) {
  const hasName = //
}`,
		answers: [`!!name`, `name`, `new Boolean(name)`, `name.length`],
		difficulty: 'medium',
		topic: 'es6',
		category: 'jstricky'
	},

	{
		id: 'jstricky-087',
		text: `What's the output?`,
		codeBlock: `console.log('I want pizza'[0]);`,
		answers: [`"I"`, `"""`, `SyntaxError`, `undefined`],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-088',
		text: `What's the output?`,
		codeBlock: `function sum(num1, num2 = num1) {
  console.log(num1 + num2);
}

sum(10);`,
		answers: [`20`, `NaN`, `ReferenceError`, `undefined`],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-089',
		text: `What's the output?`,
		codeBlock: `// module.js
export default () => 'Hello world';
export const name = 'Lydia';

// index.js
import * as data from './module';

console.log(data);`,
		answers: [
			`{ default: function default(), name: "Lydia" }`,
			`{ default: function default() }`,
			`{ default: "Hello world", name: "Lydia" }`,
			`Global object of module.js`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-090',
		text: `What's the output?`,
		codeBlock: `class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);`,
		answers: [`"object"`, `"class"`, `"function"`, `"string"`],
		difficulty: 'medium',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-091',
		text: `What's the output?`,
		codeBlock: `let newList = [1, 2, 3].push(4);

console.log(newList.push(5));`,
		answers: [`Error`, `[1, 2, 3, 4, 5]`, `[1, 2, 3, 5]`, `[1, 2, 3, 4]`],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-092',
		text: `What's the output?`,
		codeBlock: `function giveLydiaPizza() {
  return 'Here is pizza!';
}

const giveLydiaChocolate = () =>
  "Here's chocolate... now go hit the gym already.";

console.log(giveLydiaPizza.prototype);
console.log(giveLydiaChocolate.prototype);`,
		answers: [
			`{ constructor: ...} undefined`,
			`{ constructor: ...} { constructor: ...}`,
			`{} { constructor: ...}`,
			`{ constructor: ...} {}`
		],
		difficulty: 'medium',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-093',
		text: `What's the output?`,
		codeBlock: `const person = {
  name: 'Lydia',
  age: 21,
};

for (const [x, y] of Object.entries(person)) {
  console.log(x, y);
}`,
		answers: [
			`name Lydia and age 21`,
			`["name", "Lydia"] and ["age", 21]`,
			`["name", "age"] and undefined`,
			`Error`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-094',
		text: `What's the output?`,
		codeBlock: `function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")`,
		answers: [
			`SyntaxError`,
			`["banana", "apple", "pear", "orange"]`,
			`[["banana", "apple"], "pear", "orange"]`,
			`["banana", "apple", ["pear"], "orange"]`
		],
		difficulty: 'medium',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-095',
		text: `What's the output?`,
		codeBlock: `function nums(a, b) {
  if (a > b) console.log('a is bigger');
  else console.log('b is bigger');
  return
  a + b;
}

console.log(nums(4, 2));
console.log(nums(1, 2));`,
		answers: [
			`a is bigger, undefined and b is bigger, undefined`,
			`a is bigger, 6 and b is bigger, 3`,
			`undefined and undefined`,
			`SyntaxError`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-096',
		text: `What's the output?`,
		codeBlock: `class Person {
  constructor() {
    this.name = 'Lydia';
  }
}

Person = class AnotherPerson {
  constructor() {
    this.name = 'Sarah';
  }
};

const member = new Person();
console.log(member.name);`,
		answers: [
			`"Sarah"`,
			`"Lydia"`,
			`Error: cannot redeclare Person`,
			`SyntaxError`
		],
		difficulty: 'medium',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-097',
		text: `What's the output?`,
		codeBlock: `const info = {
  [Symbol('a')]: 'b',
};

console.log(info);
console.log(Object.keys(info));`,
		answers: [
			`{Symbol('a'): 'b'} and []`,
			`{Symbol('a'): 'b'} and ["{Symbol('a')"]`,
			`{} and []`,
			`{ a: "b" } and ["a"]`
		],
		difficulty: 'medium',
		topic: 'es6',
		category: 'jstricky'
	},

	{
		id: 'jstricky-098',
		text: `What's the output?`,
		codeBlock: `const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }

const list = [1, 2, 3, 4]
const user = { name: "Lydia", age: 21 }

console.log(getList(list))
console.log(getUser(user))`,
		answers: [
			`[1, [2, 3, 4]] and SyntaxError`,
			`[1, [2, 3, 4]] and { name: "Lydia", age: 21 }`,
			`[1, 2, 3, 4] and { name: "Lydia", age: 21 }`,
			`Error and { name: "Lydia", age: 21 }`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-099',
		text: `What's the output?`,
		codeBlock: `const name = 'Lydia';

console.log(name());`,
		answers: [`TypeError`, `SyntaxError`, `ReferenceError`, `undefined`],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-100',
		text: `What's the value of output?`,
		codeBlock: `// 🎉✨ This is my 100th question! ✨🎉

const output = \`\${[] && 'Im'}possible!
You should\${'' && \`n't\`} see a therapist after so much JavaScript lol\`;`,
		answers: [
			`Impossible! You should see a therapist after so much JavaScript lol`,
			`possible! You should see a therapist after so much JavaScript lol`,
			`possible! You shouldn't see a therapist after so much JavaScript lol`,
			`Impossible! You shouldn't see a therapist after so much JavaScript lol`
		],
		difficulty: 'medium',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-101',
		text: `What's the value of output?`,
		codeBlock: `const one = false || {} || null;
const two = null || false || '';
const three = [] || 0 || true;

console.log(one, two, three);`,
		answers: [`{} "" []`, `false null []`, `null "" true`, `null null true`],
		difficulty: 'medium',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-102',
		text: `What's the value of output?`,
		codeBlock: `const myPromise = () => Promise.resolve('I have resolved!');

function firstFunction() {
  myPromise().then(res => console.log(res));
  console.log('second');
}

async function secondFunction() {
  console.log(await myPromise());
  console.log('second');
}

firstFunction();
secondFunction();`,
		answers: [
			`second, I have resolved! and I have resolved!, second`,
			`I have resolved!, second and I have resolved!, second`,
			`second, I have resolved! and second, I have resolved!`,
			`I have resolved!, second and second, I have resolved!`
		],
		difficulty: 'medium',
		topic: 'promises',
		category: 'jstricky'
	},

	{
		id: 'jstricky-103',
		text: `What's the value of output?`,
		codeBlock: `const set = new Set();

set.add(1);
set.add('Lydia');
set.add({ name: 'Lydia' });

for (let item of set) {
  console.log(item + 2);
}`,
		answers: [
			`3, Lydia2, [object Object]2`,
			`3, NaN, NaN`,
			`3, 7, NaN`,
			`"12", Lydia2, [object Object]2`
		],
		difficulty: 'medium',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-104',
		text: `What's its value?`,
		codeBlock: `Promise.resolve(5);`,
		answers: [
			`Promise {<fulfilled>: 5}`,
			`5`,
			`Promise {<pending>: 5}`,
			`Error`
		],
		difficulty: 'medium',
		topic: 'promises',
		category: 'jstricky'
	},

	{
		id: 'jstricky-105',
		text: `What's its value?`,
		codeBlock: `function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log('Not the same!');
  } else {
    console.log('They are the same!');
  }
}

const person = { name: 'Lydia' };

compareMembers(person);`,
		answers: [
			`They are the same!`,
			`Not the same!`,
			`ReferenceError`,
			`SyntaxError`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-106',
		text: `What's its value?`,
		codeBlock: `const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false,
};

const colors = ['pink', 'red', 'blue'];

console.log(colorConfig.colors[1]);`,
		answers: [`TypeError`, `true`, `false`, `undefined`],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-107',
		text: `What's its value?`,
		codeBlock: `console.log('❤️' === '❤️');`,
		answers: [`true`, `false`],
		difficulty: 'hard',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-108',
		text: `Which of these methods modifies the original array?`,
		codeBlock: `const emojis = ['✨', '🥑', '😍'];

emojis.map(x => x + '✨');
emojis.filter(x => x !== '🥑');
emojis.find(x => x !== '🥑');
emojis.reduce((acc, cur) => acc + '✨');
emojis.slice(1, 2, '✨');
emojis.splice(1, 2, '✨');`,
		answers: [
			`splice`,
			`All of them`,
			`map reduce slice splice`,
			`map slice splice`
		],
		difficulty: 'hard',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-109',
		text: `What's the output?`,
		codeBlock: `const food = ['🍕', '🍫', '🥑', '🍔'];
const info = { favoriteFood: food[0] };

info.favoriteFood = '🍝';

console.log(food);`,
		answers: [
			`['🍕', '🍫', '🥑', '🍔']`,
			`['🍝', '🍫', '🥑', '🍔']`,
			`['🍝', '🍕', '🍫', '🥑', '🍔']`,
			`ReferenceError`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-110',
		text: `What does this method do?`,
		codeBlock: `JSON.parse();`,
		answers: [
			`Parses JSON to a JavaScript value`,
			`Parses a JavaScript object to JSON`,
			`Parses any JavaScript value to JSON`,
			`Parses JSON to a JavaScript object only`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-111',
		text: `What's the output?`,
		codeBlock: `let name = 'Lydia';

function getName() {
  console.log(name);
  let name = 'Sarah';
}

getName();`,
		answers: [`ReferenceError`, `Lydia`, `Sarah`, `undefined`],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-112',
		text: `What's the output?`,
		codeBlock: `function* generatorOne() {
  yield ['a', 'b', 'c'];
}

function* generatorTwo() {
  yield* ['a', 'b', 'c'];
}

const one = generatorOne();
const two = generatorTwo();

console.log(one.next().value);
console.log(two.next().value);`,
		answers: [
			`['a', 'b', 'c'] and a`,
			`a and a`,
			`a and undefined`,
			`a and ['a', 'b', 'c']`
		],
		difficulty: 'hard',
		topic: 'es6',
		category: 'jstricky'
	},

	{
		id: 'jstricky-113',
		text: `What's the output?`,
		codeBlock: `console.log(\`\${(x => x)('I love')} to program\`);`,
		answers: [
			`I love to program`,
			`undefined to program`,
			`\${(x => x)('I love') to program`,
			`TypeError`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-114',
		text: `What will happen?`,
		codeBlock: `let config = {
  alert: setInterval(() => {
    console.log('Alert!');
  }, 1000),
};

config = null;`,
		answers: [
			`The setInterval callback will still be called every second`,
			`The setInterval callback won't be invoked`,
			`The setInterval callback gets invoked once`,
			`We never invoked config.alert(), config is null`
		],
		difficulty: 'hard',
		topic: 'event-loop',
		category: 'jstricky'
	},

	{
		id: 'jstricky-115',
		text: `Which method(s) will return the value \`'Hello world!'\`?`,
		codeBlock: `const myMap = new Map();
const myFunc = () => 'greeting';

myMap.set(myFunc, 'Hello world!');

//1
myMap.get('greeting');
//2
myMap.get(myFunc);
//3
myMap.get(() => 'greeting');`,
		answers: [`2`, `1`, `2 and 3`, `All of them`],
		difficulty: 'hard',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-116',
		text: `What's the output?`,
		codeBlock: `const person = {
  name: 'Lydia',
  age: 21,
};

const changeAge = (x = { ...person }) => (x.age += 1);
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1;
  x.name = 'Sarah';
};

changeAge(person);
changeAgeAndName();

console.log(person);`,
		answers: [
			`{name: "Lydia", age: 22}`,
			`{name: "Sarah", age: 22}`,
			`{name: "Sarah", age: 23}`,
			`{name: "Lydia", age: 23}`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-117',
		text: `Which of the following options will return \`6\`?`,
		codeBlock: `function sumValues(x, y, z) {
  return x + y + z;
}`,
		answers: [
			`sumValues(...[1, 2, 3])`,
			`sumValues([...1, 2, 3])`,
			`sumValues([...[1, 2, 3]])`,
			`sumValues([1, 2, 3])`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-118',
		text: `What's the output?`,
		codeBlock: `let num = 1;
const list = ['🥳', '🤠', '🥰', '🤪'];

console.log(list[(num += 1)]);`,
		answers: [`🥰`, `🤠`, `SyntaxError`, `ReferenceError`],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-119',
		text: `What's the output?`,
		codeBlock: `const person = {
  firstName: 'Lydia',
  lastName: 'Hallie',
  pet: {
    name: 'Mara',
    breed: 'Dutch Tulip Hound',
  },
  getFullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  },
};

console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());`,
		answers: [
			`Mara undefined Lydia Hallie ReferenceError`,
			`undefined undefined undefined undefined`,
			`Mara null Lydia Hallie null`,
			`null ReferenceError null ReferenceError`
		],
		difficulty: 'hard',
		topic: 'this',
		category: 'jstricky'
	},

	{
		id: 'jstricky-120',
		text: `What's the output?`,
		codeBlock: `const groceries = ['banana', 'apple', 'peanuts'];

if (groceries.indexOf('banana')) {
  console.log('We have to buy bananas!');
} else {
  console.log(\`We don't have to buy bananas!\`);
}`,
		answers: [
			`We don't have to buy bananas`,
			`We have to buy bananas!`,
			`undefined`,
			`1`
		],
		difficulty: 'hard',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-121',
		text: `What's the output?`,
		codeBlock: `const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang);
  },
};

console.log(config.language);`,
		answers: [
			`undefined`,
			`function language(lang) { this.languages.push(lang }`,
			`0`,
			`[]`
		],
		difficulty: 'hard',
		topic: 'this',
		category: 'jstricky'
	},

	{
		id: 'jstricky-122',
		text: `What's the output?`,
		codeBlock: `const name = 'Lydia Hallie';

console.log(!typeof name === 'object');
console.log(!typeof name === 'string');`,
		answers: [`false false`, `false true`, `true false`, `true true`],
		difficulty: 'hard',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-123',
		text: `What's the output?`,
		codeBlock: `const add = x => y => z => {
  console.log(x, y, z);
  return x + y + z;
};

add(4)(5)(6);`,
		answers: [`4 5 6`, `6 5 4`, `4 function function`, `undefined undefined 6`],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-124',
		text: `What's the output?`,
		codeBlock: `async function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield Promise.resolve(i);
  }
}

(async () => {
  const gen = range(1, 3);
  for await (const item of gen) {
    console.log(item);
  }
})();`,
		answers: [
			`1 2 3`,
			`Promise {1} Promise {2} Promise {3}`,
			`Promise {<pending>} Promise {<pending>} Promise {<pending>}`,
			`undefined undefined undefined`
		],
		difficulty: 'hard',
		topic: 'promises',
		category: 'jstricky'
	},

	{
		id: 'jstricky-125',
		text: `What's the output?`,
		codeBlock: `const myFunc = ({ x, y, z }) => {
  console.log(x, y, z);
};

myFunc(1, 2, 3);`,
		answers: [
			`undefined undefined undefined`,
			`1 2 3`,
			`{1: 1} {2: 2} {3: 3}`,
			`{ 1: undefined } undefined undefined`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-126',
		text: `What's the output?`,
		codeBlock: `function getFine(speed, amount) {
  const formattedSpeed = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'mile-per-hour'
  }).format(speed);

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

  return \`The driver drove \${formattedSpeed} and has to pay \${formattedAmount}\`;
}

console.log(getFine(130, 300))`,
		answers: [
			`The driver drove 130 mph and has to pay \\$300.00`,
			`The driver drove 130 and has to pay 300`,
			`The driver drove undefined and has to pay undefined`,
			`The driver drove 130.00 and has to pay 300.00`
		],
		difficulty: 'hard',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-127',
		text: `What's the output?`,
		codeBlock: `const spookyItems = ['👻', '🎃', '🕸'];
({ item: spookyItems[3] } = { item: '💀' });

console.log(spookyItems);`,
		answers: [
			`["👻", "🎃", "🕸", "💀"]`,
			`["👻", "🎃", "🕸"]`,
			`["👻", "🎃", "🕸", { item: "💀" }]`,
			`["👻", "🎃", "🕸", "[object Object]"]`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-128',
		text: `What's the output?`,
		codeBlock: `const name = 'Lydia Hallie';
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));

console.log(isNaN(name));
console.log(isNaN(age));`,
		answers: [
			`false false true false`,
			`true false true false`,
			`true false false false`,
			`false true false true`
		],
		difficulty: 'hard',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-129',
		text: `What's the output?`,
		codeBlock: `const randomValue = 21;

function getInfo() {
  console.log(typeof randomValue);
  const randomValue = 'Lydia Hallie';
}

getInfo();`,
		answers: [`ReferenceError`, `"number"`, `"string"`, `undefined`],
		difficulty: 'hard',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-130',
		text: `What's the output?`,
		codeBlock: `const myPromise = Promise.resolve('Woah some cool data');

(async () => {
  try {
    console.log(await myPromise);
  } catch {
    throw new Error(\`Oops didn't work\`);
  } finally {
    console.log('Oh finally!');
  }
})();`,
		answers: [
			`Woah some cool data Oh finally!`,
			`Woah some cool data`,
			`Oh finally!`,
			`Oops didn't work Oh finally!`
		],
		difficulty: 'hard',
		topic: 'promises',
		category: 'jstricky'
	},

	{
		id: 'jstricky-131',
		text: `What's the output?`,
		codeBlock: `const emojis = ['🥑', ['✨', '✨', ['🍕', '🍕']]];

console.log(emojis.flat(1));`,
		answers: [
			`['🥑', '✨', '✨', ['🍕', '🍕']]`,
			`['🥑', ['✨', '✨', ['🍕', '🍕']]]`,
			`['🥑', ['✨', '✨', '🍕', '🍕']]`,
			`['🥑', '✨', '✨', '🍕', '🍕']`
		],
		difficulty: 'hard',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-132',
		text: `What's the output?`,
		codeBlock: `class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);`,
		answers: [`3`, `0`, `1`, `2`],
		difficulty: 'hard',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-133',
		text: `What's the output?`,
		codeBlock: `const myPromise = Promise.resolve(Promise.resolve('Promise'));

function funcOne() {
  setTimeout(() => console.log('Timeout 1!'), 0);
  myPromise.then(res => res).then(res => console.log(\`\${res} 1!\`));
  console.log('Last line 1!');
}

async function funcTwo() {
  const res = await myPromise;
  console.log(\`\${res} 2!\`)
  setTimeout(() => console.log('Timeout 2!'), 0);
  console.log('Last line 2!');
}

funcOne();
funcTwo();`,
		answers: [
			`Last line 1! Promise 2! Last line 2! Promise 1! Timeout 1! Timeout 2!`,
			`Promise 1! Last line 1! Promise 2! Last line 2! Timeout 1! Timeout 2!`,
			`Last line 1! Timeout 1! Promise 1! Last line 2! Promise2! Timeout 2!`,
			`Timeout 1! Promise 1! Last line 1! Promise 2! Timeout 2! Last line 2!`
		],
		difficulty: 'hard',
		topic: 'event-loop',
		category: 'jstricky'
	},

	{
		id: 'jstricky-134',
		text: `How can we invoke \`sum\` in \`sum.js\` from \`index.js?\``,
		codeBlock: `// sum.js
export default function sum(x) {
  return x + x;
}

// index.js
import * as sum from './sum';`,
		answers: [
			`sum.default(4)`,
			`sum(4)`,
			`sum.sum(4)`,
			`Default aren't imported with *, only named exports`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-135',
		text: `What's the output?`,
		codeBlock: `const handler = {
  set: () => console.log('Added a new property!'),
  get: () => console.log('Accessed a property!'),
};

const person = new Proxy({}, handler);

person.name = 'Lydia';
person.name;`,
		answers: [
			`Added a new property! Accessed a property!`,
			`Added a new property!`,
			`Accessed a property!`,
			`Nothing gets logged`
		],
		difficulty: 'hard',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-136',
		text: `Which of the following will modify the \`person\` object?`,
		codeBlock: `const person = { name: 'Lydia Hallie' };

Object.seal(person);`,
		answers: [
			`person.name = "Evan Bacon"`,
			`person.age = 21`,
			`delete person.name`,
			`Object.assign(person, { age: 21 })`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-137',
		text: `Which of the following will modify the \`person\` object?`,
		codeBlock: `const person = {
  name: 'Lydia Hallie',
  address: {
    street: '100 Main St',
  },
};

Object.freeze(person);`,
		answers: [
			`person.address.street = "101 Main St"`,
			`person.name = "Evan Bacon"`,
			`delete person.address`,
			`person.pet = { name: "Mara" }`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-138',
		text: `What's the output?`,
		codeBlock: `const add = x => x + x;

function myFunc(num = 2, value = add(num)) {
  console.log(num, value);
}

myFunc();
myFunc(3);`,
		answers: [
			`2 4 and 3 6`,
			`2 NaN and 3 NaN`,
			`2 Error and 3 6`,
			`2 4 and 3 Error`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-139',
		text: `What's the output?`,
		codeBlock: `class Counter {
  #number = 10

  increment() {
    this.#number++
  }

  getNum() {
    return this.#number
  }
}

const counter = new Counter()
counter.increment()

console.log(counter.#number)`,
		answers: [`SyntaxError`, `10`, `11`, `undefined`],
		difficulty: 'hard',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-140',
		text: `What's missing?`,
		codeBlock: `const teams = [
  { name: 'Team 1', members: ['Paul', 'Lisa'] },
  { name: 'Team 2', members: ['Laura', 'Tim'] },
];

function* getMembers(members) {
  for (let i = 0; i < members.length; i++) {
    yield members[i];
  }
}

function* getTeams(teams) {
  for (let i = 0; i < teams.length; i++) {
    // ✨ SOMETHING IS MISSING HERE ✨
  }
}

const obj = getTeams(teams);
obj.next(); // { value: "Paul", done: false }
obj.next(); // { value: "Lisa", done: false }`,
		answers: [
			`yield* getMembers(teams[i].members)`,
			`yield getMembers(teams[i].members)`,
			`return getMembers(teams[i].members)`,
			`return yield getMembers(teams[i].members)`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-141',
		text: `What's the output?`,
		codeBlock: `const person = {
  name: 'Lydia Hallie',
  hobbies: ['coding'],
};

function addHobby(hobby, hobbies = person.hobbies) {
  hobbies.push(hobby);
  return hobbies;
}

addHobby('running', []);
addHobby('dancing');
addHobby('baking', person.hobbies);

console.log(person.hobbies);`,
		answers: [
			`["coding", "dancing", "baking"]`,
			`["coding"]`,
			`["coding", "dancing"]`,
			`["coding", "running", "dancing", "baking"]`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-142',
		text: `What's the output?`,
		codeBlock: `class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();`,
		answers: [
			`I'm pink. 🌸 I'm a bird. 🦢`,
			`I'm pink. 🌸`,
			`I'm a bird. 🦢 I'm pink. 🌸`,
			`Nothing, we didn't call any method`
		],
		difficulty: 'hard',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-143',
		text: `Which of the options result(s) in an error?`,
		codeBlock: `const emojis = ['🎄', '🎅🏼', '🎁', '⭐'];

/* 1 */ emojis.push('🦌');
/* 2 */ emojis.splice(0, 2);
/* 3 */ emojis = [...emojis, '🥂'];
/* 4 */ emojis.length = 0;`,
		answers: [`3`, `1`, `1 and 2`, `3 and 4`],
		difficulty: 'hard',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-144',
		text: `What do we need to add to the \`person\` object to get \`["Lydia Hallie", 21]\` as the output of \`[...person]\`?`,
		codeBlock: `const person = {
  name: "Lydia Hallie",
  age: 21
}

[...person] // ["Lydia Hallie", 21]`,
		answers: [
			`*[Symbol.iterator]() { yield* Object.values(this) }`,
			`Nothing, object are iterable by default`,
			`*[Symbol.iterator]() { for (let x in this) yield* this[x] }`,
			`*[Symbol.iterator]() { for (let x in this) yield this }`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-145',
		text: `What's the output?`,
		codeBlock: `let count = 0;
const nums = [0, 1, 2, 3];

nums.forEach(num => {
	if (num) count += 1
})

console.log(count)`,
		answers: [`3`, `1`, `2`, `4`],
		difficulty: 'hard',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-146',
		text: `What's the output?`,
		codeBlock: `function getFruit(fruits) {
	console.log(fruits?.[1]?.[1])
}

getFruit([['🍊', '🍌'], ['🍍']])
getFruit()
getFruit([['🍍'], ['🍊', '🍌']])`,
		answers: [
			`undefined, undefined, 🍌`,
			`null, undefined, 🍌`,
			`[], null, 🍌`,
			`[], [], 🍌`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-147',
		text: `What's the output?`,
		codeBlock: `class Calc {
	constructor() {
		this.count = 0 
	}

	increase() {
		this.count++
	}
}

const calc = new Calc()
new Calc().increase()

console.log(calc.count)`,
		answers: [`0`, `1`, `undefined`, `ReferenceError`],
		difficulty: 'hard',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-148',
		text: `What's the output?`,
		codeBlock: `const user = {
	email: "e@mail.com",
	password: "12345"
}

const updateUser = ({ email, password }) => {
	if (email) {
		Object.assign(user, { email })
	}

	if (password) {
		user.password = password
	}

	return user
}

const updatedUser = updateUser({ email: "new@email.com" })

console.log(updatedUser === user)`,
		answers: [`true`, `false`, `TypeError`, `ReferenceError`],
		difficulty: 'hard',
		topic: 'types',
		category: 'jstricky'
	},

	{
		id: 'jstricky-149',
		text: `What's the output?`,
		codeBlock: `const fruit = ['🍌', '🍊', '🍎']

fruit.slice(0, 1)
fruit.splice(0, 1)
fruit.unshift('🍇')

console.log(fruit)`,
		answers: [
			`['🍇', '🍊', '🍎']`,
			`['🍌', '🍊', '🍎']`,
			`['🍊', '🍎']`,
			`['🍇', '🍌', '🍊', '🍎']`
		],
		difficulty: 'hard',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-150',
		text: `What's the output?`,
		codeBlock: `const animals = {};
let dog = { emoji: '🐶' }
let cat = { emoji: '🐈' }

animals[dog] = { ...dog, name: "Mara" }
animals[cat] = { ...cat, name: "Sara" }

console.log(animals[dog])`,
		answers: [
			`{ emoji: "🐈", name: "Sara" }`,
			`{ emoji: "🐶", name: "Mara" }`,
			`undefined`,
			`ReferenceError`
		],
		difficulty: 'hard',
		topic: 'scope',
		category: 'jstricky'
	},

	{
		id: 'jstricky-151',
		text: `What's the output?`,
		codeBlock: `const user = {
	email: "my@email.com",
	updateEmail: email => {
		this.email = email
	}
}

user.updateEmail("new@email.com")
console.log(user.email)`,
		answers: [`my@email.com`, `new@email.com`, `undefined`, `ReferenceError`],
		difficulty: 'hard',
		topic: 'this',
		category: 'jstricky'
	},

	{
		id: 'jstricky-152',
		text: `What's the output?`,
		codeBlock: `const promise1 = Promise.resolve('First')
const promise2 = Promise.resolve('Second')
const promise3 = Promise.reject('Third')
const promise4 = Promise.resolve('Fourth')

const runPromises = async () => {
	const res1 = await Promise.all([promise1, promise2])
	const res2  = await Promise.all([promise3, promise4])
	return [res1, res2]
}

runPromises()
	.then(res => console.log(res))
	.catch(err => console.log(err))`,
		answers: [
			`'Third'`,
			`[['First', 'Second'], ['Fourth']]`,
			`[['First', 'Second'], ['Third', 'Fourth']]`,
			`[['First', 'Second']]`
		],
		difficulty: 'hard',
		topic: 'promises',
		category: 'jstricky'
	},

	{
		id: 'jstricky-153',
		text: `What should the value of \`method\` be to log \`{ name: "Lydia", age: 22 }\`?`,
		codeBlock: `const keys = ["name", "age"]
const values = ["Lydia", 22]

const method = /* ?? */
Object[method](keys.map((_, i) => {
	return [keys[i], values[i]]
})) // { name: "Lydia", age: 22 }`,
		answers: [`fromEntries`, `entries`, `values`, `forEach`],
		difficulty: 'hard',
		topic: 'arrays',
		category: 'jstricky'
	},

	{
		id: 'jstricky-154',
		text: `What's the output?`,
		codeBlock: `const createMember = ({ email, address = {}}) => {
	const validEmail = /.+\\@.+\\..+/.test(email)
	if (!validEmail) throw new Error("Valid email pls")

	return {
		email,
		address: address ? address : null
	}
}

const member = createMember({ email: "my@email.com" })
console.log(member)`,
		answers: [
			`{ email: "my@email.com", address: {} }`,
			`{ email: "my@email.com", address: null }`,
			`{ email: "my@email.com" }`,
			`{ email: "my@email.com", address: undefined }`
		],
		difficulty: 'hard',
		topic: 'prototype',
		category: 'jstricky'
	},

	{
		id: 'jstricky-155',
		text: `What's the output?`,
		codeBlock: `let randomValue = { name: "Lydia" }
randomValue = 23

if (!typeof randomValue === "string") {
	console.log("It's not a string!")
} else {
	console.log("Yay it's a string!")
}`,
		answers: [
			`Yay it's a string!`,
			`It's not a string!`,
			`TypeError`,
			`undefined`
		],
		difficulty: 'hard',
		topic: 'types',
		category: 'jstricky'
	}
]

export default jstrickyQuestions
