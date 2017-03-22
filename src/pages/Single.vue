<template>
  <div class="screen single">
    <div v-if="gameStatus === 'waiting'">
      <div class="waiting-players">
        <div class="game-player"><small>Player 1</small>You</div>
        <div class="game-player" v-on:click="changeDifficulty(1)"><small>Player 2</small>CPU 1<span>Difficulty: {{ difficultyList[difficulties[1]] }}</span></div>
        <div class="game-player" v-on:click="changeDifficulty(2)"><small>Player 3</small>CPU 2<span>Difficulty: {{ difficultyList[difficulties[2]] }}</span></span></div>
        <div class="game-player" v-on:click="changeDifficulty(3)"><small>Player 4</small>CPU 3<span>Difficulty: {{ difficultyList[difficulties[3]] }}</span></div>
      </div>
      <button v-on:click="begin" class="button">Start Game</button>
    </div>
    <board v-else-if="gameStatus === 'inProgress'" />
	<div v-else>
		<div class="message">{{ gameStatus }}</div>
		<a v-on:click="begin" class="button">New Game</a><br /><router-link to="/" class="button">Back Home</router-link>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { DIFFICULTIES } from '../js/GameHelper'
import Board from 'components/Board'

export default {
  components: {
    Board
  },

  data () {
    return {
      diff1: 0,
      difficulties: [0, 0, 1, 2],
      difficultyList: [
        DIFFICULTIES.NORMAL,
        DIFFICULTIES.IMPOSSIBLE,
        DIFFICULTIES.EASY
      ]
    }
  },

  computed: {
    ...mapGetters([
      'gameStatus'
    ])
  },

  methods: {
    ...mapActions([
      'resetGame',
      'startGame'
    ]),

    changeDifficulty: function (playerNum) {
      if (this.difficulties[playerNum] === this.difficultyList.length - 1) {
        this.$set(this.difficulties, playerNum, 0)
      } else {
        this.$set(this.difficulties, playerNum, this.difficulties[playerNum] + 1)
      }
    },

    begin () {
      this.resetGame()
      var sendDifficulties = [null, null, null, null]
      for (var i = 0; i < this.difficulties.length; i++) {
        sendDifficulties[i] = this.difficultyList[this.difficulties[i]]
      }
      this.startGame(sendDifficulties)
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
