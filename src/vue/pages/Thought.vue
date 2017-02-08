<style lang="sass" scoped>
section {
	height: 10em;
}

.head {
	text-align: center;
}
</style>

<template lang="pug">
div
	home-header(:show="header")
	transition(name="fade")
		section(v-if="loading")
			loading
	transition(
		@before-enter="titleBefore",
		@enter="enter",
		@leave="titleLeave")
		article.head(v-if="post")
			h2 {{ post.title }}
			em {{ format(post.published_at, 'MMMM, Do YYYY') }}
	transition(
		@before-enter="contentBefore",
		@enter="enter",
		@leave="contentLeave")
		article(v-if="post")
			mark-view(:content="post.content")
</template>

<script>
import anime from 'animejs'
import format from 'date-fns/format'
import loading from 'js/mixins/loading'
import Logo from 'vue/components/Logo'
import MarkView from 'vue/components/MarkView'
import HomeHeader from 'vue/partials/HomeHeader'

import post from 'json/2017_01_31'

export default {
	name: 'Thought',
	mixins: [ loading ],
	components: { Logo, MarkView, HomeHeader },

	data () {
		return {
			header: false,
			post: null
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
		this.post = null

		setTimeout(() => {
			next()
		}, 1000)
	},

	methods: {
		fetch () {
			return new Promise(resolve => {
				setTimeout(() => {
					this.post = post
					resolve()
				}, 1000)
			})
		},
		titleBefore (el) {
			el.style.opacity = 0
			el.style.transform = 'translateY(-20em)'
		},
		contentBefore (el) {
			el.style.opacity = 0
			el.style.transform = 'translateY(20em)'
		},
		enter (el, done) {
			anime({
				targets: el,
				opacity: 1,
				translateY: 0,
				duration: 2000,
				delay: 500,
				complete: done
			}).play()
		},
		titleLeave (el, done) {
			anime({
				targets: el,
				opacity: 0,
				translateY: '-10em',
				duration: 2000,
				complete: done
			}).play()
		},
		contentLeave (el, done) {
			anime({
				targets: el,
				opacity: 0,
				translateY: '10em',
				duration: 2000,
				complete: done
			}).play()
		},
		format
	}
}
</script>
