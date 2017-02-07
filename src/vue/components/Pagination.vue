<style lang="sass" scoped>
a { color: white; }
</style>

<template lang="pug">
.flex.justify-between.items-center(v-if="pagination.last_page > 1")
	a.h1.pb1.border-none(
		@click="to(-1)",
		:class="{ 'invisible': isFirstPage }") ←
	div {{ pagination.current_page }} / {{ pagination.last_page }}
	a.h1.pb1.border-none(
		@click="to(1)",
		:class="{ 'invisible': isLastPage }") ︎→
</template>

<script>
export default {
	name: 'Pagination',

	props: {
		pagination: Object
	},

	computed: {
		isFirstPage () {
			return this.pagination.current_page === 1
		},
		isLastPage () {
			return this.pagination.current_page === this.pagination.last_page
		},
	},

	methods: {
		to (direction) {
			this.$emit('to', direction)
		}
	}
}
</script>
