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

  startGame: function ({commit, state}) {
    for (var i = state.game.players.length; i < 4; i++) {
      commit('addPlayer', {
        id: 1,
        type: 'cpu',
        timeRemaining: 0
      })
    }

    commit('start')
  },

  drawCard: function ({commit}, player) {
    commit('draw', player)
  }
}
