<template>
  <div>
    <h1>Single Player</h1>
    <button v-if="gameStatus === 'waiting'" v-on:click="begin" >Start Game</button>
    <board v-if="gameStatus === 'inProgress'" />
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
