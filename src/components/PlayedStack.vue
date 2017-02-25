<template>
  <div class="playedStack">
    <card v-for="card in playedStackDeck" :card="card" class="card-container"/>
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

<style lang="scss">

.playedStack {
  display: -webkit-inline-flex;
  width: 150px;
  margin: 0 auto;
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
