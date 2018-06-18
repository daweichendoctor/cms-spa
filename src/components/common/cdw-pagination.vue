<template>
	<nav aria-label="Page navigation">
		<ul class="pagination">
			<li>
				<a  aria-label="Previous" @click.prevent="previousChange">
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
			v-for="n in totalPage"
			:class="myCurrentPage === n ? 'active': ''">
				<a @click.prevent="currentChange(n)">{{n}}</a>
			</li>
			
			<li>
				<a  aria-label="Next" @click.prevent="nextChange">
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>
<script>
  export default {
    data () {
      return {
        myCurrentPage: this.currentPage
      }
    },
    methods: {
    	currentChange(n) {
    		this.myCurrentPage = n
    		this.$emit('current-change', this.myCurrentPage)
    	},
    	previousChange () {
    		this.myCurrentPage--
    		if(this.myCurrentPage < 1) { this.myCurrentPage = 1 }
    		if (this.myCurrentPage > this.totalPage) { this.myCurrentPage = this.totalPage }
    		this.$emit('current-change', this.myCurrentPage)
    	},
    	nextChange () {
    		this.myCurrentPage++
    		if(this.myCurrentPage < 1) { this.myCurrentPage = 1 }
    		if (this.myCurrentPage > this.totalPage) { this.myCurrentPage = this.totalPage }
    		this.$emit('current-change', this.myCurrentPage)
    	}
    },
    computed: {
    	totalPage () {
    		return Math.ceil(this.total / this.pageSize)
    	}
    },
    props: {
    	total: {
    		type: Number,
    		required: true
    	},
    	pageSize: {
    		type: Number,
    		required: true
    	},
    	currentPage: {
    		type: Number,
    		required: true
    	}
    }
  }
</script>

<style scoped>
  ul.pagination li a {
  	display: block;
  }
  ul.pagination li {
  	cursor: pointer;
  }
</style>