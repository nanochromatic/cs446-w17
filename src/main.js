// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import App from './App'
import router from './router'

Vue.use(VueFire)

var firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyDkSHYI_iaJHNTizZUGiPvFoJ5_6bRAYPo',
  authDomain: 'quova-cb941.firebaseapp.com',
  databaseURL: 'https://quova-cb941.firebaseio.com',
  storageBucket: 'quova-cb941.appspot.com',
  messagingSenderId: '159172839201'
})

var db = firebaseApp.database()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  firebase: {
    messages: db.ref('messages')
  },
  router,
  template: '<App :messages="messages" />',
  components: { App }
})
