<template>
  <div>
    <div class="container" v-if="playerNumber==='player1'">
      <card v-for="card in playerHand" class="card-container" :card="card" v-on:click.native="playCard(card)"/>
    </div>
    <div class="container" v-else>
      <card v-for="card in playerHand" class="card-container" :card="card" :show='false'/>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import { LOCATION, SECONDARY } from '../js/GameHelper'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    playerNumber: {
      type: String,
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
      'lastCardPlayed'
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
      'switchDirectionAction'
    ]),

    drawCard: function () {
      // passing a turn = drawing a card
      this.drawCardAction(this.playerNumber)
    },

    botPlayCard: function () {
      // check each card and see if it can be played, if none are playable
      //  draw a card
    },

    playCard: function (card) {
      if (this.checkLegalMove(card)) {
        this.processCardEffect(card)
        this.playCardAction([card, this.playerNumber])
      } else {
        console.log('illegal move')
      }
    },

    checkLegalMove: function (card) {
      var lastColor = this.lastCardPlayed.color
      var lastSecondary = this.lastCardPlayed.secondary
      var singleAttack = SECONDARY.SINGLE_ATTACK
      var doubleAttack = SECONDARY.DOUBLE_ATTACK
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
        case SECONDARY.REVERSE:
          this.switchDirectionAction()
          break
        case SECONDARY.CHANGE_COLOR:
          break
        case SECONDARY.ADDITIONAL_TURN:
          break
        case SECONDARY.SINGLE_ATTACK:
          break
        case SECONDARY.DOUBLE_ATTACK:
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

<style lang="scss">

.container {
  display: -webkit-inline-flex;
  width: 100%;
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

</style>
