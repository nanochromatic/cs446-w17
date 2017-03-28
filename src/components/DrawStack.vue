<template>
  <div class="draw-stack" v-on:click="draw">
    <transition-group name="draw-card" tag="div" class="t-el">
      <div class="card-container" v-for="card in stack" :key="card.id">
        <card :card="card" :show='false'/>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getPlayerId } from '../js/GameHelper'
import Card from './Card'

export default {
  components: {
    Card
  },
  computed: {
    ...mapGetters([
      'drawStackDeck',
      'currentPlayer'
    ]),

    stack () {
      return this.drawStackDeck.reverse()
    }
  },
  methods: {
    ...mapActions([
      'drawCardAction',
      'endTurnAction'
    ]),

    draw () {
      if (this.currentPlayer.id === getPlayerId()) {
        this.drawCardAction(this.currentPlayer.location)
        this.endTurnAction()
      }
    }
  }
}
</script>

<style scoped>
b {
  font-size: 3vmin;
  z-index: 2;
}

.draw-stack {
  position: relative;
  width: 30%;
  height: 100%;
}

.t-el {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
}

.card-container {
  flex: 1 1 auto;
}

.card-container:first-child {
  flex: 0 0 119px;
}

.draw-card-enter-active,
.draw-card-leave-active {
  transition: all .5s ease-in;
  transform: scale(1);
  opacity: 1;
}
.draw-card-enter,
.draw-card-leave-to {
  transform: scale(1.3);
  opacity: 0;
}
</style>
