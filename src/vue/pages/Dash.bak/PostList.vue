<template lang="pug">
.p2
	router-link(:to="{ name: 'write post' }", tag="button") Write Post

	ul
		li(v-for="post in posts")
			router-link(:to="{ name: 'edit post', params: { id: post.id } }") {{ post.title }}
</template>

<script>
export default {
	name: 'PostList',

	data () {
		return {
			posts: []
		}
	},

	mounted () {
		this.fetch()
	},

	methods: {
		fetch () {
			return new Promise(resolve => {
				this.$http.get('/posts').then(response => {
					this.posts = response.data
				}, error => console.log(error.data))
			})
		}
	}
}
</script>
