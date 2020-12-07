<template>
  <div id="app">
      <p class="title">{{ title }}</p>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      title: 'vue cli项目'
    }
  },
}
</script>

<style lang="scss" scoped>
#app {
  .title {
    color: blue;
  }
}
</style>
