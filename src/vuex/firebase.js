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

const DEBUGFIREBASE = false

var remoteDB = null
var mockState = null

export const fdbGameInit = function () {
  remoteDB = fdb.ref('games').push()
  mockState = {}
  if (DEBUGFIREBASE) {
    console.info(`fdbGameInit`, new Date())
  }
  return remoteDB
}

export const fdbGameJoin = function (gameId) {
  remoteDB = fdb.ref('games').child(gameId)
  mockState = {}
  if (DEBUGFIREBASE) {
    console.info(`fdbGameJoin`, new Date())
  }
  return remoteDB
}

export const fdbCommit = function (name, data) {
  // Don't try and commit if we're not connected to firebase (ie, singleplayer)
  if (remoteDB === null) { console.error('blocked commit'); return false }
  if (mockState.game === undefined && name !== 'reset') { console.error(`mockState.game UNDEFINED for commit: ${name}`) }

  // Necessary to strip some Vue observers
  if (typeof data === 'object') {
    data = JSON.parse(JSON.stringify(data))
  }
  if (DEBUGFIREBASE) {
    console.info(`fdbC: ${name}`, new Date(), JSON.parse(JSON.stringify(mockState)))
  }
  mutations[name](mockState, data)
  /*
   * We can save some data by syncing batches manually.
   * See fdbSync() below
   */
  // remoteDB.update(mockState)
}

export const fdbSync = function () {
  // Don't try and sync if we're not connected to firebase (ie, singleplayer)
  if (remoteDB === null) { return false }

  if (DEBUGFIREBASE) {
    console.info(`fdbSYNC`, new Date(), JSON.parse(JSON.stringify(mockState)))
  }
  remoteDB.update(mockState)
}
