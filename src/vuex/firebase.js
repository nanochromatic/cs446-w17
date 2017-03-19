import Vue from 'vue'
import Firebase from 'firebase'
import VuexFire from 'vuexfire'
import mutations from './mutations'

Vue.use(VuexFire)

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyDkSHYI_iaJHNTizZUGiPvFoJ5_6bRAYPo',
  authDomain: 'quova-cb941.firebaseapp.com',
  databaseURL: 'https://quova-cb941.firebaseio.com',
  storageBucket: 'quova-cb941.appspot.com',
  messagingSenderId: '159172839201'
})

export const fdb = firebaseApp.database()

var remoteDB = null
var mockState = null

export const fdbGameInit = function (gameId) {
  remoteDB = fdb.ref(gameId)
  mockState = {}
}

export const fdbCommit = function (name, data) {
  if (typeof data === 'object') {
    console.log('object', data)
    data = JSON.parse(JSON.stringify(data))
  }
  console.info(`fdbC: ${name}`, new Date())
  mutations[name](mockState, data)
  /*
   * We can save some data by syncing batches manually.
   * See fdbSync() below
   */
  // remoteDB.update(mockState)
}

export const fdbSync = function () {
  console.info(`fdbSYNC`, new Date())
  remoteDB.update(mockState)
}
