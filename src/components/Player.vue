<template>
  <div>
    <b>Player {{ playerNumber }}</b>
    <card v-for="card in playerHand" :card="card" />
  </div>
</template>

<script>
import Card from './Card'
import { SECONDARY, SHAPES } from '../js/GameHelper'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    playerNumber: {
      type: Number,
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
        case 1: return this.playerOneHand
        case 2: return this.playerTwoHand
        case 3: return this.playerThreeHand
        case 4: return this.playerFourHand
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
        this.playCardAction(card, this.playerNumber)
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
      // player can match the shape
      if (card.secondary === lastSecondary) {
        if (SHAPES.includes(card.secondary) && SHAPES.includes(lastSecondary)) {
          return true
        }
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