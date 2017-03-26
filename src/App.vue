<template>
  <div id="app" :class="'appTheme'+playerTheme">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'player'
    ]),
    playerTheme: {
      get () {
        return this.player.theme
      }
    }
  }
}
</script>

<style>
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

body {
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
}

.screen {
  position: relative;
  width: 100%;
  height: 100%;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.appTheme {
  background: #000 url(/static/background.jpg) center center no-repeat;
  background-size: cover;
}

.appTheme2 {
  background: #000 url(/static/background2.jpg) center center no-repeat;
  background-size: cover;
}
</style>
