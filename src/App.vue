<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
  overflow: scroll; /* we will probably want to change this to none */
  -webkit-overflow-scrolling: touch;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background: #000 url(/static/background.png) center center no-repeat;
  background-size: cover;
}
</style>
