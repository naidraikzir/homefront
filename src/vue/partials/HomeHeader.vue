<template lang="pug">
transition(
	@before-enter="before",
	@enter="enter",
	@leave="leave")
	.flex.justify-between.p2(v-if="show")
		router-link.border-none(:to="{ name: 'landing' }"): logo
		home-menu
</template>

<script>
import anime from 'animejs'
import Logo from 'vue/components/Logo'
import HomeMenu from './HomeMenu'

export default {
	name: 'HomeHeader',
	components: { HomeMenu, Logo },

	props: {
		show: Boolean
	},

	methods: {
		before (el) {
			el.style.opacity = 0
			el.style.transform = 'translateY(-4em)'
		},
		enter (el, done) {
			anime({
				targets: el,
				opacity: 1,
				translateY: 0,
				duration: 1500,
				complete: done
			}).play()
		},
		leave (el, done) {
			anime({
				targets: el,
				opacity: 0,
				translateY: '-2em',
				duration: 1500,
				complete: done
			}).play()
		},
	}
}
</script>
