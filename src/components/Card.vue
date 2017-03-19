<template>
  <div class="card" v-bind:class="['card--'+card.color]">
  <template v-if="show === true">
  	<img class="back-frame" :src="'static/cardframe'+card.color+'.png'"/>
  	<img class="card-icon" :src="'static/card'+card.secondary+card.color+'.png'"/>
  </template>
	<img v-else class="back-frame" src="static/cardframeback.png"/>
  </div>
</template>

<script>
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
    },
    show: {
      type: Boolean,
      default () {
        return true
      }
    }
  }
}
</script>

<style>
.card {
  position: relative;
  height: 100%;
  max-width: 20%;
}

.back-frame {
  position: absolute;
    top: 0;
    left: 0;
  height: 100%;
}

.card-icon {
  position: absolute;
    top: 0;
    left: 0;
  height: 100%;
}

</style>

