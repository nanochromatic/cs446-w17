import { shuffleArray, masterDrawStack, LOCATION, SECONDARY, PLAYER_LOCATION } from '../js/GameHelper'
import { fdbGameInit, fdbCommit, fdbSync } from '../vuex/firebase'

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
    fdbGameInit('g2')
    fdbCommit('reset', gameObject)
  },

  setPlayer: function ({commit}, {index, name, type, role = false}) {
    var commitData = {
      index,
      player: {
        name: name,
        location: PLAYER_LOCATION[index],
        type: type,
        role: role,
        skipTurn: false
      }
    }
    commit('setPlayer', commitData)
    fdbCommit('setPlayer', commitData)
  },

  startGame: function ({commit, state}) {
    commit('dealCards')
    fdbCommit('dealCards')

    commit('gameStateMessage', 'inProgress')
    fdbCommit('gameStateMessage', 'inProgress')

    // Flip the top card off the DRAW_STACK, and move it to the PLAYED_STACK
    commit('playCard', state.game.deck[28])
    fdbCommit('playCard', state.game.deck[28])

    fdbSync()
  },

  playCardAction: function ({commit}, [card, playerNumber]) {
    commit('playCard', card)
    fdbCommit('playCard', card)
  },

  drawCardAction: function ({commit, state}, playerNumber) {
    var drawStackCount = state.game.deck.filter(card => card.location === LOCATION.DRAW_STACK).length

    // If there are attacks stacked, then drawing means that the player has lost the attack
    if (state.game.specialAttackStack) {
      if (drawStackCount - state.game.specialAttackStack <= 0) {
        commit('repopulateDrawStack')
        fdbCommit('repopulateDrawStack')
      }
      // draw cards equal to the value of the stack and then reset the stack value
      for (var i = 0; i < state.game.specialAttackStack; i++) {
        commit('drawCard', playerNumber)
        fdbCommit('drawCard', playerNumber)
      }
      state.game.specialAttackStack = 0
    } else {
      commit('drawCard', playerNumber)
      fdbCommit('drawCard', playerNumber)
      if (drawStackCount === 1) {
        commit('repopulateDrawStack')
        fdbCommit('repopulateDrawStack')
      }
    }
  },

  jumpAction: function ({commit}) {
    commit('skipTurn')
    fdbCommit('skipTurn')
  },

  switchDirectionAction: function ({commit}) {
    commit('switchDirection')
    fdbCommit('switchDirection')
  },

  additionalTurnAction: function ({commit}) {
    commit('additionalTurn')
    fdbCommit('additionalTurn')
  },

  attackStackAction: function ({commit}, card) {
    var attackAmount = card.secondary === SECONDARY.SINGLE_ATTACK ? 1 : 2
    commit('attackStack', attackAmount)
    fdbCommit('attackStack', attackAmount)
  },

  changeColorAction: function ({commit}, color) {
    commit('changeColor', color)
    fdbCommit('changeColor', color)
  },

  endTurnAction: function ({commit}) {
    commit('endTurn')
    fdbCommit('endTurn')

    fdbSync()
  }
}
