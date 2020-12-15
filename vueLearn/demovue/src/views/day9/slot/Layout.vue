<template>
    <div>
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="body">
            <slot></slot>
        </div>
        <div class="footer">
            <slot name="footer" :fc="footerContent" :nowDay="new Date().getDay()"></slot>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      remark: [
        '上班日',
        '打工人，打工魂',
        '打工人是人上人',
        '打工干饭我最强',
        '再坚持1天',
        '加班人，加班魂',
        '宇宙不重启，我们不休息'
      ]
    }
  },
  computed: {
    footerContent () {
      return this.remark[new Date().getDay() - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        height: 50px;
        background: lightgreen;
    }
    .footer {
        width: 100%;
        height: 30px;
        background: lightpink;
    }
</style>
