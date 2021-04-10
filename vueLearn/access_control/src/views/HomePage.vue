<template>
  <div class="home">
    <access-tree></access-tree>
  </div>
</template>

<script>
import AccessTree from '@/components/AccessTree'
export default {
  name: 'Home',
  components: {
    AccessTree
  },
  data() {
    return {
      treeData: []
    }
  },
  methods: {

  },
  mounted () {

  },
}
</script>
