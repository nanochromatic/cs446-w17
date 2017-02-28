<template>
  <div class="screen single">
    <div v-if="gameStatus === 'waiting'">
      <div class="waiting-players">
        <div class="game-player"><small>Player 1</small>You</div>
        <div class="game-player"><small>Player 2</small>CPU 1</div>
        <div class="game-player"><small>Player 3</small>CPU 2</div>
        <div class="game-player"><small>Player 4</small>CPU 3</div>
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
import Board from 'components/Board'

export default {
  components: {
    Board
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

    begin () {
      this.resetGame()
      this.startGame()
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
