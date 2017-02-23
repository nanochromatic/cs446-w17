<template>
  <div class="deck">
  </div>
</template>

<script>
import Card from './Card'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      deckEmpty: null
    }
  },

  computed: {
    ..mapGetters([
      'deck'
    ])
  },

  methods: {
    ...mapActions([
      'drawCard'
    ]),


    draw () {
      
    },

  },

  components: {Card}
}
</script>
