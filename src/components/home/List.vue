<template>
	<section class="container topic-list">
		<ul class="media-list">
		<li class="media" v-for="topic of topics">
			<div class="media-left">
				<a href="">
					<img src="../../assets/images/xs2.jpg" class="media-object" width="70" height="40" alt="">
				</a>
			</div>
			<div class="media-body">
				<h4 class="media-heading">
					<router-link
						:to="{ name: 'topicShow', params: { id: topic.id } }"
					>
						{{topic.title}}
					</router-link>
				</h4>
				<p>sueysok 回复了问题 · 2人关注 · 一个回复 · 187次浏览 · 2017-10-20 13:45</p>
			</div>
		</li>
		</ul>
		<pagination
			:page-size="pageSize"
			:total="totalCount"
			:current-page="currentPage"
			@current-change="handleCurrentChange"
		>
		</pagination>
	</section>
</template>
<script>
import pagination from '../common/cdw-pagination.vue'
import axios from 'axios'
  export default {
    data () {
      return {
        topics: null,
        totalCount: 32,
        currentPage: 1,
        pageSize: 5
      }
    },
    async created () {
    	this.totalCount = (await axios.get(`/api/topics/num`)).data.length
    	console.log(this.totalCount)
    	this.handleCurrentChange(1)
    },
    methods: {
    	async handleCurrentChange (page) {
    		this.topics = (await axios.get(`/api/topics?_page=${page}&_limit=${this.pageSize}`)).data
    	}
    },
    components: {
    	pagination
    }
  }
</script>

<style scoped>
  
</style>