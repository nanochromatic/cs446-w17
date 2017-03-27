<template>
  <div class="player" v-bind:class="{'player-active-turn': isPlayerTurn}">
    <b class="player-name">{{ player.name}}</b>
    <div class="container" v-if="player.id === devicePlayerId">
      <card v-for="card in playerHand" :key="card.id" class="card-container player-card" :card="card" v-on:click.native="playCard(card)"/>
      <div class="color-picker" v-if="chooseColor">
        <div class="color-selection red" v-on:click="setColor('red')"></div>
        <div class="color-selection yellow" v-on:click="setColor('yellow')"></div>
        <div class="color-selection green" v-on:click="setColor('green')"></div>
        <div class="color-selection blue" v-on:click="setColor('blue')"></div>
      </div>
    </div>
    <div class="container" v-else>
      <card v-for="card in playerHand" class="card-container" :card="card" :show='false'/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { COLOR, SECONDARY, LOCATION } from '../js/DeckHelper'
import { getPlayerId, randomIntFromInterval } from '../js/GameHelper'
import { PLAYER_TYPE, PLAYER_DIFFICULTY } from '../js/PlayerHelper'
import Card from './Card'

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

  data () {
    return {
      chooseColor: false
    }
  },

  computed: {
    ...mapState([
      'isGameController'
    ]),
    ...mapGetters([
      'drawStackDeck',
      'playerOneHand',
      'playerTwoHand',
      'playerThreeHand',
      'playerFourHand',
      'currentPlayer',
      'lastCardPlayed',
      'attackStatus',
      'lastColor'
    ]),

    devicePlayerId () {
      return getPlayerId()
    },

    playerHand () {
      var hand
      switch (this.player.location) {
        case LOCATION.PLAYER1: hand = this.playerOneHand; break
        case LOCATION.PLAYER2: hand = this.playerTwoHand; break
        case LOCATION.PLAYER3: hand = this.playerThreeHand; break
        case LOCATION.PLAYER4: hand = this.playerFourHand; break
        default: []
      }
      if (hand.length === 0) {
        this.setGameMessage(`Game Over: ${this.player.name} wins!`)
      }
      return hand
    },

    isPlayerTurn () {
      var isPlayerTurn = this.currentPlayer.location === this.player.location

      if (isPlayerTurn && this.player.type === PLAYER_TYPE.CPU && this.isGameController) {
        var timeDelay = randomIntFromInterval(3, 4)
        setTimeout(this.botPlayCard, timeDelay * 1000)
      }

      return isPlayerTurn
    }

  },

  methods: {

    ...mapActions([
      'playCardAction',
      'swapCardAction',
      'drawCardAction',
      'cardEffectAction',
      'changeColorAction',
      'endTurnAction',
      'setGameMessage'
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
          // On easy difficulty, the bot draws once and a while even when it has a valid card to play.
          // Vurrently set to a third of the time
          if (this.currentPlayer.difficulty === PLAYER_DIFFICULTY.EASY) {
            var dumbnessCheck = Math.floor(Math.random() * 3)
            if (dumbnessCheck === 0) {
              console.log('Bot is dumb, drawing card')
              this.drawCard()
              this.endTurnAction()
              return
            }
          }
          console.log(this.player.location + ' played card ' + hand[i].color + '-' + hand[i].secondary)
          this.processCardEffect(hand[i])
          this.playCardAction([hand[i], this.player.location])
          this.endTurnAction()
          return
        }
      }

      // If cpu is in impossible mode, after relizing that it has no valid cards in its hand,
      // it will swap its first card out for a valid card in the deck stack and play it
      if (this.currentPlayer.difficulty === PLAYER_DIFFICULTY.IMPOSSIBLE) {
        var pile = this.drawStackDeck
        for (var j = 0; j < pile.length; j++) {
          if (this.checkLegalMove(pile[j])) {
            var saveCard = pile[j]
            this.swapCardAction([hand[0], pile[j]])
            console.log('Clever bot: ' + this.player.location + ' played card ' + saveCard.color + '-' + saveCard.secondary)
            this.processCardEffect(saveCard)
            this.playCardAction([saveCard, this.player.location])
            this.endTurnAction()
            return
          }
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
        if (!this.chooseColor) {
          this.endTurnAction()
          console.log('ending current turn')
        }
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
            this.chooseColor = true
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
    },

    setColor (color) {
      this.changeColorAction(color)
      this.chooseColor = false
      this.endTurnAction()
      console.log('ending current turn (after choosing color)')
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
.bottom .player-name {
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

.bottom .container {
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

.color-picker {
  overflow: hidden;
  border: 2px solid #fff;
  border-radius: 50px;
  position: absolute;
  height: 60vh;
  width: 50vw;
  bottom: 20vh;
  background: rgba(0,0,0,.8);
  z-index: 2;
}

.color-selection {
  float: left;
  width: 50%;
  height: 50%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.red {
  background-image: url('../../static/chooseRed.png');
}

.yellow {
  background-image: url('../../static/chooseYellow.png');
}

.green {
  background-image: url('../../static/chooseGreen.png');
}

.blue {
  background-image: url('../../static/chooseBlue.png');
}

.red:active {
  background-color: rgba(243,67,84,0.3);
}

.yellow:active {
  background-color: rgba(244,186,83,0.3);
}

.green:active {
  background-color: rgba(92,239,71,0.3);
}

.blue:active {
  background-color: rgba(74,205,239,0.3);
}

</style>
