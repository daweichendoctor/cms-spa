<template>
<div>
  <navbar :isLogin="isLogin"></navbar>
  <router-view></router-view>
  <home-footer></home-footer>
</div>
</template>

<script>
import Navbar from '../common/Navbar.vue'
import Footer from '../common/Footer.vue'
import axios from 'axios'
  export default {
    data () {
      return {
        isLogin: false
      }
    },
    components: {
      Navbar,
      'home-footer': Footer
    },
    async beforeRouteEnter (to, from, next) {
      try {
        const {data: user} = await axios.get('/api/session')
        next( vm => {
          vm.isLogin = true
        })
      } catch (err) {
        next(vm => { vm.isLogin = false })
      }
    }
  }
</script>

<style scoped>
  
</style>
