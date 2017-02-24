<template>
  <div>
    Player
    <card v-for="card in playerOneHand" :card="card" />
  </div>
</template>

<script>
import Card from './Card'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card
  },

  computed: {
    ...mapGetters([
      'playerOneHand'
    ])
  }

}
</script>
