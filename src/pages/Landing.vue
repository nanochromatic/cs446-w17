<template>
  <div class="screen landing">
    <img class="logo" :src="'static/logo' + player.theme + '.png'">
    <h1>Welcome to Quova, <input type="text" id="name" v-model="playerName" placeholder="Your Name" class="player-name__input"></h1>
    <p class="options">
      <router-link to="/sp">Single Player</router-link> or <router-link to="/mp">Multiplayer</router-link>
    </p>
	<p v-on:click="changeTheme">Change Theme</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'landing',
  computed: {
    ...mapState([
      'player'
    ]),
    playerName: {
      get () {
        return this.player.name
      },
      set (newValue) {
        this.setPlayerName(newValue)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setPlayerName',
      'setPlayerTheme'
    ]),

    changeTheme () {
      if (this.player.theme === '') {
        this.setPlayerTheme('2')
      } else {
        this.setPlayerTheme('')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  max-height: 50%;
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
  text-decoration: none;
}

.player-name__input {
  width: 25vw;
  border: none;
  border-bottom: 2px solid #fff;
  border-radius: 0;
  padding-top: .25em;
  font-size: 1em;
  color: #fff;
  background: none;
}
</style>
