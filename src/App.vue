<template>
  <div id="app">
    <ul is="transition-group">
      <li v-for="msg in messages" :key="msg['.key']">
        <span>{{ msg.from }}</b>: {{ msg.content }}</span>
      </li>
    </ul>

    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['messages']
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
