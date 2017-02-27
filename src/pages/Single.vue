<template>
  <div class="screen single">
    <button v-if="gameStatus === 'waiting'" v-on:click="begin" class="button">Start Game</button>
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
