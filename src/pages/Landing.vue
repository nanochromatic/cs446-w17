<template>
  <div class="screen landing">
    <img src="static/logo.png">
    <h1>{{ msg }}</h1>
    <router-link to="/sp">Single Player</router-link>
    <router-link to="/mp">Multiplayer</router-link>
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
  color: #fff;
}

@media screen and (orientation: portrait) {
  h1::after {
    content: ' [Portrait]';
  }
}

@media screen and (orientation: landscape) {
  h1::after {
    content: ' [Landscape]';
  }
}

</style>
