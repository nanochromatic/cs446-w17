<template>
  <div class="board">
    <timer :name="currentPlayer.name" v-on:timeExpired="outOfTime" />
    <div class="stacks">
      <played-stack />
      <draw-stack />
    </div>
    <player v-for="(location, id) in locations" :key="id" :player="players[getPlayerIndex(id)]" :class="location"/>
    <!-- <player v-for="player in players" :key="player.location" :player="player" :class="locations[player.id]"/> -->
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

  computed: {
    ...mapGetters([
      'players',
      'currentPlayer'
    ]),
    locations () {
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

      return locations
    }
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

.bottom {
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

.left {
  transform-origin: 0 50%;
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

.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 25%;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
}

.right {
  transform-origin: 100% 50%;
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
