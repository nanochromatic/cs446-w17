import { shuffleArray, masterDrawStack, PLAYER_LOCATION } from '../js/GameHelper'

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
            id: PLAYER_LOCATION[0],
            type: 'human',
            timeRemaining: 10
          }
        ],
        lastCardPlayed: null,
        specialAttackStack: 0,
        statusMessage: '',
        cpuBoardAction: ''
      }
    })
  },

  startGame: function ({commit, state}) {
    for (var i = state.game.players.length; i < 4; i++) {
      commit('addPlayer', {
        id: PLAYER_LOCATION[i],
        type: 'cpu',
        timeRemaining: 0
      })
    }

    commit('shufflePlayers')

    commit('dealCards')

    commit('gameStateMessage', 'inProgress')

    // Flip the top card off the DRAW_STACK, and move it to the PLAYED_STACK
    commit('changeColour', state.game.deck[28].color)
    commit('playCard', state.game.deck[28])
  },

  playCardAction: function ({commit}, [card, player]) {
    commit('playCard', card)
  },

  drawCardAction: function ({commit}, player) {
    commit('drawCard', player)
  },

  switchDirectionAction: function ({commit}) {
    commit('switchDirection')
  },

  attackStackAction: function ({commit}, card) {
    commit('attackStack', card)
  },

  changeColourAction: function ({commit}, colour) {
    commit('changeColour', colour)
  }
}
