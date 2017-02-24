<template>
  <div>
    <h3>Board</h3>

    <played-stack />
    <draw-stack />
    <player :playerNumber="1" />
    <player :playerNumber="2" />
    <player :playerNumber="3" />
    <player :playerNumber="4" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Player from './Player'
import DrawStack from './DrawStack'
import PlayedStack from './PlayedStack'

export default {
  components: {
    Player,
    DrawStack,
    PlayedStack
  },

  computed: {
    ...mapGetters([
      'players'
    ])
  },

  methods: {
    ...mapActions([
      'resetGame'
    ])
  },

  data () {
    return {

    }
  }
}

</script>
