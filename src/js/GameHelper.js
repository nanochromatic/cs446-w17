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

export const SECONDARY = {
  MOON: 'moon',
  STAR: 'star',
  CLOVER: 'clover',
  HEART: 'heart',
  CIRCLE: 'circle',
  SQUARE: 'square',
  JUMP: 'jump',
  REVERSE: 'reverse',
  CHANGE_COLOR: 'changeColor',
  ADDITIONAL_TURN: 'additionalTurn',
  SINGLE_ATTACK: 'singleAttack',
  DOUBLE_ATTACK: 'doubleAttack',
  SPECIAL1: 'special1',
  SPECIAL2: 'special2',
  SPECIAL3: 'special3',
  SPECIAL4: 'special4'
}

export const COLOR = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
  YELLOW: 'yellow'
}

export const LOCATION = {
  DRAW_STACK: 'drawStack',
  PLAYED_STACK: 'playedStack',
  PLAYER1: 'player1',
  PLAYER2: 'player2',
  PLAYER3: 'player3',
  PLAYER4: 'player4'
}

export const SHAPES = [
  SECONDARY.MOON,
  SECONDARY.STAR,
  SECONDARY.CLOVER,
  SECONDARY.HEART,
  SECONDARY.CIRCLE,
  SECONDARY.SQUARE
]

export const masterDrawStack = [
  // red
  {
    color: COLOR.RED,
    secondary: SECONDARY.MOON,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.STAR,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.CLOVER,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.HEART,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.CIRCLE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.SQUARE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.JUMP,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.REVERSE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.CHANGE_COLOR,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.ADDITIONAL_TURN,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.SINGLE_ATTACK,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.DOUBLE_ATTACK,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.RED,
    secondary: SECONDARY.SPECIAL1,
    location: LOCATION.DRAW_STACK
  },

  // green
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.MOON,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.STAR,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.CLOVER,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.HEART,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.CIRCLE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.SQUARE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.JUMP,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.REVERSE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.CHANGE_COLOR,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.ADDITIONAL_TURN,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.SINGLE_ATTACK,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.DOUBLE_ATTACK,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.GREEN,
    secondary: SECONDARY.SPECIAL2,
    location: LOCATION.DRAW_STACK
  },

  // blue
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.MOON,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.STAR,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.CLOVER,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.HEART,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.CIRCLE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.SQUARE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.JUMP,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.REVERSE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.CHANGE_COLOR,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.ADDITIONAL_TURN,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.SINGLE_ATTACK,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.DOUBLE_ATTACK,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.BLUE,
    secondary: SECONDARY.SPECIAL3,
    location: LOCATION.DRAW_STACK
  },

  // yellow
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.MOON,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.STAR,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.CLOVER,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.HEART,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.CIRCLE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.SQUARE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.JUMP,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.REVERSE,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.CHANGE_COLOR,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.ADDITIONAL_TURN,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.SINGLE_ATTACK,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.DOUBLE_ATTACK,
    location: LOCATION.DRAW_STACK
  },
  {
    color: COLOR.YELLOW,
    secondary: SECONDARY.SPECIAL4,
    location: LOCATION.DRAW_STACK
  }
]
