<template>
  <div class="card" v-bind:class="['card--'+card.color]">
    Card - {{ card.secondary }}
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  props: {
    card: {
      type: Object,
      default () {
        return {
          color: 'red',
          secondary: 'moon',
          location: ''
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../scss/app.scss";

.card {

}

.card--red {
  color: $card-color--red;
}

.card--green {
  color: $card-color--green;
}

.card--blue {
  color: $card-color--blue;
}

.card--yellow {
  color: $card-color--yellow;
}
</style>

