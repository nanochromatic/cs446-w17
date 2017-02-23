export default {
  drawCard: function ({commit}, player) {
    commit('draw', player)
  }
}
