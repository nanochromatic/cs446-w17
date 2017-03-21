import { LOCATION } from '../js/DeckHelper'

export default {

  gameObject (state, object) {
    state.game = object
  },

  setPlayerName (state, name) {
    state.player.name = name
    localStorage.setItem('playerName', name)
  },

  /*
   * The device for which this is true will be responsible for
   * managing all CPU players and the game state
   */
  setGameController (state, val) {
    state.isGameController = val
  },

  /*
   * Set the game state to the following defined base state
   * reset() must be called before any new game is initiated
   */
  reset (state, resetGameState) {
    state.game = Object.assign({}, resetGameState)
  },

  /*
   * Add a player to the game state after reset() has been called
   */
  setPlayer (state, {index, player}) {
    state.game.players.splice(index, 1, player)
  },

  /*
   * Deal 7 cards to each player
   */
  dealCards (state) {
    for (var i = 0; i < 7; i++) {
      state.game.deck[i * 4].location = LOCATION.PLAYER1
      state.game.deck[i * 4 + 1].location = LOCATION.PLAYER2
      state.game.deck[i * 4 + 2].location = LOCATION.PLAYER3
      state.game.deck[i * 4 + 3].location = LOCATION.PLAYER4
    }
  },

  /*
   * End a player's turn
   */
  endTurn (state) {
    var player = state.game.players.shift()
    state.game.players.push(player)

    // check for additional turn, and removes the artifact
    var lastElement = state.game.players[state.game.players.length - 1]
    if (lastElement.location === state.game.players[0].location) {
      state.game.players.pop()
    }
    // check for skip turn, and skips the next player's turn
    if (state.game.players[0].skipTurn) {
      player = state.game.players.shift()
      player.skipTurn = false
      state.game.players.push(player)
    }
  },

  playCard (state, card) {
    var oldLocation = card.location
    var cardInDeck = state.game.deck.find(deckCard => deckCard.color === card.color && deckCard.secondary === card.secondary)
    cardInDeck.location = LOCATION.PLAYED_STACK
    state.game.lastCardPlayed = Object.assign({}, card)
    // TODO: Win condition should be elsewhere
    if (state.game.deck.filter(card => card.location === oldLocation).length === 0) {
      state.game.gameState = 'Game Over: ' + oldLocation + ' wins!'
    }
  },

  drawCard (state, toLocation) {
    var drawnCard = state.game.deck.find(deckCard => deckCard.location === LOCATION.DRAW_STACK)
    drawnCard.location = toLocation
    state.game.specialAttackStack = 0
    console.log(toLocation + ' drew card ' + drawnCard.color + '-' + drawnCard.secondary)
  },

  switchDirection (state) {
    /*
     * grab the current player, reverse the array, and add the current player back on the front
     * the current player will be moved to the back of the player array by a later call to endTurn
     */
    var currentPlayer = state.game.players.shift()
    state.game.players.reverse()
    state.game.players.unshift(currentPlayer)
  },

  additionalTurn (state) {
    var currentPlayerCopy = Object.assign({}, state.game.players[0])
    state.game.players.splice(1, 0, currentPlayerCopy)
  },

  skipTurn (state) {
    state.game.players[1].skipTurn = true
  },

  attackStack (state, value) {
    // We chose 10 as the max attack stacking value
    state.game.specialAttackStack = Math.min(state.game.specialAttackStack + value, 10)
  },

  changeColor (state, color) {
    state.game.lastCardPlayed.color = color
  },

  gameStateMessage (state, message) {
    state.game.gameState = message
  },

  repopulateDrawStack (state) {
    state.game.deck.forEach(card => {
      if (card.location === LOCATION.PLAYED_STACK) {
        card.location = LOCATION.DRAW_STACK
      }
    })
  }
}
