<template>
  <div id="app">
    <ul is="transition-group">
      <li v-for="msg in messages" :key="msg['.key']">
        <span>{{ msg.from }}</b>: {{ msg.content }}</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['messages']
}
</script>

<style lang="scss">
@import "scss/app.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary;
  margin-top: 60px;
}
</style>
