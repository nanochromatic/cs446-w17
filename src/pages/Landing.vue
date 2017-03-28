<template>
  <div class="screen landing">
    <img class="logo" :src="'static/logo' + player.theme + '.png'">
    <h1>Welcome to Quova, {{ playerName }}</h1>

    <div class="player-name">
      <label for="name" class="player-name__label">Enter your name:</label>
      <input type="text" id="name" v-model="playerName" placeholder="Your Name" class="player-name__input">
    </div>

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

.player-name {
  font-size: 2em;
}
.player-name__label {}
.player-name__input {
  border: none;
  border-bottom: 2px solid #fff;
  padding-top: .25em;
  font-size: 1em;
  color: #fff;
  background: none;
}
</style>
