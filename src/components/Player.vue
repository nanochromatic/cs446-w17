<template>
  <div>
    <b>Player {{ playerNumber }}</b>
    <card v-for="card in playerHand" :card="card" />
  </div>
</template>

<script>
import Card from './Card'
import { mapGetters } from 'vuex'

export default {
  props: {
    playerNumber: {
      type: Number,
      required: true
    }
  },

  components: {
    Card
  },

  computed: {
    ...mapGetters([
      'playerOneHand',
      'playerTwoHand',
      'playerThreeHand',
      'playerFourHand'
    ]),

    playerHand () {
      switch (this.playerNumber) {
        case 1: return this.playerOneHand
        case 2: return this.playerTwoHand
        case 3: return this.playerThreeHand
        case 4: return this.playerFourHand
      }
    }

  }

}
</script>
