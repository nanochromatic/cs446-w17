<template>
  <div class="board">
    <timer :subject="currentPlayer.name" v-on:timeExpired="outOfTime" />
    <div class="stacks">
      <played-stack />
      <draw-stack />
    </div>
    <player v-for="player in players" :key="player.location" :player="player" :class="player.location"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Timer from './Timer'
import Player from './Player'
import DrawStack from './DrawStack'
import PlayedStack from './PlayedStack'

export default {
  components: {
    Timer,
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

  methods: {
    ...mapActions([
      'drawCardAction',
      'endTurnAction'
    ]),

    outOfTime () {
      console.log('Time is up!')
      this.drawCardAction(this.currentPlayer.location)
      this.endTurnAction()
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
