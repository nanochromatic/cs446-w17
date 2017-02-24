export default {
  drawStackDeck: state => state.game.deck.filter(card => card.location === 'drawStack'),
  playedStackDeck: state => state.game.deck.filter(card => card.location === 'playedStack'),
  playerOneHand: state => state.game.deck.filter(card => card.location === 'playerOneHand'),
  playerTwoHand: state => state.game.deck.filter(card => card.location === 'playerTwoHand'),
  playerThreeHand: state => state.game.deck.filter(card => card.location === 'playerThreeHand'),
  playerFourHand: state => state.game.deck.filter(card => card.location === 'playerFourHand')
}
