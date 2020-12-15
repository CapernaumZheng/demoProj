<template>
    <div>
        <h2>插槽</h2>
        <Layout>
            <!-- 具名插槽 -->
            <template v-slot:header>学个习</template>
            <!-- 匿名插槽 -->
            <template>页面内容</template>
            <!-- 作用域插槽 -->
            <!-- {fc}是对象的解构 -->
            <template v-slot:footer="{fc, nowDay}">今天周{{nowDay}}---{{fc}}</template>
            <!-- <template v-slot:footer="slotProps">
                今天周{{slotProps.nowDay}}---{{slotProps.fc}}
            </template> -->
        </Layout>
    </div>
</template>

<script>
import Layout from './Layout.vue'
export default {
  components: {
    Layout
  }
}
</script>

<style lang="scss" scoped>

</style>
