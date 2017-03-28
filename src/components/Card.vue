<template>
  <div class="card" v-bind:class="['card--'+card.location]">
  <template v-if="show === true">
  	<img class="back-frame" :src="'static/cardframe'+card.color+theme+'.png'"/>
  	<img class="card-icon" :src="'static/card'+card.secondary+card.color+theme+'.png'"/>
  </template>
	<img v-else class="back-frame" :src="'static/cardframeback'+theme+'.png'"/>
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
    },
    theme: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style>
.card {
  position: relative;
  width: 100%;
  height: 100%;
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

