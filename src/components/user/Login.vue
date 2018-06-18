<template>
    <div class="main">
        <div class="header">
            <a href="/">
                <img src="../../assets/images/xs.jpg" alt="" width="150">
            </a>
            <h1>用户登录</h1>
        </div>
        <form  @submit.prevent="login">
            <div class="form-group">
                <label for="">邮箱</label>
                <input type="email" 
                class="form-control"
                 name="email"
                 v-model="formData.email"
                 autofocus required autocomplete>
            </div>
            <div class="form-group">
                <label for="">密码</label>
                <a href="" class="pull-right"></a>
                <input type="password"
                class="form-control"
                name="password"
                v-model="formData.password"
                required>
            </div>
            <div class="checkbox">
                <label for=""><input type="checkbox">记住我</label><span  style="color: red; font-size: 18px" v-if="loginMessage">{{loginMessage}}</span>
            </div>
            <button type="submit" class="btn btn-block btn-success">登录</button>
        </form>
        <div class="message">
            <p>没有账号？<a href="#/register">点击创建</a> <a href="/" class="pull-right">返回首页</a> </p>
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
            email: '',
            password: ''
        },
        loginMessage: ''
      }
    },
    methods: {
        login: _.debounce(async function () {
            try {
                const res = await axios.post('/api/session', this.formData)
                this.loginMessage = ''
                this.$router.back()
            } catch (err) {
                const {status} = err.response
                switch (status) {
                    case 404:
                    this.loginMessage = '登录失败 请重新登录'
                    break
                }

            }
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