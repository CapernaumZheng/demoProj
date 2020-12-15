<template>
    <div class="father">
        <router-link to="/day9/day9params">组件传参部分</router-link> |
        <router-link to="/day9/day9slot">插槽部分</router-link> |
        <router-link to="/day9/day9kform">实现form组件</router-link>
        <router-view />
    </div>
</template>

<script>
export default {
  name: 'day9'
}
</script>

<style lang="scss" scoped>

</style>
