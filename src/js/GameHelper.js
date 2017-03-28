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

/**
 * Generates a random integer between two integers.
 * http://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 */
export const randomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getPlayerId = function () {
  var newId = Date.now()

  if (window.device) {
    console.log(window.device.uuid)
    return window.device.uuid
  } else if (localStorage.getItem('playerId')) {
    return localStorage.getItem('playerId')
  } else {
    localStorage.setItem('playerId', newId)
    return Date.now().toString()
  }
}

export const getPlayerTheme = function () {
  var newTheme = ''

  if (localStorage.getItem('playerTheme')) {
    return localStorage.getItem('playerTheme')
  } else {
    localStorage.setItem('playerTheme', newTheme)
    return newTheme
  }
}
