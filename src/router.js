import VueRouter from 'vue-router'
import Home from './components/home/Home.vue'
import HomeList from './components/home/List.vue'
import Login from './components//user/Login.vue'
import Register from './components/user/Register.vue'

import TopicNew from './components/topic/New.vue'
import topicShow from './components/topic/Show.vue'
import topicEdit from './components/topic/Edit.vue'

import Setting from './components/settings/Setting.vue'
import SessingProfile from './components/settings/Profile.vue'
import SessingAdmin from './components/settings/Admin.vue'
export default new VueRouter({
  routes: [
    {
    	path: '/',
    	component: Home,
    	children: [
    		{ path: '', component: HomeList },
    		{ path: '/topic/new', component: TopicNew },
    		{ path: '/topic/show/:id', component: topicShow, name: 'topicShow' },
    		{ path: '/topic/edit/:id', component: topicEdit, name: 'topicEdit' },
    		{
    			path: '/settings',
    			component: Setting,
    			children: [
    				{ path: '/settints/profile', component: SessingProfile },
    				{ path: '/settings/admin', component: SessingAdmin }
    			]
    		},
    	]
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
    
  ]
})
