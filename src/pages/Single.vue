<template>
  <div class="single">
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

<style lang="scss">

.single {
  position:absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  background:#fff url(../../static/background.png) center center no-repeat;
  background-attachment: fixed;
  background-size:100% 100%;
}

</style>
