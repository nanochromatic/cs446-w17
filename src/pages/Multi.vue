<template>
  <div class="screen multi">
    <div v-if="gameStatus === 'waiting'">
      <div class="waiting-players">
        <div v-for="(player, i) in players" class="game-player"><small>Player {{ i+1 }}</small>{{ player }}</div>
        <!--
        <div class="game-player"><small>Player 1</small>You</div>
        <div class="game-player"><small>Player 2</small>CPU 1</div>
        <div class="game-player"><small>Player 3</small>CPU 2</div>
        <div class="game-player"><small>Player 4</small>CPU 3</div>
        -->
      </div>
      <button v-on:click="begin" class="button">Start Game</button><router-link to="/" class="button">Back Home</router-link>
    </div>
    <board v-else-if="gameStatus === 'inProgress'" />
  <div v-else>
    <div class="message">{{ gameStatus }}</div>
    <a v-on:click="begin" class="button">New Game</a><br /><router-link to="/" class="button">Back Home</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { fdb } from '../vuex/firebase'
import { PLAYER_TYPE, PLAYER_ROLE } from '../js/GameHelper'
import Board from 'components/Board'

export default {
  components: {
    Board
  },

  firebase () {
    return {
      waitingPlayers: fdb.ref('waitingPlayers')
    }
  },

  data () {
    return {
      userId: '',
      playerName: ''
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
      var cpuCount = 0
      return [
        this.waitingPlayers[0] ? this.waitingPlayers[0].name : `CPU${++cpuCount}`,
        this.waitingPlayers[1] ? this.waitingPlayers[1].name : `CPU${++cpuCount}`,
        this.waitingPlayers[2] ? this.waitingPlayers[2].name : `CPU${++cpuCount}`,
        this.waitingPlayers[3] ? this.waitingPlayers[3].name : `CPU${++cpuCount}`
      ]
    }
  },

  methods: {
    ...mapActions([
      'resetGame',
      'setPlayer',
      'startGame'
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

      this.resetGame()
      for (var i = 0; i < 4; i++) {
        player.index = i
        if (this.waitingPlayers[i]) {
          // Human
          player.name = this.waitingPlayers[i].name
          player.type = PLAYER_TYPE.HUMAN
          player.role = false
        } else {
          // CPU
          player.name = `CPU${++cpuCount}`
          player.type = PLAYER_TYPE.CPU
          player.role = PLAYER_ROLE.PERSONALITY1
        }
        this.setPlayer(player)
      }
      // Need to go backwards through the waitingPlayers, otherwise we delete and the indexes change
      for (i = humanCount - 1; i >= 0; i--) {
        this.$firebaseRefs.waitingPlayers.child(this.waitingPlayers[i]['.key']).remove()
      }
      this.startGame()
    }
  },

  mounted () {
    this.userId = Date.now()
    this.playerKey = this.$firebaseRefs.waitingPlayers.child(this.userId).set({
      name: this.player.name,
      ping: Date.now()
    })
  },

  beforeDestroy () {
    //  TODO: We need to remove a waiting player if they leave this screen, but this doesn't work because vuexfire removes the $firebaseRefs before this is called. Also need to handle case where the app is closed.
    // console.log(this.playerKey, this.$firebaseRefs)
    // this.$firebaseRefs.waitingPlayers.child(this.userId).remove()
    console.log('beforeDestroy')
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
