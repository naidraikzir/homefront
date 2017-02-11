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
		article.head(v-if="meta")
			h2 {{ meta.title }}
			em {{ format(meta.published_at) }}
	transition(
		@before-enter="contentBefore",
		@enter="enter",
		@leave="contentLeave")
		article(v-if="content")
			mark-view(:content="content")
</template>

<script>
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
			meta: null,
			content: null,
		}
	},

	mounted () {
		this.header = true
		this.fetch()
	},

	beforeRouteLeave (to, from, next) {
		this.header = false
		this.meta = null
		this.content = null

		setTimeout(() => {
			next()
		}, 1000)
	},

	methods: {
		fetch () {
			this.loading = true
			this.$firebaseDB.ref(`thoughts/${this.$route.params.slug}`)
				.once('value')
				.then(snapshot => {
					this.fetchContent(snapshot.val())
				})
		},
		fetchContent (meta) {
			this.$firebaseDB.ref(`thought/${this.$route.params.slug}`)
				.once('value')
				.then(snapshot => {
					setTimeout(() => {
						this.meta = meta
						this.content = snapshot.val().content
					}, 300)
					this.loading = false
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
		format (date) {
			return format(date, 'MMMM, Do YYYY')
		}
	}
}
</script>
