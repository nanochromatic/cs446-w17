<template>
  <div class="landing">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <button><router-link to="/sp">Single Player</router-link></button>
    <button><router-link to="/mp">Multiplayer</router-link></button>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
      msg: 'Welcome to Quova'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
