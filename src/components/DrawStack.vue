<template>
  <div class="drawStack">
    Draw Stack
    <card />
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
      'deck'
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
