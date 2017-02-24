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
        lastCardPlayed: null,
        direction: 'cw',
        specialAttackStack: 0,
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

  playCardAction: function ({commit}, card, player) {
    commit('playCard', card, player)
  },

  drawCardAction: function ({commit}, player) {
    commit('drawCard', player)
  },

  switchDirectionAction: function ({commit}) {
    commit('switchDirection')
  }
}
