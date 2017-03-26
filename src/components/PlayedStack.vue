<template>
  <div class="playedStack">
    <card :card="lastCardPlayed" :theme="devicePlayerTheme"/>
    <!--<card v-for="card in reverse" :card="card" class="card-container"/>-->
  </div>
</template>

<script>
import Card from './Card'
import { mapGetters } from 'vuex'
import { getPlayerTheme } from '../js/GameHelper'

export default {
  components: {
    Card
  },

  data () {
    return {}
  },

  computed: {
    ...mapGetters([
      'lastCardPlayed',
      'playedStackDeck',
      'currentPlayer'
    ]),

    reverse: function () {
      return this.playedStackDeck.reverse()
    },

    devicePlayerTheme () {
      return getPlayerTheme()
    }
  },

  methods: {
  }

}
</script>

<style lang="scss">

.playedStack {
  display: -webkit-inline-flex;
  display: inline-flex;
  width: 20%;
  height: 100%;
  float: left;
  margin-left: 30%;
}

.card-container {
  -webkit-flex: 1 1 100px;
  flex: 1 1 100px;
  overflow: visible;
}

.card-container:last-child {
  -webkit-flex: 0 0 100px;
  flex: 0 0 100px;
}

</style>
