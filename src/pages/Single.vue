<template>
  <div class="screen single">
    <div v-if="gameStatus === 'waiting'">
      <div class="waiting-players">
        <div class="game-player"><small>Player 1</small>You ({{ player.name }})</div>
        <div class="game-player" v-on:click="changeDifficulty(1)"><small>Player 2</small>CPU Alice<span>Difficulty: {{ difficulties[1] }}</span></div>
        <div class="game-player" v-on:click="changeDifficulty(2)"><small>Player 3</small>CPU Bob<span>Difficulty: {{ difficulties[2] }}</span></span></div>
        <div class="game-player" v-on:click="changeDifficulty(3)"><small>Player 4</small>CPU Carol<span>Difficulty: {{ difficulties[3] }}</span></div>
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
import { getPlayerId } from '../js/GameHelper'
import { PLAYER_TYPE, PLAYER_DIFFICULTY } from '../js/PlayerHelper'
import Board from 'components/Board'

export default {
  components: {
    Board
  },

  data () {
    return {
      difficulties: [0, PLAYER_DIFFICULTY.EASY, PLAYER_DIFFICULTY.NORMAL, PLAYER_DIFFICULTY.IMPOSSIBLE]
    }
  },

  computed: {
    ...mapState([
      'player'
    ]),
    ...mapGetters([
      'gameStatus'
    ]),

    difficultyLevels () {
      return PLAYER_DIFFICULTY
    }
  },

  methods: {
    ...mapMutations([
      'setGameController'
    ]),
    ...mapActions([
      'resetGame',
      'setPlayer',
      'startGame'
    ]),

    changeDifficulty: function (playerNum) {
      var newDifficulty
      switch (this.difficulties[playerNum]) {
        case PLAYER_DIFFICULTY.EASY:
          newDifficulty = PLAYER_DIFFICULTY.NORMAL
          break
        case PLAYER_DIFFICULTY.NORMAL:
          newDifficulty = PLAYER_DIFFICULTY.IMPOSSIBLE
          break
        case PLAYER_DIFFICULTY.IMPOSSIBLE:
          newDifficulty = PLAYER_DIFFICULTY.EASY
          break
      }
      this.$set(this.difficulties, playerNum, newDifficulty)
    },

    begin () {
      this.resetGame({sync: false})
      this.setGameController(true)
      this.setPlayer({index: 0, name: this.player.name, id: getPlayerId(), type: PLAYER_TYPE.HUMAN})
      this.setPlayer({index: 1, name: 'CPU Alice', id: 'CPU1', type: PLAYER_TYPE.CPU, difficulty: this.difficulties[1]})
      this.setPlayer({index: 2, name: 'CPU Bob', id: 'CPU2', type: PLAYER_TYPE.CPU, difficulty: this.difficulties[2]})
      this.setPlayer({index: 3, name: 'CPU Carol', id: 'CPU3', type: PLAYER_TYPE.CPU, difficulty: this.difficulties[3]})
      this.startGame()
    },

    returnHome () {
      this.resetGame({sync: false})
    }
  }

}
</script>

<style scoped>
.single {
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

.game-player span {
  display: block;
  font-style: italic;
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
