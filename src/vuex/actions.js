import { shuffleArray, masterDrawStack, LOCATION, SECONDARY, PLAYER_LOCATION } from '../js/GameHelper'

export default {
  resetGame: function ({commit}) {
    var gameObject = {
      gameState: 'waiting',
      deck: shuffleArray(JSON.parse(JSON.stringify(masterDrawStack))),
      players: [],
      lastCardPlayed: null,
      specialAttackStack: 0,
      statusMessage: ''
    }
    commit('reset', gameObject)
  },

  setPlayer: function ({commit}, {index, name, type, role = false}) {
    commit('setPlayer', {
      index,
      player: {
        name: name,
        location: PLAYER_LOCATION[index],
        type: type,
        role: role,
        skipTurn: false
      }
    })
  },

  startGame: function ({commit, state}) {
    commit('dealCards')

    commit('gameStateMessage', 'inProgress')

    // Flip the top card off the DRAW_STACK, and move it to the PLAYED_STACK
    commit('changeColor', state.game.deck[28].color)
    commit('playCard', state.game.deck[28])
  },

  playCardAction: function ({commit}, [card, playerNumber]) {
    commit('playCard', card)
  },

  drawCardAction: function ({commit, state}, playerNumber) {
    var drawStackCount = state.game.deck.filter(card => card.location === LOCATION.DRAW_STACK).length

    // If there are attacks stacked, then drawing means that the player has lost the attack
    if (state.game.specialAttackStack) {
      // draw cards equal to the value of the stack and then reset the stack value
      for (var i = 0; i < state.game.specialAttackStack; i++) {
        commit('drawCard', playerNumber)
        if (drawStackCount - i === 1) {
          commit('repopulateDrawStack')
        }
      }
      state.game.specialAttackStack = 0
    } else {
      commit('drawCard', playerNumber)
      if (drawStackCount === 1) {
        commit('repopulateDrawStack')
      }
    }
  },

  jumpAction: function ({commit}) {
    commit('skipTurn')
  },

  switchDirectionAction: function ({commit}) {
    commit('switchDirection')
  },

  additionalTurnAction: function ({commit}) {
    commit('additionalTurn')
  },

  attackStackAction: function ({commit}, card) {
    commit('attackStack', (card.secondary === SECONDARY.SINGLE_ATTACK ? 1 : 2))
  },

  changeColorAction: function ({commit}, color) {
    commit('changeColor', color)
  },

  endTurnAction: function ({commit}) {
    commit('endTurn')
  }
}
