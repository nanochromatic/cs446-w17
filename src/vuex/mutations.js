export default {
  reset (state, resetState) {
    state.player.name = resetState.player.name
    state.game.id = resetState.game.id
    state.game.state = resetState.game.state
    state.game.deck = resetState.game.deck
    state.game.players = resetState.game.players
    state.game.playOrder = resetState.game.playOrder
    state.game.statusMessage = resetState.game.statusMessage
  },

  addPlayer (state, player) {
    state.game.players.push(player)
  },

  start (state) {
    state.game.gameState = 'inProgress'

    for (var i = 0; i < 7; i++) {
      state.game.deck[i * 4].location = 'playerOneHand'
      state.game.deck[i * 4 + 1].location = 'playerTwoHand'
      state.game.deck[i * 4 + 2].location = 'playerThreeHand'
      state.game.deck[i * 4 + 3].location = 'playerFourHand'
    }
    state.game.deck[28].location = 'playedStack'
  },

  draw (state, player) {
    // var drawnCard = state.deck.shift()
    // state.userHand.unshift(drawnCard)
  }
}
