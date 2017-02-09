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
		article.head(v-if="thought")
			h2 {{ thought.title }}
			em {{ format(thought.published_at, 'MMMM, Do YYYY') }}
	transition(
		@before-enter="contentBefore",
		@enter="enter",
		@leave="contentLeave")
		article(v-if="thought")
			mark-view(:content="thought.content")
</template>

<script>
import { mapGetters } from 'vuex'
import anime from 'animejs'
import format from 'date-fns/format'
import loading from 'js/mixins/loading'
import Logo from 'vue/components/Logo'
import MarkView from 'vue/components/MarkView'
import HomeHeader from 'vue/partials/HomeHeader'

export default {
	name: 'Thought',
	mixins: [ loading ],
	components: { Logo, MarkView, HomeHeader },

	data () {
		return {
			header: false,
			thought: null
		}
	},

	computed: {
		...mapGetters(['thoughts'])
	},

	mounted () {
		this.header = true
		this.loading = true
		
		setTimeout(() => {
			this.loading = false
		}, 1000)
		
		setTimeout(() => {
			this.thought = this.thoughts[0]
		}, 1500)
	},

	beforeRouteLeave (to, from, next) {
		this.header = false
		this.thought = null

		setTimeout(() => {
			next()
		}, 1000)
	},

	methods: {
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
