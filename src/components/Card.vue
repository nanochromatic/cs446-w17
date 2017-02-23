<template>
  <div class="container">
    <div class="card">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    cardType: {
      type: Object  // color, secondary
    },
    
  }
}
</script>
