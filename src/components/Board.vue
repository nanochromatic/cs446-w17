<template>
  <div>
    <h3>Board</h3>

    <played-stack />
    <draw-stack />
    <player />
    <player />
    <player />
    <player />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Player from './Player'
import DrawStack from './DrawStack'
import PlayedStack from './PlayedStack'

export default {
  components: {
    Player,
    DrawStack,
    PlayedStack
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
