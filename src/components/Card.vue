<template>
  <div class="card" v-bind:class="['card--'+card.color]">
	<img class="back-frame" :src="'static/cardframe'+card.color+'.png'"/>
	<img v-if="show == true" class="card-icon" :src="'static/card'+card.secondary+card.color+'.png'"/>
	<img v-else class="back-frame" src="static/cardframeback.png"/>
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
  width: 100px;
  height: 150px;
}

.back-frame {
  position: absolute;
    top: 0;
    left: 0;
  width: 100px;
  height: 150px;
}

.card-icon {
  position: absolute;
    top: 0;
    left: 0;
  width: 100px;
  height: 150px;
}

</style>

