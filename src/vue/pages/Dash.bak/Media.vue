<template lang="pug">
.p2
	button(@click="manager = true") Add

	table
		thead
			tr
				th
				th Media
				th Mime
				th Description
				th Date
		tbody(v-if="medias.length")
			tr(v-for="media in medias")
				td
				td: img(:src="media.filename")
				td {{ media.mime }}
				td {{ media.description }}
				td {{ format(media.updated_at, 'MMMM, Do YYYY') }}
		tbody(v-else)
			tr
				td.center(colspan="5") No media uploaded
				
	media-manage(
		:show="manager",
		@cancel="manager = false")
</template>

<script>
import format from 'date-fns/format'
import MediaManage from 'vue/components/MediaManage'
import Pagination from 'vue/components/Pagination'

export default {
	name: 'Media',
	components: { MediaManage, Pagination },

	data () {
		return {
			medias: [],
			manager: false
		}
	},

	mounted () {
		this.fetch()
	},

	methods: {
		fetch () {
			return new Promise(resolve => {
				this.$http.get('/medias').then(response => {
					this.medias = response.data
					resolve()
				})
			})
		},
		format
	}
}
</script>
