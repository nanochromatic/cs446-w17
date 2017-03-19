import { LOCATION } from '../js/GameHelper'

export default {
  drawStackDeck: state => state.game.deck.filter(card => card.location === LOCATION.DRAW_STACK),
  playedStackDeck: state => state.game.deck.filter(card => card.location === LOCATION.PLAYED_STACK),
  playerOneHand: state => state.game.deck.filter(card => card.location === LOCATION.PLAYER1),
  playerTwoHand: state => state.game.deck.filter(card => card.location === LOCATION.PLAYER2),
  playerThreeHand: state => state.game.deck.filter(card => card.location === LOCATION.PLAYER3),
  playerFourHand: state => state.game.deck.filter(card => card.location === LOCATION.PLAYER4),

  gameStatus: state => state.game.gameState,
  players: state => state.game.players,
  currentPlayer: state => state.game.players[0],
  lastCardPlayed: state => state.game.lastCardPlayed,
  attackStatus: state => state.game.specialAttackStack,
  lastColor: state => state.game.lastCardPlayed ? state.game.lastCardPlayed.color : ''
}
