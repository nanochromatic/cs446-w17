<template>
  <div class="playedStack">
    <b>Top Of Played Stack</b>
    <card :card="lastCardPlayed" />
    <b>Played Stack</b>
    <card v-for="card in playedStackDeck" :card="card" />
  </div>
</template>

<script>
import Card from './Card'
import { mapGetters } from 'vuex'

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
      'playedStackDeck'
    ])
  },

  methods: {
  }

}
</script>
