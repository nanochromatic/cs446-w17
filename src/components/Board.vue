<template>
  <div>
    <div class="debug">
      <h4>Time Remaining: {{ timerSeconds }}</h4>
      <h4>Current Player: {{ currentPlayer.id }}</h4>
      <h4>Current Colour: {{ lastColour }}</h4>
    </div>
    <div class="stacks">
      <played-stack />
      <draw-stack />
    </div>
    <player v-for="playerNumber in playersNumbers" :playerNumber="playerNumber" :class="playerNumber"/>
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
      'currentPlayer',
      'lastColour'
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

<style>

.debug {
  position: absolute;
  top: 40%;
  left: 70%;
}

.stacks {
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(110%);
}

.player1 {
  position: fixed;
  bottom: 0;
  width: 100%;
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
  width: 100%;
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
