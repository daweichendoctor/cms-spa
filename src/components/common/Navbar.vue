<template>
    <nav class="navbar navbar-default">
      <div class="container">    
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"  aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">
            <img height="50" style="margin-top: -15px" src="../../assets/images/xs_brand.png" alt="">
          </a>
        </div>
        <div class="collapse navbar-collapse" id="  bs-example-navbar-collapse-1">
          <form class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
          </form>
          <ul class="nav navbar-nav navbar-right">
            <template v-if="isLogin">
              <a class="btn btn-default navbar-btn btn-success" href="#/topic/new">发起</a>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                  role="button" aria-haspopup="true" aria-expanded="false">
                  <img width="20" height="20" src="../../assets/images/xs_brand.png" alt="">
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li class="dropdown-current-user">
                    <p style="text-align: center">用户名: {{username}}</p>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li><a href="#">个人主页</a></li>
                  <li><a href="/settings/profile">设置</a></li>
                  <li><a @click="logout" href="/">退出</a></li>
                </ul>
              </li>
            </template>
            <template v-else>
              <a class="btn btn-primary navbar-btn" href="#/login">登录</a>
              <a class="btn btn-success navbar-btn" href="#/register">注册</a>
            </template>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        username: ''
      }
    },
    async created () {
      try {
        this.username = (await axios.get('/api/session')).data.username
      } catch (err) {

      }
    },
    methods: {
      async logout () {
        try {
          const { data: user } = await axios.delete('api/session')

        } catch (err) {

        }
      }
    },
    components: {
      
    },
    props: ['isLogin']
  }
</script>

<style scoped>
  
</style>
