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
      'resetGame',
      'drawCardAction'
    ]),

    ...mapMutations([
      'switchPlayer',
      'changeCpuBoardAction'
    ]),

    startTimer () {
      if (!this.timerStarted) {
        this.timerStarted = true
        this.timerInterval = setInterval(this.tickTimer, 1000)
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
        this.outOfTime()
        return
      }
      if (this.timerSeconds === 10) {
        // bot makes a move when timer is at 10s
        this.processBot()
        return
      }
    },

    stopTimer () {
      clearInterval(this.timerInterval)
      this.timerStarted = false
    },

    endTurn () {
      this.switchPlayer()
      this.startTimer()
    },

    outOfTime () {
      this.stopTimer()
      this.drawCardAction(this.currentPlayer)
      console.log('Out of time! Drawing card from deck...')
      this.endTurn()
    },

    processBot () {
      if (this.currentPlayer.type === 'cpu') {
        this.stopTimer()
        this.changeCpuBoardAction(this.currentPlayer)
        this.endTurn()
      }
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
      timerStarted: false,
      timerInterval: null
    }
  }
}

</script>
