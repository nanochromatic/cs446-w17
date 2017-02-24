/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
export const shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const masterDrawStack = [
  // red
  {
    color: 'red',
    secondary: 'moon',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'star',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'clover',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'heart',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'circle',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'square',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'jump',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'reverse',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'changeColor',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'additionalTurn',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'singleAttack',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'doubleAttack',
    location: 'drawStack'
  },
  {
    color: 'red',
    secondary: 'special1',
    location: 'drawStack'
  },

  // green
  {
    color: 'green',
    secondary: 'moon',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'star',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'clover',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'heart',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'circle',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'square',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'jump',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'reverse',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'changeColor',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'additionalTurn',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'singleAttack',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'doubleAttack',
    location: 'drawStack'
  },
  {
    color: 'green',
    secondary: 'special2',
    location: 'drawStack'
  },

  // blue
  {
    color: 'blue',
    secondary: 'moon',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'star',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'clover',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'heart',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'circle',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'square',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'jump',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'reverse',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'changeColor',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'additionalTurn',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'singleAttack',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'doubleAttack',
    location: 'drawStack'
  },
  {
    color: 'blue',
    secondary: 'special3',
    location: 'drawStack'
  },

  // yellow
  {
    color: 'yellow',
    secondary: 'moon',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'star',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'clover',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'heart',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'circle',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'square',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'jump',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'reverse',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'changeColor',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'additionalTurn',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'singleAttack',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'doubleAttack',
    location: 'drawStack'
  },
  {
    color: 'yellow',
    secondary: 'special4',
    location: 'drawStack'
  }
]
