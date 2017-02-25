<template>
  <div>
    <h3>Board</h3>

    <played-stack />
    <draw-stack />
    <player v-for="playerNumber in playersNumbers" :playerNumber="playerNumber" :class="playerNumber"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LOCATION } from '../js/GameHelper'
import Player from './Player'
import DrawStack from './DrawStack'
import PlayedStack from './PlayedStack'

export default {
  components: {
    Player,
    DrawStack,
    PlayedStack
  },

  computed: {
    ...mapGetters([
      'players'
    ])
  },

  methods: {
    ...mapActions([
      'resetGame'
    ])
  },

  data () {
    return {
      playersNumbers: [
        LOCATION.PLAYER1,
        LOCATION.PLAYER2,
        LOCATION.PLAYER3,
        LOCATION.PLAYER4
      ]
    }
  }
}

</script>

<style lang="scss">

.played-stack {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.player1 {
  position: fixed;
  bottom: 0;
  width: 50%;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  z-index: 1;
}

.player2 {
  -webkit-transform-origin: 0 50%;
  -moz-transform-origin: 0 50%;
  -ms-transform-origin: 0 50%;
  -o-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transform: rotate(-90deg) translate(-50%, 50%);
  -moz-transform: rotate(-90deg) translate(-50%, 50%);
  -ms-transform: rotate(-90deg) translate(-50%, 50%);
  -o-transform: rotate(-90deg) translate(-50%, 50%);
  transform: rotate(-90deg) translate(-50%, 50%);
  position: fixed;
  left: 0;
  width: 50%;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.player3 {
  position: fixed;
  top: 0;
  width: 50%;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
}

.player4 {
  -webkit-transform-origin: 100% 50%;
  -moz-transform-origin: 100% 50%;
  -ms-transform-origin: 100% 50%;
  -o-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
  -webkit-transform: rotate(90deg) translate(50%, 50%);
  -moz-transform: rotate(90deg) translate(50%, 50%);
  -ms-transform: rotate(90deg) translate(50%, 50%);
  -o-transform: rotate(90deg) translate(50%, 50%);
  transform: rotate(90deg) translate(50%, 50%);
  position: fixed;
  right: 0;
  width: 50%;
  top: 0;
  bottom: 0;
  margin-right: auto;
  margin-left: auto;
}

</style>
