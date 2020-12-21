<template>
    <div>
        <kForm :model="userInfo" :rules="rules" ref="loginForm">
            <kFormItem label="用户名" prop="username">
                <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
            </kFormItem>
            <kFormItem label="密码" prop="password">
                <KInput type="password" v-model="userInfo.password" placeholder="请输入密码"></KInput>
            </kFormItem>
            <kFormItem>
              <button @click="login">登录</button>
            </kFormItem>
        </kForm>
    </div>
</template>

<script>
import KInput from './kInput'
import kFormItem from './kFormItem'
import kForm from './kForm'
// import Notice from '../Notice'
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
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate(valid => {
        // if (valid) {
        // alert('submit')
        // const notice = this.$create(Notice, {
        // title: '登录弹窗信息',
        // message: valid ? '请求登录' : '校验失败',
        // duration: 1000
        // })
        // console.log('notice is>>>', notice)
        // notice.show()
        const notice = this.$notice({
          title: '登录弹窗信息',
          message: valid ? '请求登录' : '校验失败',
          duration: 1000
        })
        console.log('notice is>>>', notice)
        notice.show()
        // } else {
        // console.log('error login:>> ')
        // return false
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
