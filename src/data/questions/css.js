export default [
  // SELECTORS - 6 questions
  {
    id: 'css-001',
    text: 'Which CSS selector has the highest specificity?',
    answers: [
      'Inline styles',
      'ID selectors',
      'Class selectors',
      'Element selectors'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'selectors'
  },
  {
    id: 'css-002',
    text: 'What does the CSS selector "div > p" select?',
    answers: [
      'All p elements that are direct children of a div',
      'All p elements inside a div at any level',
      'All div elements followed by p elements',
      'All div and p elements on the page'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'selectors'
  },
  {
    id: 'css-003',
    text: 'Which pseudo-class selector targets an element when a user hovers over it?',
    answers: [
      ':hover',
      ':active',
      ':focus',
      ':visited'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'selectors'
  },
  {
    id: 'css-004',
    text: 'What does the CSS selector "p + span" select?',
    answers: [
      'The first span element immediately after a p element',
      'All span elements inside a p element',
      'All span elements that are siblings of a p element',
      'All span elements that come after any p element'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'selectors'
  },
  {
    id: 'css-005',
    text: 'Which selector would select all elements with a "data-type" attribute?',
    answers: [
      '[data-type]',
      '.data-type',
      '#data-type',
      '*data-type'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'selectors'
  },
  {
    id: 'css-006',
    text: 'What is the specificity order from lowest to highest?',
    answers: [
      'Element, Class, ID, Inline',
      'Inline, ID, Class, Element',
      'Class, Element, ID, Inline',
      'ID, Inline, Class, Element'
    ],
    difficulty: 'hard',
    category: 'css',
    topic: 'selectors'
  },

  // FLEXBOX - 6 questions
  {
    id: 'css-007',
    text: 'Which CSS property is used to create a flex container?',
    answers: [
      'display: flex',
      'flex: container',
      'flex-type: flex',
      'container: flex'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'flexbox'
  },
  {
    id: 'css-008',
    text: 'What does "justify-content: space-between" do in a flex container?',
    answers: [
      'Distributes items evenly with the first item at the start and last item at the end',
      'Centers all items in the container',
      'Adds equal space around each item',
      'Aligns items to the start of the container'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'flexbox'
  },
  {
    id: 'css-009',
    text: 'Which property controls the direction of flex items in a flex container?',
    answers: [
      'flex-direction',
      'flex-flow',
      'flex-order',
      'flex-align'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'flexbox'
  },
  {
    id: 'css-010',
    text: 'What does "align-items: center" do in a flex container with default flex-direction?',
    answers: [
      'Centers items vertically along the cross axis',
      'Centers items horizontally along the main axis',
      'Centers the entire flex container on the page',
      'Centers text within each flex item'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'flexbox'
  },
  {
    id: 'css-011',
    text: 'What is the shorthand property "flex: 1 0 auto" equivalent to?',
    answers: [
      'flex-grow: 1; flex-shrink: 0; flex-basis: auto',
      'flex-grow: 1; flex-basis: 0; flex-shrink: auto',
      'flex-shrink: 1; flex-grow: 0; flex-basis: auto',
      'flex-basis: 1; flex-grow: 0; flex-shrink: auto'
    ],
    difficulty: 'hard',
    category: 'css',
    topic: 'flexbox'
  },
  {
    id: 'css-012',
    text: 'Which property allows a flex item to override the align-items value of its container?',
    answers: [
      'align-self',
      'self-align',
      'item-align',
      'flex-align'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'flexbox'
  },

  // GRID - 6 questions
  {
    id: 'css-013',
    text: 'Which property creates a grid container?',
    answers: [
      'display: grid',
      'grid: container',
      'display: grid-container',
      'grid-type: grid'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'grid'
  },
  {
    id: 'css-014',
    text: 'What does "grid-template-columns: 1fr 2fr" create?',
    answers: [
      'Two columns where the second is twice the width of the first',
      'Three columns with fractional widths',
      'Two columns of equal width',
      'A single column that spans two rows'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'grid'
  },
  {
    id: 'css-015',
    text: 'Which property is used to define gaps between grid items?',
    answers: [
      'gap',
      'grid-spacing',
      'grid-margin',
      'grid-gap-size'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'grid'
  },
  {
    id: 'css-016',
    text: 'What does "grid-column: 1 / 3" mean?',
    answers: [
      'The item spans from column line 1 to column line 3',
      'The item is placed in columns 1 through 3',
      'The item takes up 1/3 of the grid width',
      'The item is divided into 3 columns starting at column 1'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'grid'
  },
  {
    id: 'css-017',
    text: 'What does the "repeat(3, 1fr)" function do in grid-template-columns?',
    answers: [
      'Creates three equal-width columns',
      'Repeats the grid layout 3 times',
      'Creates one column that is 3 fractions wide',
      'Creates 3 rows with 1 fraction each'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'grid'
  },
  {
    id: 'css-018',
    text: 'How do you place a grid item in a specific named area?',
    answers: [
      'grid-area: area-name',
      'grid-place: area-name',
      'grid-position: area-name',
      'grid-location: area-name'
    ],
    difficulty: 'hard',
    category: 'css',
    topic: 'grid'
  },

  // ANIMATIONS - 6 questions
  {
    id: 'css-019',
    text: 'Which property is used to define the name of a CSS animation?',
    answers: [
      'animation-name',
      'animation-title',
      'animation-id',
      'keyframe-name'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'animations'
  },
  {
    id: 'css-020',
    text: 'What does the CSS "transition" property do?',
    answers: [
      'Smoothly animates changes to CSS property values over a specified duration',
      'Moves an element from one position to another',
      'Transforms an element shape and size',
      'Translates text content to different languages'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'animations'
  },
  {
    id: 'css-021',
    text: 'Which at-rule is used to define CSS animations?',
    answers: [
      '@keyframes',
      '@animation',
      '@transition',
      '@animate'
    ],
    difficulty: 'easy',
    category: 'css',
    topic: 'animations'
  },
  {
    id: 'css-022',
    text: 'What does "animation-fill-mode: forwards" do?',
    answers: [
      'Keeps the element styled as the final keyframe state after the animation ends',
      'Plays the animation from the beginning to the end',
      'Makes the animation play in forward direction only',
      'Fills the animation timeline from the start'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'animations'
  },
  {
    id: 'css-023',
    text: 'Which timing function creates a smooth ease-in-out effect?',
    answers: [
      'cubic-bezier(0.42, 0, 0.58, 1)',
      'cubic-bezier(0, 0, 1, 1)',
      'cubic-bezier(1, 0, 0, 1)',
      'cubic-bezier(0.5, 0.5, 0.5, 0.5)'
    ],
    difficulty: 'hard',
    category: 'css',
    topic: 'animations'
  },
  {
    id: 'css-024',
    text: 'What value for animation-iteration-count makes an animation repeat forever?',
    answers: [
      'infinite',
      'forever',
      'loop',
      'continuous'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'animations'
  },

  // Additional questions to ensure robust coverage
  {
    id: 'css-025',
    text: 'What does the ":nth-child(2n)" selector target?',
    answers: [
      'Every even-numbered child element',
      'The second child element only',
      'Every odd-numbered child element',
      'Every second element from the end'
    ],
    difficulty: 'hard',
    category: 'css',
    topic: 'selectors'
  },
  {
    id: 'css-026',
    text: 'In flexbox, what does "flex-wrap: wrap" do?',
    answers: [
      'Allows flex items to wrap onto multiple lines',
      'Wraps text within flex items',
      'Creates a border around the flex container',
      'Wraps the flex container around its items'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'flexbox'
  },
  {
    id: 'css-027',
    text: 'What does "grid-auto-flow: dense" accomplish?',
    answers: [
      'Fills in holes in the grid with smaller items that fit',
      'Creates a denser grid with smaller gaps',
      'Compresses grid items to their minimum size',
      'Makes grid tracks narrower than default'
    ],
    difficulty: 'hard',
    category: 'css',
    topic: 'grid'
  },
  {
    id: 'css-028',
    text: 'What is the difference between "transform" and "transition"?',
    answers: [
      'Transform changes appearance instantly, transition animates changes over time',
      'Transition changes appearance, transform adds animation',
      'They are the same property with different syntax',
      'Transform is for 3D effects, transition is for 2D effects'
    ],
    difficulty: 'medium',
    category: 'css',
    topic: 'animations'
  }
]
