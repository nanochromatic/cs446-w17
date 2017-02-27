<template>
  <div class="drawStack">
    <card v-for="card in drawStackDeck" :card="card" class="card-container" :show='false'/>
  </div>
</template>

<script>
import Card from './Card'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Card
  },

  data () {
    return {}
  },

  computed: {
    ...mapGetters([
      'drawStackDeck'
    ])
  },

  methods: {
    ...mapActions([
      'drawCard'
    ]),

    draw () {
    }

  }
}
</script>

<style scoped>

.drawStack {
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
