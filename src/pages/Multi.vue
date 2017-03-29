<template>
  <div class="screen multi">
    <div v-if="gameStatus === 'waiting'">
      <div class="waiting-players">
        <div v-for="(player, i) in players" class="game-player"><small>Player {{ i+1 }}</small>{{ player }}</div>
      </div>
      <router-link to="/" class="button">Back Home</router-link>
      <button v-on:click="begin" class="button">Start Game</button>
    </div>
    <board v-else-if="gameStatus === 'inProgress'" />
  <div v-else>
    <div class="message">{{ gameStatus }}</div>
    <a v-on:click="begin" class="button">New Game</a><br /><router-link v-on:click.native="returnHome" to="/" class="button">Back Home</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { fdb } from '../vuex/firebase'
import { getPlayerId } from '../js/GameHelper'
import { PLAYER_TYPE, PLAYER_DIFFICULTY } from '../js/PlayerHelper'
import Board from 'components/Board'

export default {
  components: {
    Board
  },

  data () {
    return {
      cpuNames: ['CPU Alice', 'CPU Bob', 'CPU Carol', 'CPU Dave'],
      mountInterval: null,
      devicePlayerId: ''
    }
  },

  computed: {
    ...mapState([
      'player',
      'waitingPlayers',
      'isGameController',
      'currentGameId'
    ]),
    ...mapGetters([
      'gameStatus'
    ]),
    players () {
      if (!this.waitingPlayers) { return [] }
      var cpuCount = 0
      var players = [
        this.waitingPlayers[0] ? this.waitingPlayers[0].name : this.cpuNames[cpuCount++],
        this.waitingPlayers[1] ? this.waitingPlayers[1].name : this.cpuNames[cpuCount++],
        this.waitingPlayers[2] ? this.waitingPlayers[2].name : this.cpuNames[cpuCount++],
        this.waitingPlayers[3] ? this.waitingPlayers[3].name : this.cpuNames[cpuCount++]
      ]

      if (cpuCount === 0 && this.waitingPlayers[0].playerId === this.devicePlayerId) {
        // Have the first player in the lobby start the game and become controller
        console.log('STARTING GAME!!!')
        this.begin()
      }
      return players
    }
  },

  methods: {
    ...mapMutations([
      'setGameController',
      'setCurrentGameId'
    ]),

    ...mapActions([
      'resetGame',
      'setPlayer',
      'startGame',
      'joinGame'
    ]),

    begin () {
      var player = {
        index: 0,
        name: '',
        type: '',
        difficulty: false
      }
      var humanCount = 0
      var cpuCount = 0

      this.resetGame({sync: true, gameId: 'g3'})

      for (var i = 0; i < 4; i++) {
        player.index = i
        if (this.waitingPlayers[i]) {
          // Human
          player.name = this.waitingPlayers[i].name
          player.id = this.waitingPlayers[i].playerId
          player.type = PLAYER_TYPE.HUMAN
          player.difficulty = false
          humanCount++
        } else {
          // CPU
          cpuCount++
          player.name = this.cpuNames[cpuCount]
          player.id = `CPU${cpuCount}`
          player.type = PLAYER_TYPE.CPU
          player.difficulty = PLAYER_DIFFICULTY.NORMAL
        }
        this.setPlayer(player)
      }

      this.setGameController(true)

      // Need to go backwards through the waitingPlayers, otherwise we delete and the indexes change
      for (i = humanCount - 1; i >= 0; i--) {
        window.vm.$firebaseRefs.waitingPlayers.child(this.waitingPlayers[i]['.key']).update({gameId: this.currentGameId})
      }

      this.startGame()
    },

    returnHome () {
      this.resetGame({sync: false})
    },

    mountBehaviour () {
      if (window.vm !== undefined) {
        clearInterval(this.mountInterval)
        window.vm.$bindAsArray('waitingPlayers', fdb.ref('waitingPlayers'))

        this.devicePlayerId = getPlayerId()
        this.playerKey = window.vm.$firebaseRefs.waitingPlayers.push({
          name: this.player.name,
          playerId: this.devicePlayerId,
          ping: Date.now(),
          gameId: 0
        }).key

        window.vm.$firebaseRefs.waitingPlayers.child(this.playerKey).child('gameId').on('value', function (snapshot) {
          var gameId = snapshot.val()
          if (gameId) {
            window.vm.$firebaseRefs.waitingPlayers.child(this.playerKey).remove()
            if (!this.isGameController) {
              this.setGameController(false)
              this.setCurrentGameId(gameId)
              this.joinGame(gameId)
            }
          }
        }, this)
      }
    },

    unmountBehaviour () {
      if (window.vm.$firebaseRefs.waitingPlayers !== undefined) {
        window.vm.$firebaseRefs.waitingPlayers.child(this.playerKey).remove()
        window.vm.$unbind('waitingPlayers')
      }
    }
  },

  mounted () {
    this.mountInterval = setInterval(this.mountBehaviour, 100)

    // Browser window show/hide
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        this.mountBehaviour()
      } else if (document.visibilityState === 'hidden') {
        this.unmountBehaviour()
      }
    }.bind(this))

    // Cordova event
    document.addEventListener('pause', function () {
      this.unmountBehaviour()
    }.bind(this))

    // Cordova event
    document.addEventListener('resume', function () {
      this.mountBehaviour()
    }.bind(this))
  },

  beforeDestroy () {
    this.unmountBehaviour()
  }
}
</script>

<style scoped>
.multi {
  display: flex;
  align-items: center;
  justify-content: center;
}

.waiting-players {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.game-player {
  box-sizing: border-box;
  font-size: 1.2em;
  padding: 1em;
  border: 1px solid #fff;
  width: 40vw;
}
.game-player small {
  display: block;
  text-transform: uppercase;
}

.button {
  margin: 1em;
  padding: 0;
  border:0px;
  font-size: 2em;
  color: #fff;
  background: none;
  text-decoration: none;
}

.message {
  font-size: 3em;
}
</style>
