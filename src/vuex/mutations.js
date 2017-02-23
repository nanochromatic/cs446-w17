export default {
  draw (state, player) {
    var drawnCard = state.deck.shift()
    state.userHand.unshift(drawnCard)
  }
}
