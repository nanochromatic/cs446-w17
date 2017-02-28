<template>
  <div>
    <b v-on:click="drawCard(card)">{{ playerNumber }}</b>
    <div class="container" v-if="playerNumber==='player1'">
      <card v-for="card in playerHand" class="card-container player-card" :card="card" v-on:click.native="playCard(card)"/>
    </div>
    <div class="container" v-else>
      <card v-for="card in playerHand" class="card-container" :card="card" :show='false'/>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import { LOCATION, SECONDARY, COLOR } from '../js/GameHelper'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    playerNumber: {
      type: String,
      required: true
    }
  },

  watch: {
    cpuBoardAction: function (oldVal, newVal) {
      if (this.cpuBoardAction === this.playerNumber) {
        this.botPlayCard()
      }
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
      'cpuBoardAction',
      'lastColour'
    ]),

    playerHand () {
      switch (this.playerNumber) {
        case LOCATION.PLAYER1: return this.playerOneHand
        case LOCATION.PLAYER2: return this.playerTwoHand
        case LOCATION.PLAYER3: return this.playerThreeHand
        case LOCATION.PLAYER4: return this.playerFourHand
        default: []
      }
    }
  },

  methods: {

    ...mapActions([
      'playCardAction',
      'drawCardAction',
      'switchDirectionAction',
      'attackStackAction',
      'changeColourAction'
    ]),

    ...mapMutations([
      'endCurrentTurn'
    ]),

    drawCard: function () {
      // passing a turn = drawing a card
      this.drawCardAction(this.playerNumber)
      // If there was an attack, this ends the attacks and draws the appropriate amount of cards.
    },

    botPlayCard: function () {
      // Check each card and see if it can be played, if none are playable
      //  draw a card
      var hand = this.playerHand
      for (var i = 0; i < hand.length; i++) {
        if (this.checkLegalMove(hand[i])) {
          console.log(this.playerNumber + ' played card ' + hand[i].color + '-' + hand[i].secondary)
          this.processCardEffect(hand[i])
          this.playCardAction([hand[i], this.playerNumber])
          this.endCurrentTurn()
          return
        }
      }
      // No valid moves for the bot
      console.log('No valid moves for bot, drawing card')
      this.drawCard()
      this.endCurrentTurn()
    },

    playCard: function (card) {
      if (this.checkLegalMove(card)) {
        console.log('you played card ' + card.color + '-' + card.secondary)
        this.processCardEffect(card)
        this.playCardAction([card, this.playerNumber])
        this.endCurrentTurn()
        console.log('ending current turn')
      } else {
        console.log('illegal move')
      }
    },

    checkLegalMove: function (card) {
      var lastColor = this.lastColour
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
      // alwasy keep the current colour up to date
      this.changeColourAction(card.color)

      var effect = card.secondary
      switch (effect) {
        case SECONDARY.REVERSE:
          this.switchDirectionAction()
          break
        case SECONDARY.CHANGE_COLOR:
          // if its a bot, colour could be chosen randomly
          if (this.currentPlayer.type === 'cpu') {
            switch (Math.floor(Math.random() * 4)) {
              case 0:
                this.changeColourAction(COLOR.RED)
                break
              case 1:
                this.changeColourAction(COLOR.GREEN)
                break
              case 2:
                this.changeColourAction(COLOR.BLUE)
                break
              case 3:
                this.changeColourAction(COLOR.YELLOW)
                break
            }
          } else {
            // process UI which asks user for a colour
            // for testing lets always set the colour to red
            this.changeColourAction(COLOR.RED)
          }
          break
        case SECONDARY.ADDITIONAL_TURN:
          break
        case SECONDARY.SINGLE_ATTACK:
        case SECONDARY.DOUBLE_ATTACK:
          this.attackStackAction(card)
          break
        case SECONDARY.SPECIAL1:
          break
        case SECONDARY.SPECIAL2:
          break
        case SECONDARY.SPECIAL3:
          break
        case SECONDARY.SPECIAL4:
          break
      }
    }
  }
}
</script>

<style>

.container {
  display: -webkit-inline-flex;
  max-width: 50%;
  margin: 0 auto;
}

.card-container {
  -webkit-flex: 1 1 100px;
  flex: 1 1 100px;
  overflow: visible;
}

.card-container:last-child {
  -webkit-flex: 0 0 100px;
  flex: 0 0 100px;
}

.player-card:hover {
  display: relative;
  top: -5px;
  z-index: 2;
}

</style>
