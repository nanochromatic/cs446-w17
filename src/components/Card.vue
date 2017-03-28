<template>
  <div class="card" :class="['card--' + card.location]">
  <template v-if="show === true">
  	<img class="back-frame" :src="'static/cardframe' + card.color + player.theme + '.png'"/>
  	<img class="card-icon" :src="'static/card' + card.secondary + card.color + player.theme + '.png'"/>
  </template>
	<img v-else class="back-frame" :src="'static/cardframeback' + player.theme + '.png'"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  },
  computed: {
    ...mapState([
      'player'
    ])
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

