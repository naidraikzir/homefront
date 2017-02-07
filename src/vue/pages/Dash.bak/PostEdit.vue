<template lang="pug">
post-form(
	:edit="true",
	@save="update")
</template>

<script>
import PostForm from './PostForm'

export default {
	name: 'EditPost',
	components: { PostForm },

	methods: {
		update (temp) {
			this.$http.put(`/posts/${temp.id}`, temp).then(response => {
				this.$router.push({ name: 'dash posts' })
			}, error => console.log(error.data))
		}
	}
}
</script>
