<style lang="sass" scoped>
a { color: white; }
</style>

<template lang="pug">
.dash-nav(:class="{ 'pulled-up': dashMenu, 'hidden': hide }", v-touch:swipeup="pullUp")
	nav
		a.h3.md-hide.lg-hide(@click.prevent.stop="toggleDashMenu(!dashMenu)") &#8673;
		transition(name="fade", mode="out-in")
			span.h3 {{ $route.meta.text }}
		a.h3(@click.prevent="logout") &#10157;
	dash-menu
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DashMenu from 'vue/partials/DashMenu'

export default {
	name: 'DashNav',
	components: { DashMenu },

	data () {
		return {
			hide: false,
			scrollPos: 0,
		}
	},

	computed: {
		...mapGetters(['dashMenu'])
	},

	mounted () {
		window.onscroll = () => {
			if (this.scrollPos < window.scrollY && document.body.clientWidth < 832) this.hide = true
			else this.hide = false
			this.scrollPos = window.scrollY
		}
	},

	methods: {
		logout () {
			this.$http.post('/logout').then(res => {
				this.setAuthState(false)
				this.$router.push({ path: res.data })
			}, err => console.log(err))
		},
		pullUp () {
			this.toggleDashMenu(true)
		},
		...mapActions(['toggleDashMenu', 'setAuthState'])
	}
}
</script>
