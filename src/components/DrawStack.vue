<template>
  <div class="drawStack">
    <b>Draw Stack</b>
    <card v-for="card in drawStackDeck" :card="card" />
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
