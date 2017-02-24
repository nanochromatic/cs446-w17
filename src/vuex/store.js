import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  player: {
    name: ''
  },
  game: {
    id: '',
    gameState: 'waiting',
    deck: [],
    players: [],
    lastCardPlayed: null,
    specialAttackStack: 0,
    statusMessage: ''
  }
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  strict: debug
})
