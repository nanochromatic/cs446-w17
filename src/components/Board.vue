<template>
  <div>
    <h3>Board</h3>

    <played-stack />
    <draw-stack />
    <player v-for="playerNumber in playersNumbers" :playerNumber="playerNumber" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LOCATION } from '../js/GameHelper'
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
      playersNumbers: [
        LOCATION.PLAYER1,
        LOCATION.PLAYER2,
        LOCATION.PLAYER3,
        LOCATION.PLAYER4
      ]
    }
  }
}

</script>
