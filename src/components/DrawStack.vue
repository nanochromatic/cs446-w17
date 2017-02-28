<template>
  <div class="drawStack">
    <b>Draw Stack</b>
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

<style lang="scss">

.drawStack {
  display: -webkit-inline-flex;
  display: inline-flex;
  width: 20%;
  float: right;
  height: 100%;
  margin-right: 30%;
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
