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

  draw (state, player) {
    var drawnCard = state.deck.shift()
    state.userHand.unshift(drawnCard)
  }
}
