import Vue from 'vue'
import Vuex from 'vuex'
import VuexFire from 'vuexfire'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  waitingPlayers: [],
  player: {
    name: ''
  },
  isGameController: false,
  currentGameId: null,
  game: {
    gameState: 'waiting',
    deck: [],
    players: [],
    lastCardPlayed: null,
    specialAttackStack: 0,
    statusMessage: ''
  }
}

// apparently vuexfire doesn't work with strict mode...
// const debug = process.env.NODE_ENV !== 'production'

// "Concat" VuexFire mutations to the custom ones
const allMutations = Object.assign({}, mutations, VuexFire.mutations)

export default new Vuex.Store({
  state,
  actions,
  mutations: allMutations,
  getters,
  strict: false
})
