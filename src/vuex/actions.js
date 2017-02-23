import { shuffleArray, masterDrawStack } from '../js/GameHelper'

export default {
  resetGame: function ({commit}) {
    commit('reset', {
      player: {
        name: 'Player 1'
      },
      game: {
        id: 1,
        gameState: 'waiting',
        deck: shuffleArray(masterDrawStack),
        players: [
          {
            id: 10,
            type: 'human',
            timeRemaining: 10
          }
        ],
        playOrder: [],
        statusMessage: ''
      }
    })
  },
  drawCard: function ({commit}, player) {
    commit('draw', player)
  }
}
