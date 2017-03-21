import { LOCATION, SECONDARY, masterDrawStack } from '../js/DeckHelper'
import { shuffleArray } from '../js/GameHelper'
import { PLAYER_LOCATION } from '../js/PlayerHelper'
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
    var cardsToDraw = state.game.specialAttackStack || 1

    if (drawStackCount - cardsToDraw <= 0) {
      commit('repopulateDrawStack')
      fdbCommit('repopulateDrawStack')
    }
    for (var i = 0; i < cardsToDraw; i++) {
      commit('drawCard', playerNumber)
      fdbCommit('drawCard', playerNumber)
    }
  },

  cardEffectAction: function ({commit}, cardSecondary) {
    switch (cardSecondary) {
      case SECONDARY.REVERSE:
        commit('switchDirection')
        fdbCommit('switchDirection')
        break
      case SECONDARY.ADDITIONAL_TURN:
        commit('additionalTurn')
        fdbCommit('additionalTurn')
        break
      case SECONDARY.SINGLE_ATTACK:
        commit('attackStack', 1)
        fdbCommit('attackStack', 1)
        break
      case SECONDARY.DOUBLE_ATTACK:
        commit('attackStack', 2)
        fdbCommit('attackStack', 2)
        break
      case SECONDARY.JUMP:
        commit('skipTurn')
        fdbCommit('skipTurn')
        break
      case SECONDARY.SPECIAL1:
      case SECONDARY.SPECIAL2:
      case SECONDARY.SPECIAL3:
      case SECONDARY.SPECIAL4:
        break
    }
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
