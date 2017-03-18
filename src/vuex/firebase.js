import Vue from 'vue'
import Firebase from 'firebase'
import VuexFire from 'vuexfire'

Vue.use(VuexFire)

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyDkSHYI_iaJHNTizZUGiPvFoJ5_6bRAYPo',
  authDomain: 'quova-cb941.firebaseapp.com',
  databaseURL: 'https://quova-cb941.firebaseio.com',
  storageBucket: 'quova-cb941.appspot.com',
  messagingSenderId: '159172839201'
})

const db = firebaseApp.database()

export default db
