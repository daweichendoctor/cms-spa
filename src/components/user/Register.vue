<template>
    <div class="main">
        <div class="header">
          <a href="/">
              <img src="../../assets/images/xs1.jpg" alt="" width="150">
          </a>
          <h1>用户注册</h1>
        </div>
        <form id="register_form" method="post" @submit.prevent="register">
          <div class="form-group">
            <label for="">邮箱</label><span  style="color: red; font-size: 18px" v-if="emailMessage">邮箱已存在</span>
            <input type="email" class="form-control email"
            v-model="formData.email"
            @input="checkEmail"
            autofocus required>
          </div>
          <div class="form-group">
            <label for="">昵称</label><span  style="color: red; font-size: 18px" v-if="nameMessage">昵称已存在</span>
            <input type="text" class="form-control nickname" 
            v-model="formData.username"
            @input="checkName"
            maxlength="20" minlength="2" required >
          </div>
          <div class="form-group">
            <label for="">密码</label>
            <a href="" class="pull-right"></a>
            <input type="password" class="form-control"
            v-model="formData.password"
            minlength="6" maxlength="18" required>
          </div>
          <button type="submit" class="btn btn-block btn-success">注册</button>
        </form>
        <div class="message">
            <p>已有账号？<a href="#/login">点击登录</a> <a class="pull-right" href="/">返回首页</a></p>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import _ from 'lodash'
  export default {
    data () {
      return {
        formData: {
          username: '',
          email: '',
          password: ''
        },
        nameMessage: false,
        emailMessage: false
      }
    },
    methods: {
      async register () {
        if (await this.checkEmail()) { return }
        if (await this.checkName()) { return }
        const ret = await axios.post('/api/users', this.formData)
        window.alert('Register success')
        this.$router.push('/')
      },
      checkName: _.debounce(async function () {
        const {data} = await axios.get(`/api/users?username=${this.formData.username}`)
        this.nameMessage = data[0]? true:false
        return this.nameMessage
      }, 500),
      checkEmail: _.debounce(async function () {
        const { data } = await axios.get(`/api/users?email=${this.formData.email}`)
        this.emailMessage = data[0]? true: false
        return this.emailMessage
      }, 500)
    },
    components: {
      
    }
  }
</script>

<style scoped>

.main {
  width: 340px;
  margin: 0 auto;
  margin-top: 50px;
  color: #333;
}

.main .header {
  text-align: center;
}

.main .header h1 {
  font-size: 26px;
}

.main form {
  padding: 20px;
  margin-bottom: 15px;
  border:1px solid #ccc;
  border-radius: 5px;
 er-color: #ccc;
}
.main .message {
  padding: 10px;
  padding-bottom: 0;
  border:1px solid #d8dee2;
  border-radius: 5px;
}
</style>