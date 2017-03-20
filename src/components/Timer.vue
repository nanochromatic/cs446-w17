<template>
  <div class="timer">
    Time for {{ name }}: <strong>{{ timerSeconds }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default () {
        return '[NAME]'
      }
    }
  },

  data () {
    return {
      MAX_TIME: 15,
      timerSeconds: this.MAX_TIME,
      timerInterval: null
    }
  },

  watch: {
    // When the name changes, that means we've switched to a new user
    name: function (name) {
      this.startTimer()
    }
  },

  methods: {
    resetTimer () {
      clearInterval(this.timerInterval)
      this.timerInterval = null
    },

    startTimer () {
      this.resetTimer()
      this.timerSeconds = this.MAX_TIME
      this.timerInterval = setInterval(this.tickTimer, 1000)
    },

    tickTimer () {
      this.timerSeconds--
      if (this.timerSeconds <= 0) {
        this.$emit('timeExpired')
        this.resetTimer()
        console.log('Out of time!')
      }
    }
  },

  mounted: function () {
    this.startTimer()
  },

  beforeDestroy: function () {
    this.resetTimer()
  }
}

</script>

<style scoped>
.timer {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 5vmin;
  z-index: 2;
}
</style>
