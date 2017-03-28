// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import { mapMutations } from 'vuex'

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  firebase: {},
  template: '<App />',
  components: { App },
  methods: {
    ...mapMutations([
      'setPlayerName'
    ])
  },
  mounted () {
    this.setPlayerName(localStorage.getItem('playerName') || 'Anon')
  }
})
