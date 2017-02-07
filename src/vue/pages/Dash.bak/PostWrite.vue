<template lang="pug">
post-form(@save="save")
</template>

<script>
import PostForm from './PostForm'

export default {
	name: 'WritePost',
	components: { PostForm },

	methods: {
		save (temp) {
			this.$http.post('/posts', temp).then(response => {
				this.$router.push({ name: 'dash posts' })
			}, error => console.log(error.data))
		}
	}
}
</script>
