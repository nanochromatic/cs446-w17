import { LOCATION, SECONDARY, shuffleArray } from '../js/GameHelper'

export default {

  /*
   * Set the game state to the following defined base state
   * reset() must be called before any new game is initiated
   */
  reset (state, resetState) {
    state.player.name = resetState.player.name
    state.game.id = resetState.game.id
    state.game.state = resetState.game.state
    state.game.deck = resetState.game.deck
    state.game.players = resetState.game.players
    state.game.lastCardPlayed = resetState.game.lastCardPlayed
    state.game.specialAttackStack = resetState.game.specialAttackStack
    state.game.statusMessage = resetState.game.statusMessage
    state.game.cpuBoardAction = resetState.game.cpuBoardAction
  },

  /*
   * Add a player to the game state after reset() has been called
   */
  addPlayer (state, player) {
    state.game.players.push(player)
  },

  /*
   * Shuffle the players to determine the playing order
   */
  shufflePlayers (state) {
    shuffleArray(state.game.players)
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
  switchPlayer (state) {
    var player = state.game.players.shift()
    state.game.players.push(player)
  },

  playCard (state, card) {
    state.game.deck.find(deckCard => deckCard.color === card.color && deckCard.secondary === card.secondary).location = LOCATION.PLAYED_STACK
    state.game.lastCardPlayed = card
  },

  drawCard (state, player) {
    // If there are attacks stacked, then drawing means that thie player has lost the attack
    if (state.game.specialAttackStack) {
      // draw cards equal to the value of the stack and then reset the stack value
      for (var i = 0; i < state.game.specialAttackStack - 1; i++) {
        state.game.deck.find(deckCard => deckCard.location === LOCATION.DRAW_STACK).location = player.id
      }
      state.game.specialAttackStack = 0
    }

    state.game.deck.find(deckCard => deckCard.location === LOCATION.DRAW_STACK).location = player.id
  },

  switchDirection (state) {
    state.game.players.reverse()
  },

  attackStack (state, card) {
    state.game.specialAttackStack += (card.secondary === SECONDARY.SINGLE_ATTACK) ? 1 : 2

    // We chose 10 as the max attack stacking value
    if (state.game.specialAttackStack > 10) {
      state.game.specialAttackStack = 10
    }
  },

  changeColour (state, colour) {
    state.game.currentColour = colour
  },

  gameStateMessage (state, message) {
    state.game.gameState = message
  },

  changeCpuBoardAction (state, player) {
    state.game.cpuBoardAction = player.id
  }
}
