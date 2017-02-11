<template lang="pug">
div(v-html="parsed")
</template>

<script>
import marked from 'marked'

export default {
	name: 'MarkView',

	props: {
		content: {
			type: String,
			default: null
		}
	},

	computed: {
		parsed () {
			if (this.content) {
				return marked(this.content, {
					breaks: true
				})
			}
		}
	}
}
</script>
