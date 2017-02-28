<template>
  <div class="board">
    <div class="debug">
      Time for {{ currentPlayer.id }}: <strong>{{ timerSeconds }}</strong>
      <!--<h4>Current Player: {{ currentPlayer.id }}</h4>-->
      <!--<h4>Current Colour: {{ lastColour }}</h4>-->
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
import { LOCATION, randomIntFromInterval } from '../js/GameHelper'
import Player from './Player'
import DrawStack from './DrawStack'
import PlayedStack from './PlayedStack'

export default {
  components: {
    Player,
    DrawStack,
    PlayedStack
  },

  watch: {
    currentTurnStatus: function (val, oldVal) {
      if (val === false && oldVal === true) {
        this.turnStatusChange()
      }
    }
  },

  computed: {
    ...mapGetters([
      'players',
      'currentPlayer',
      'lastColour',
      'currentTurnStatus'
    ])
  },

  mounted: function () {
    // this.initPlayers()
    this.startTimer()
  },

  methods: {
    ...mapActions([
      'resetGame',
      'drawCardAction'
    ]),

    ...mapMutations([
      'switchPlayer',
      'changeCpuBoardAction',
      'startCurrentTurn',
      'endCurrentTurn'
    ]),

    startTimer () {
      if (!this.timerStarted) {
        this.startCurrentTurn()
        if (this.currentPlayer.type === 'cpu') {
          this.randomBotMoveTime = randomIntFromInterval(12, 13)
          this.changeCpuBoardAction('')
        }
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
      if (this.timerSeconds === this.randomBotMoveTime) {
        // bot makes a move when timer is equal to randomBotMoveTime
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
      this.drawCardAction(this.currentPlayer.id)
      console.log('Out of time!')
      this.endCurrentTurn()
      this.endTurn()
    },

    processBot () {
      if (this.currentPlayer.type === 'cpu') {
        this.stopTimer()
        this.changeCpuBoardAction(this.currentPlayer.id)
        // this.endTurn()
      }
    },

    turnStatusChange () {
      this.stopTimer()
      this.endTurn()
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
      timerInterval: null,
      randomBotMoveTime: 10
    }
  }
}

</script>

<style>
.board {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.debug {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 5vmin;
  z-index: 2;
}

.stacks {
  width: 100%;
  height: 30%;
}

.player1 {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30%;
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
  height: 25%;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.player3 {
  position: fixed;
  top: 0;
  width: 100%;
  height: 25%;
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
  -webkit-transform: rotate(90deg) translate(80%, 50%);
  -moz-transform: rotate(90deg) translate(80%, 50%);
  -ms-transform: rotate(90deg) translate(80%, 50%);
  -o-transform: rotate(90deg) translate(80%, 50%);
  transform: rotate(90deg) translate(80%, 50%);
  position: fixed;
  right: 0;
  width: 50%;
  height: 25%;
  top: 0;
  bottom: 0;
  margin-right: auto;
  margin-left: auto;
}

</style>
