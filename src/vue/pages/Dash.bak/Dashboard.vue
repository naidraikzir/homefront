<template lang="pug">
.dashboard
	dash-nav
	.dash-main(@click="toggleDashMenu(false)")
		dash-menu
		transition(name="to-right", mode="out-in")
			router-view
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DashMenu from 'vue/partials/DashMenu'
import DashNav from 'vue/partials/DashNav'

export default {
	name: 'Dashboard',
	components: { DashMenu, DashNav },

	computed: {
		...mapGetters(['menu'])
	},

	methods: {
		...mapActions(['toggleDashMenu'])
	}
}	
</script>
