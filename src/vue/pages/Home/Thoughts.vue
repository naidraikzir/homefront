<template lang="pug">
div
	home-header(:show="header")
	transition(name="fade")
		article.vh100.flex.items-center(v-if="loading")
			loading
	transition-group(
		name="stagger",
		tag="article",
		@before-enter="postsBefore",
		@enter="postsEnter",
		@leave="postsLeave")
		div(
			v-for="(post, index) in posts",
			:key="post",
			:data-index="index")
			.my2(v-if="index > 0") ———
			router-link(:to="{ name: 'thought', params: { slug: post.slug } }")
				h3.m0 {{ post.title }}
			em {{ format(post.created_at, 'MMMM, Do YYYY') }}
	article
		pagination(:pagination="pagination")
</template>

<script>
import { mapGetters } from 'vuex'
import anime from 'animejs'
import format from 'date-fns/format'
import loading from 'js/mixins/loading'
import Pagination from 'vue/components/Pagination'
import HomeHeader from 'vue/partials/HomeHeader'

export default {
	name: 'Thoughts',
	mixins: [ loading ],
	components: { HomeHeader, Pagination },

	data () {
		return {
			header: false,
			posts: [],
			pagination: {
				current_page: 2,
				last_page: 3
			}
		}
	},

	mounted () {
		this.header = true
		this.loading = true
		
		setTimeout(() => {
			this.fetch()
				.then(() => {
					this.loading = false
				})
		}, 1500)
	},

	beforeRouteLeave (to, from, next) {
		this.header = false
		this.posts = []

		setTimeout(() => {
			next()
		}, 1000)
	},

	methods: {
		fetch () {
			return new Promise(resolve => {
				setTimeout(() => {
					for (let i = 0; i < 10; i++)
						this.posts.push({
							id: 1,
							title: 'Markdown',
							slug: 'markdown',
							created_at: '2017-01-31'
						})
					resolve()
				}, 1000)	
			})
		},
		postsBefore (el) {
			el.style.opacity = 0
			el.style.transform = 'translateX(-20em)'
		},
		postsEnter (el, done) {
			anime({
				targets: el,
				opacity: 1,
				translateX: 0,
				duration: 1000,
				delay: (el.dataset.index + 1) * 10,
				complete: done
			}).play()
		},
		postsLeave (el, done) {
			anime({
				targets: el,
				opacity: 0,
				translateX: '1em',
				duration: 1000,
				delay: (el.dataset.index + 1) * 10,
				complete: done
			}).play()
		},
		format
	}
}
</script>
