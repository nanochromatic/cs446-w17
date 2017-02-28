<template>
  <div class="screen single">
    <button v-if="gameStatus === 'waiting'" v-on:click="begin" >Start Game</button>
    <board v-else-if="gameStatus === 'inProgress'" />
	<div v-else>
		<b>{{ gameStatus }}</b><br/>
		<button v-on:click="begin" :gameStatus = 'waiting' >Restart Game</button>
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

<style>

.single {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  font-size: 3em;
  color: #fff;
}

</style>
