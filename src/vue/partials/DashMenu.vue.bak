<template lang="pug">
.dash-menu
	router-link.menu-item(
		v-for="menu in menus",
		:to="{ name: menu.name }") {{ menu.text }}
</template>

<script>
export default {
	name: 'DashMenu',

	data () {
		return {
			menus: [
				{ name: 'dash main', text: 'Dashboard' },
				{ name: 'dash posts', text: 'Posts' },
				{ name: 'dash projects', text: 'Projects' },
				{ name: 'dash categories', text: 'Categories' },
				{ name: 'dash tags', text: 'Tags' },
				{ name: 'dash medias', text: 'Media' },
			]
		}
	}
}
</script>
