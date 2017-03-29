<template>
  <div class="board">
    <timer :name="currentPlayer.name" v-on:timeExpired="outOfTime" />
	<div class="attackStack" v-if="attackStatus"><img class="attackStackIndicator" src="static/attackStackIndicator.png"/> x{{ attackStatus }}</div>
    <div class="stacks">
      <played-stack />
      <draw-stack />
    </div>
    <player v-for="(location, id) in locations" :key="id" :player="players[getPlayerIndex(id)]" :class="location"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getPlayerId } from '../js/GameHelper'
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
  data () {
    return {
      locations: {}
    }
  },
  computed: {
    ...mapGetters([
      'players',
      'currentPlayer',
      'attackStatus'
    ])
  },

  methods: {
    ...mapActions([
      'drawCardAction',
      'endTurnAction'
    ]),

    getPlayerIndex (id) {
      return this.players.findIndex(player => player.id === id)
    },

    outOfTime () {
      console.log('Time is up!')
      this.drawCardAction(this.currentPlayer.location)
      this.endTurnAction()
    }
  },
  mounted () {
    var devicePlayerId = getPlayerId()
    var locations = {}
    var classNames = ['bottom', 'left', 'top', 'right']
    var ids = this.players.map(player => player.id)
    var index = ids.findIndex(id => id === devicePlayerId)
    // ensure the device player is first in ids[], so that they get position bottom
    for (var i = 0; i < index; i++) {
      var a = ids.shift()
      ids.push(a)
    }
    ids.forEach((id, i) => { locations[id] = classNames[i] })
    this.locations = locations
  }
}

</script>

<style>
.board {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.stacks {
  display: flex;
  justify-content: center;
  width: 60%;
  height: 30%;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 30%;
  z-index: 1;
}

.left {
  transform-origin: 0 0;
  transform: rotate(90deg) translateY(-100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 30%;
}

.top {
  transform: rotate(180deg);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 30%;
}

.right {
  transform-origin: 100% 0%;
  transform: rotate(-90deg) translateY(-100%);
  position: fixed;
  top: 0;
  right: 0;
  width: 100vh;
  height: 30%;
}

.attackStackIndicator {
  height: 5vmin;
}

.attackStack {
  position: absolute;
  display: inline-block;
  top: 6vmin;
  font-size: 5vmin;
  left: 0;
  z-index: 2;
}

</style>
