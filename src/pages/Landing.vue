<template>
  <div class="screen landing">
    <img class="logo" src="static/logo.png">
    <h1>{{ msg }}</h1>
    <p class="options">
      <router-link to="/sp">Single Player</router-link> or <router-link to="/mp">Multiplayer</router-link>
    </p>
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
.logo {
  max-height: 60%;
}
h1, h2 {
  margin: 0;
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
  color: #fff;
  font-size: 2em;
}

</style>
