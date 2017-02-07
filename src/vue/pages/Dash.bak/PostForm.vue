<style lang="sass" scoped>
@import
	'../../../sass/variables',
	'../../../sass/mixins';

.full {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 50px;
	overflow-y: auto;
	max-width: initial;
	background: $purple;
	background-image: radial-gradient(circle at top center, $pink 0%, $purple 100%);
	transform-origin: top;
	z-index: 2;

	@include breakpoint('md') {
		bottom: 0;
		top: 50px;
	}
}

input {
	border-bottom-right-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}

textarea {
	border-top-right-radius: 0 !important;
	border-top-left-radius: 0 !important;
}

input,
textarea {
	background: none;
}
</style>

<template lang="pug">
.post-form
	.fixed.right-0.z3
		button(@click="focusMode = !focusMode") ⤧
		button(@click="preview = !preview") 👓
		router-link(:to="{ name: 'dash posts' }", tag="button") Cancel
		button(@click="save") Save
	
	article
		label Category
		select(v-model="temp.category_id", placeholder="Category")
			option(value="1") Uncategorized
			option(v-for="category in categories", :value="category.id") {{ category.name }}

	div(:class="{ 'full': focusMode }")
		article(v-show="!preview")
			input(type="text", v-model="temp.title", placeholder="Title")
			textarea(
				v-model="temp.content",
				placeholder="Content (Write in Markdown)",
				ref="content",
				v-auto-resize="")
		article(v-show="preview")
			h2 {{ temp.title }}
			mark-view(:content="temp.content")
</template>

<script>
import anime from 'animejs'
import MarkView from 'vue/components/MarkView'

export default {
	name: 'PostForm',
	components: { MarkView },

	props: {
		edit: {
			type: Boolean,
			default: false
		}
	},

	data () {
		return {
			categories: [],
			focusMode: false,
			preview: false,
			temp: {
				id: null,
				category_id: 1,
				title: '',
				content: ''
			}
		}
	},

	mounted () {
		this.fetchCategories()
			.then(() => {
				if (this.edit) this.fetch()
			})
	},

	methods: {
		fetchCategories () {
			return new Promise(resolve => {
				this.$http.get('/categories').then(response => {
					this.categories = response.data
					resolve()
				}, error => console.log(error.data))
			})
		},
		fetch () {
			return new Promise(resolve => {
				this.$http.get(`/posts/${this.$route.params.id}/edit`).then(response => {
					this.temp = response.data
					setTimeout(() => {
						let el = this.$refs['content']
						el.style.height = `${el.scrollHeight}px`
					}, 10)
					resolve()
				}, error => console.log(error.data))
			})
		},
		save () {
			this.$emit('save', this.temp)
		},
	}
}
</script>
