<template>
  <div>
    <h1>Single Player</h1>
    <button v-on:click="resetGame">Start Game</button>
    <board />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Board from 'components/Board'

export default {
  components: {
    Board
  },

  methods: {
    ...mapActions([
      'resetGame'
    ])
  }
}
</script>
