<template>
	<section class="container">
		<div class="row">
			<div class="col-md-5">
				<form @submit.prevent="patchTopic">
					<div class="form-group">
						<label for="exampleInputEmail">选择模板</label>
						<select class="form-control">
							<option >分享</option>
							<option >问答</option>
							<option >招聘</option>
							<option >客户端测试</option>
						</select>
					</div>
					<div class="form-group">
						<label for="title">标题</label>
						<input class="form-control" id="title" v-model="formData.title" required>
					</div>
					<div class="form-group">
						<label for="content">内容</label>
						<textarea class="form-control" rows="3" v-model="formData.content" required></textarea>
					</div>
					<button type="submit" class="btn btn-default btn-success">submit</button>

				</form>

			</div>
		</div>
	</section>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
        	title: '',
        	content: ''
        }
      }
    },
    created () {
    	this.loadTopicById(this.$route.params.id)
    },
    methods: {
    	async patchTopic () {
			try {
    			const data = (await axios.patch(`/api/topics/${this.$route.params.id}`, this.formData)).data
    			this.$router.push(`/topic/show/${data.id}`)
			} catch (err) {

			}
    	},
    	async loadTopicById (id) {
    		try {
    			const {data} = await axios.get(`/api/topics/${id}`)
    			this.formData.title = data.title
    			this.formData.content = data.content
    		} catch (err) {

    		}
    	}
    }
  }
</script>

<style scoped>
  
</style>