<template>
	<section class="container">
		<div class="row">
			<div class="col-md-9">
				<article>
					<div class="markdown-header">
						<h1>{{ title }}</h1>
						<p>发布于几秒前 作者 cdw 1次浏览 来自 分享</p>
						<p v-if="isLoginUser">
							<router-link class="btn btn-danger"
							:to="{ name: 'topicEdit', params: { id: $route.params.id }}">编辑</router-link>
							<a class="btn btn-danger" @click="deleteTopicById($route.params.id)">删除</a>
						</p>
					</div>
					<hr>
					<div class="markdown-body">{{content}}</div>
				</article>
				<hr>
				<div class="comment" v-for="comment of comments">
					<div class="panel panel-default">
						<div class="panel-heading">
							<span>{{ comment.username }}</span>&nbsp;&nbsp;&nbsp;commented
							<span>{{comment.create_time}}</span>
							<span class="action">
								<a href=""><i class="glyphicon glyphicon-thumbs-up pull-right"></i></a>
								<a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
								<a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
							</span>
						</div>
						<div class="panel-body">
							{{ comment.content }}
						</div>
					</div>
				</div>
				<hr>
				<div class="comment-new">
					<form @submit.prevent="commentHandler">
						<div class="form-group">
							<label for="comment">添加评论</label>
							<textarea
								v-model="newComment"
								class="form-control"
								id="comment" cols="30"
								rows="5" required>
							</textarea>
						</div>
						<button type="submit" class="btn btn-success">提交</button>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        title: '',
        content: '',
        isLoginUser: false,
        newComment:'',
        comments: []
      }
    },
    methods: {
    	async loadTopicById (id) {
    		try {
   
    			const {data} = await axios.get(`/api/topics/${id}`)
    			this.title = data.title
    			this.content = data.content
    		} catch (err) {

    		}
    	},
    	async deleteTopicById (id) {
    		if (!window.confirm('Are you sure to delete?')) { return }
    		try {
    			await axios.delete(`/api/topics/${id}`)
    			this.$router.push('/')
    		} catch (err) {

    		}
    	},
    	async loadCommentsByTopicId( id) {
    		const {data: comments } = await axios.get(`/api/comments?topic_id=${id}`)
    		this.comments = comments
    		console.log(comments)
    	},
    	async commentHandler () {
    		try {
    			const { data: userSession } = await axios.get('/api/session')
    			let newComment = { topic_id: this.$route.params.id, content: this.newComment }
    			const { data } = await axios.post('/api/comments', newComment)
    			this.loadCommentsByTopicId(this.$route.params.id)
    		} catch (err) {
    			if (!window.confirm('未登录 请先登陆')) { return }
    			this.$router.push('/login')
    		}

    	}
    },
    created () {
    	const id = this.$route.params.id
    	this.loadTopicById(id)
    	this.loadCommentsByTopicId(id)
    },
    /*
    路由导航钩子 to 当前路由信息 from 从哪个组件导航过来的路由信息
    next 导航完成 渲染组件 参数vm 指组件实例
     */
    async beforeRouteEnter (to, from, next) {
    	try {
    		const {id} = to.params
    		const {data: topic} = await axios.get(`/api/topics/${id}`)
    		const {data: sessionUser} = await axios.get('/api/session')
    		next(vm => {
    			vm.isLoginUser = topic.user_id === sessionUser.id
    		})
    	} catch (err) {
    		next(vm => {
    			vm.isLoginUser = false
    		})
    	}
    },
    components: {
    }
  }
</script>

<style scoped>
  .markdown-body {
  	margin-top: 20px
  }
  .comment-new {
  	margin: 20px 0
  }
</style>