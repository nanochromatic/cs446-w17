<template>
  <div class="player" v-bind:class="{'player-active-turn': isPlayerTurn}">
    <b class="player-name">{{ player.name}} - {{ player.location }}</b>
    <div class="container" v-if="player.location==='player1'">
      <card v-for="card in playerHand" class="card-container player-card" :card="card" v-on:click.native="playCard(card)"/>
    </div>
    <div class="container" v-else>
      <card v-for="card in playerHand" class="card-container" :card="card" :show='false'/>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import { COLOR, SECONDARY, LOCATION } from '../js/DeckHelper'
import { randomIntFromInterval } from '../js/GameHelper'
import { PLAYER_TYPE } from '../js/PlayerHelper'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    player: {
      type: Object,
      required: true
    }
  },

  components: {
    Card
  },

  computed: {
    ...mapGetters([
      'playerOneHand',
      'playerTwoHand',
      'playerThreeHand',
      'playerFourHand',
      'currentPlayer',
      'lastCardPlayed',
      'attackStatus',
      'lastColor'
    ]),

    playerHand () {
      switch (this.player.location) {
        case LOCATION.PLAYER1: return this.playerOneHand
        case LOCATION.PLAYER2: return this.playerTwoHand
        case LOCATION.PLAYER3: return this.playerThreeHand
        case LOCATION.PLAYER4: return this.playerFourHand
        default: []
      }
    },

    isPlayerTurn () {
      var isPlayerTurn = this.currentPlayer.location === this.player.location

      if (isPlayerTurn && this.player.type === PLAYER_TYPE.CPU) {
        var timeDelay = randomIntFromInterval(3, 4)
        console.log('delay:', timeDelay)
        setTimeout(this.botPlayCard, timeDelay * 1000)
      }

      return isPlayerTurn
    }

  },

  methods: {

    ...mapActions([
      'playCardAction',
      'drawCardAction',
      'cardEffectAction',
      'changeColorAction',
      'endTurnAction'
    ]),

    drawCard: function () {
      // passing a turn = drawing a card
      this.drawCardAction(this.player.location)
      // If there was an attack, this ends the attacks and draws the appropriate amount of cards.
    },

    botPlayCard: function () {
      // Check each card and see if it can be played, if none are playable draw a card
      var hand = this.playerHand
      for (var i = 0; i < hand.length; i++) {
        if (this.checkLegalMove(hand[i])) {
          console.log(this.player.location + ' played card ' + hand[i].color + '-' + hand[i].secondary)
          this.processCardEffect(hand[i])
          this.playCardAction([hand[i], this.player.location])
          this.endTurnAction()
          return
        }
      }
      // No valid moves for the bot
      console.log('No valid moves for bot, drawing card')
      this.drawCard()
      this.endTurnAction()
    },

    playCard: function (card) {
      if (this.currentPlayer.location !== this.player.location) {
        console.log('not your turn')
        return
      }
      if (this.checkLegalMove(card)) {
        console.log('you played card ' + card.color + '-' + card.secondary)
        this.playCardAction([card, this.player.location])
        this.processCardEffect(card)
        this.endTurnAction()
        console.log('ending current turn')
      } else {
        console.log('illegal move')
      }
    },

    checkLegalMove: function (card) {
      var lastColor = this.lastColor
      var lastSecondary = this.lastCardPlayed.secondary
      var singleAttack = SECONDARY.SINGLE_ATTACK
      var doubleAttack = SECONDARY.DOUBLE_ATTACK

      // If there is no attack stacked, then even if there was an attack card played last,
      // it has already been lost by someone else
      if (this.attackStatus) {
        // player must play a double attack card to counter a double attack card
        if (lastSecondary === doubleAttack) {
          if (card.secondary === doubleAttack) {
            return true
          }
          return false
        }

        // player can play a single or double attack card to counter a single attack card
        if (lastSecondary === singleAttack) {
          if (card.secondary === singleAttack || card.secondary === doubleAttack) {
            return true
          }
          return false
        }
      }

      // player can match the color of the previous card
      if (card.color === lastColor) {
        return true
      }
      // player can match the secondary type
      if (card.secondary === lastSecondary) {
        return true
      }
      return false
    },

    processCardEffect: function (card) {
      var effect = card.secondary
      switch (effect) {
        case SECONDARY.CHANGE_COLOR:
          // if its a bot, color could be chosen randomly
          if (this.currentPlayer.type === PLAYER_TYPE.CPU) {
            switch (Math.floor(Math.random() * 4)) {
              case 0:
                this.changeColorAction(COLOR.RED)
                break
              case 1:
                this.changeColorAction(COLOR.GREEN)
                break
              case 2:
                this.changeColorAction(COLOR.BLUE)
                break
              case 3:
                this.changeColorAction(COLOR.YELLOW)
                break
            }
          } else {
            // process UI which asks user for a color
            // for testing lets always set the color to red
            this.changeColorAction(COLOR.RED)
          }
          break
        case SECONDARY.REVERSE:
        case SECONDARY.ADDITIONAL_TURN:
        case SECONDARY.SINGLE_ATTACK:
        case SECONDARY.DOUBLE_ATTACK:
        case SECONDARY.JUMP:
        case SECONDARY.SPECIAL1:
        case SECONDARY.SPECIAL2:
        case SECONDARY.SPECIAL3:
        case SECONDARY.SPECIAL4:
          this.cardEffectAction(effect)
          break
      }
    }
  }
}
</script>

<style scoped>
.player-name {
  position: absolute;
  top: 10%;
  left: 50%;
  font-size: 3vmin;
  z-index: 2;
  transform: translateX(-50%);
}
.player1 .player-name {
  display: none;
}

.container {
  display: -webkit-inline-flex;
  display: inline-flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  -webkit-justify-content: center;
  transform: translate3d(0,-30%,0);
  transition: transform .5s;
}

.player1 .container {
  transform: translate3d(0,30%,0);
}

.player-active-turn .container {
  transform: translate3d(0,0,0);
}

.card-container {
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  overflow: visible;
}

.card-container:last-child {
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
}

.player-card:hover {
  display: relative;
  top: -5px;
  z-index: 2;
}

</style>
