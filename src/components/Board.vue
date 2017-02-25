<template>
  <div>
    <h3>Board</h3>
    <h4>Time Remaining<div class="timer" v-text="timerSeconds"></div></h4>
    <h4>Current Player<div class="player-label" v-text="currentPlayer"></div></h4>
    <played-stack />
    <draw-stack />
    <player v-for="playerNumber in playersNumbers" :playerNumber="playerNumber" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
      'players',
      'currentPlayer'
    ])
  },

  mounted: function () {
    this.startTimer()
  },

  methods: {
    ...mapActions([
      'resetGame'
    ]),

    ...mapMutations([
      'endTurn'
    ]),

    startTimer () {
      if (!this.timerStarted) {
        this.timerStarted = true
        setInterval(this.tickTimer, 1000)
        this.resetTimer()
      }
    },

    resetTimer () {
      this.timerSeconds = this.MAX_TIME
    },

    tickTimer () {
      if (!this.timerStarted) {
        return
      }
      this.timerSeconds--
      if (this.timerSeconds === 0) {
        this.completeTimer()
        return
      }
    },

    completeTimer () {
      this.timerStarted = false
      console.log('Out of time!')
    }
  },

  data () {
    return {
      playersNumbers: [
        LOCATION.PLAYER1,
        LOCATION.PLAYER2,
        LOCATION.PLAYER3,
        LOCATION.PLAYER4
      ],
      MAX_TIME: 15,
      timerSeconds: this.MAX_TIME,
      timerStarted: false
    }
  }
}

</script>
