<template>
  <div class="playedStack">
    Played Stack
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
      'playedStackDeck'
    ])
  },

  methods: {
  }

}
</script>
