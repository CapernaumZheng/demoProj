<template>
  <div class="home">
    <p @click="$store.commit('add')">counter: {{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter: {{$store.state.counter}}</p>
    <!-- <p>double counter: {{$store.getters.doubleCounter}}</p> -->
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
