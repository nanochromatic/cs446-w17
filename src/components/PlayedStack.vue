<template>
  <div class="played-stack">
    <transition name="played">
      <card :card="lastCardPlayed" />
    </transition>
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
    ]),

    reverse: function () {
      return this.playedStackDeck.reverse()
    }
  },

  methods: {
  }

}
</script>

<style scoped>
.played-stack {
  width: 20%;
  height: 100%;
  margin-right: 5%;
}

.played-enter-active,
.played-leave-active {
  transition: all .3s ease-in;
  transform: scale(1);
  opacity: 1;
}
.played-enter,
.played-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
