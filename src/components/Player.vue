<template>
  <div class="player" v-bind:class="{'player-active-turn': isPlayerTurn}">
    <b class="player-name">{{ playerNumber }}</b>
    <div class="container" v-if="playerNumber==='player1'">
      <card v-for="card in playerHand" class="card-container player-card" :card="card" v-on:click.native="playCard(card)"/>
      <div id='col' class="colour-picker" v-if="chooseColourGuiOpen">
        <div class="colour-selection Red"  v-on:click="makeRed"></div>
        <div class="colour-selection Yellow"  v-on:click="makeYellow"></div>
        <div class="colour-selection Green"  v-on:click="makeGreen"></div>
        <div class="colour-selection Blue"  v-on:click="makeBlue"></div>
      </div>
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

  data () {
    return {
      chooseColour: false,
      storeCard: null,
      storePlayer: 0
    }
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
    },

    isPlayerTurn () {
      return this.currentPlayer.id === this.playerNumber
    },

    chooseColourGuiOpen () {
      if (this.storePlayer !== this.currentPlayer.id) {
        this.chooseColour = false
        return false
      }
      return this.chooseColour
    }

  },

  methods: {

    ...mapActions([
      'playCardAction',
      'drawCardAction',
      'switchDirectionAction',
      'attackStackAction',
      'jumpAction',
      'additionalTurnAction',
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
      if (this.currentPlayer.id !== this.playerNumber) {
        console.log('not your turn')
        return
      }
      if (this.checkLegalMove(card)) {
        console.log('you played card ' + card.color + '-' + card.secondary)
        this.processCardEffect(card)
        if (!this.chooseColour) {
          this.playCardAction([card, this.playerNumber])
          this.endCurrentTurn()
          console.log('ending current turn')
        }
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
            this.storeCard = card
            this.storePlayer = this.playerNumber
            this.chooseColour = true
          }
          break
        case SECONDARY.ADDITIONAL_TURN:
          this.additionalTurnAction()
          break
        case SECONDARY.SINGLE_ATTACK:
        case SECONDARY.DOUBLE_ATTACK:
          this.attackStackAction(card)
          break
        case SECONDARY.JUMP:
          this.jumpAction()
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
    },

    makeRed () {
      this.changeColourAction(COLOR.RED)
      this.chooseColour = false
      this.playCardAction([this.storeCard, this.playerNumber])
      this.endCurrentTurn()
      console.log('ending current turn')
    },

    makeYellow () {
      this.changeColourAction(COLOR.YELLOW)
      this.chooseColour = false
      this.playCardAction([this.storeCard, this.playerNumber])
      this.endCurrentTurn()
      console.log('ending current turn')
    },

    makeGreen () {
      this.changeColourAction(COLOR.GREEN)
      this.chooseColour = false
      this.playCardAction([this.storeCard, this.playerNumber])
      this.endCurrentTurn()
      console.log('ending current turn')
    },

    makeBlue () {
      this.changeColourAction(COLOR.BLUE)
      this.chooseColour = false
      this.playCardAction([this.storeCard, this.playerNumber])
      this.endCurrentTurn()
      console.log('ending current turn')
    }
  }
}
</script>

<style>
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

.colour-picker {
  border: 2px solid;
  border-radius: 50px;
  position: absolute;
  height: 200%;
  width: 100%;
  bottom: 50%;
  z-index: 2;
  background-image: url('../../static/background.png');
  opacity: 0.9;
  overflow: hidden;
}

.colour-selection {
  float: left;
  width: 50%;
  height: 50%;
  background-size: contain;
  background-position: center; 
  background-repeat: no-repeat;
}

.Red {
  background-image: url('../../static/cardcirclered.png');
}

.Yellow {
  background-image: url('../../static/cardcircleyellow.png');
}

.Green {
  background-image: url('../../static/cardcirclegreen.png');
}

.Blue {
  background-image: url('../../static/cardcircleblue.png');
}

.Red:active {
  background-color: rgba(243,67,84,0.3);
}

.Yellow:active {
  background-color: rgba(244,186,83,0.3);
}

.Green:active {
  background-color: rgba(92,239,71,0.3);
}

.Blue:active {
  background-color: rgba(74,205,239,0.3);
}

</style>
