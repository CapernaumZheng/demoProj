<template>
    <div>
        <kForm :model="userInfo" :rules="rules">
            <kFormItem label="用户名" prop="username">
                <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
            </kFormItem>
            <kFormItem label="密码" prop="password">
                <KInput type="password" v-model="userInfo.password" placeholder="请输入密码"></KInput>
            </kFormItem>
        </kForm>
    </div>
</template>

<script>
import KInput from './kInput.vue'
import kFormItem from './kFormItem.vue'
import kForm from './kForm.vue'
export default {
  components: {
    KInput,
    kFormItem,
    kForm
  },
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名称' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
