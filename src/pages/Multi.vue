<template>
  <div class="screen multi">
    <div v-if="gameStatus === 'waiting'">
      <div class="waiting-players">
        <div v-for="(player, i) in players" class="game-player"><small>Player {{ i+1 }}</small>{{ player }}</div>
      </div>
      <button v-on:click="begin" class="button">Start Game</button>
      <button v-on:click="join" class="button">Join Game</button>
      <router-link to="/" class="button">Back Home</router-link>
    </div>
    <board v-else-if="gameStatus === 'inProgress'" />
  <div v-else>
    <div class="message">{{ gameStatus }}</div>
    <a v-on:click="begin" class="button">New Game</a><br /><router-link to="/" class="button">Back Home</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { fdb } from '../vuex/firebase'
import { getPlayerId } from '../js/GameHelper'
import { PLAYER_TYPE, PLAYER_ROLE } from '../js/PlayerHelper'
import Board from 'components/Board'

export default {
  components: {
    Board
  },

  data () {
    return {
      devicePlayerId: ''
    }
  },

  computed: {
    ...mapState([
      'player',
      'waitingPlayers'
    ]),
    ...mapGetters([
      'gameStatus'
    ]),
    players () {
      if (!this.waitingPlayers) { return [] }
      var cpuCount = 0
      var players = [
        this.waitingPlayers[0] ? this.waitingPlayers[0].name : `CPU${++cpuCount}`,
        this.waitingPlayers[1] ? this.waitingPlayers[1].name : `CPU${++cpuCount}`,
        this.waitingPlayers[2] ? this.waitingPlayers[2].name : `CPU${++cpuCount}`,
        this.waitingPlayers[3] ? this.waitingPlayers[3].name : `CPU${++cpuCount}`
      ]
      if (cpuCount === 0) {
        this.begin()
      }
      return players
    }
  },

  methods: {
    ...mapMutations([
      'setGameController'
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
        role: false
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
          player.role = false
          humanCount++
        } else {
          // CPU
          cpuCount++
          player.name = `CPU${cpuCount}`
          player.id = `CPU${cpuCount}`
          player.type = PLAYER_TYPE.CPU
          player.role = PLAYER_ROLE.PERSONALITY1
        }
        this.setPlayer(player)
      }

      this.setGameController(true)

      // Need to go backwards through the waitingPlayers, otherwise we delete and the indexes change
      for (i = humanCount - 1; i >= 0; i--) {
        window.vm.$firebaseRefs.waitingPlayers.child(this.waitingPlayers[i]['.key']).update({gameId: 'g3'})
      }

      this.startGame()
    },

    join () {
      this.setGameController(false)
      this.joinGame('g3')
    }
  },

  mounted () {
    console.log('mounting')
    function mount () {
      console.log('mount attempt', window.vm, this.player)
      if (window.vm !== undefined) {
        clearInterval(interval)
        window.vm.$bindAsArray('waitingPlayers', fdb.ref('waitingPlayers'))

        this.devicePlayerId = getPlayerId()
        this.playerKey = window.vm.$firebaseRefs.waitingPlayers.push({
          name: this.player.name,
          playerId: this.devicePlayerId,
          ping: Date.now(),
          gameId: 0
        }).key
      }
    }

    var interval = setInterval(mount.bind(this), 100)
  },

  beforeDestroy () {
    window.vm.$firebaseRefs.waitingPlayers.child(this.playerKey).remove()
    window.vm.$unbind('waitingPlayers')
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
}
.game-player {
  box-sizing: border-box;
  font-size: 1.5em;
  padding: 1em;
  border: 1px solid #fff;
  width: 50%;
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
