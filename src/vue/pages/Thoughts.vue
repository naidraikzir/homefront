<style lang="sass" scoped>
section {
	height: 10em;
}

h3 {
	margin: 0;
}

.separator {
	margin: 1.5em 0;
}
</style>

<template lang="pug">
div
	home-header(:show="header")
	transition(name="fade")
		section(v-if="loading")
			loading
	transition-group(
		name="stagger",
		tag="article",
		@before-enter="thoughtsBefore",
		@enter="thoughtsEnter",
		@leave="thoughtsLeave")
		div(
			v-for="(thought, key, index) in thoughts",
			:key="key",
			:data-index="index")
			.separator(v-if="index > 0") ———
			router-link(:to="{ name: 'thought', params: { slug: key } }")
				h3 {{ thought.title }}
			em {{ format(thought.published_at) }}
</template>

<script>
import anime from 'animejs'
import format from 'date-fns/format'
import loading from 'js/mixins/loading'
import HomeHeader from 'vue/partials/HomeHeader'

export default {
	name: 'Thoughts',
	mixins: [ loading ],
	components: { HomeHeader },

	data () {
		return {
			thoughts: [],
			header: false,
			pagination: {
				current_page: 2,
				last_page: 3
			}
		}
	},

	mounted () {
		this.header = true
		this.fetch()
	},

	beforeRouteLeave (to, from, next) {
		this.header = false
		this.thoughts = []

		setTimeout(() => {
			next()
		}, 1000)
	},

	methods: {
		fetch () {
			this.loading = true
			this.$firebaseDB.ref('thoughts').once('value')
				.then((snapshot) => {
					setTimeout(() => {
						this.thoughts = snapshot.val()
					}, 300)
					this.loading = false
				})
		},
		thoughtsBefore (el) {
			el.style.opacity = 0
			el.style.transform = 'translateX(-20em)'
		},
		thoughtsEnter (el, done) {
			anime({
				targets: el,
				opacity: 1,
				translateX: 0,
				duration: 1000,
				delay: (el.dataset.index + 1) * 10,
				complete: done
			}).play()
		},
		thoughtsLeave (el, done) {
			anime({
				targets: el,
				opacity: 0,
				translateX: '1em',
				duration: 1000,
				delay: (el.dataset.index + 1) * 10,
				complete: done
			}).play()
		},
		format (date) {
			return format(date, 'MMMM, Do YYYY')
		}
	}
}
</script>
