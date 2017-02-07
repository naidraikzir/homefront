<style lang="sass" scoped>
@import
	'../../sass/variables';

button:hover {
	transform: initial
}

.wrap {
	bottom: 0;
	left: 0;
	overflow-y: auto;
	position: fixed;
	right: 0;
	top: 0;
}

.modal {
	background-color: white;
	border-radius: 4px;
	box-shadow: 0 10px 20px 0 rgba($pink, 0.5);
	display: flex;
	flex-direction: column;
	margin: 4em 2em;
	min-height: 80%;
	overflow: hidden;
	z-index: 2;
}

.content {
	box-shadow: 0 5px 15px 0 rgba(black, 0.1);
	flex: 1 1;
	padding: 1em;
	position: relative;
	z-index: 1;
}

[type=file] {
	cursor: pointer;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	opacity: 0;
	padding: 0;
	z-index: 2;
}

.actions {
	display: flex;
	flex: 0 0 3em;
	justify-content: flex-end;
}
</style>

<template lang="pug">
transition(
	@before-enter="mediaBefore",
	@enter="mediaEnter",
	@leave="mediaLeave")
	.wrap(@click="close", v-show="show")
		.modal
			.content
				.pt2.center.black(v-if="!medias.length") No media uploaded
					.mt2: button Upload now
				input(type="file", multiple)
			.actions
				button(@click="close") Cancel
				button Insert
</template>

<script>
import anime from 'animejs'

export default {
	name: 'MediaManage',

	props: {
		show: Boolean
	},

	data () {
		return {
			medias: [],
			shown: false
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
				}, error => console.log(error.data))
			})
		},
		mediaBefore (el) {
			el.style.opacity = 0
			el.style.transform = 'translateY(-30em)'
		},
		mediaEnter (el, done) {
			let self = this
			anime({
				targets: el,
				duration: 1000,
				translateY: 0,
				opacity: 1,
				delay: 500,
				easing: 'easeOutExpo',
				complete () {
					self.shown = true
					done()
				}
			}).play()
		},
		mediaLeave (el, done) {
			let self = this
			anime({
				targets: el,
				duration: 500,
				translateY: '-30em',
				opacity: 0,
				easing: 'easeInExpo',
				complete () {
					self.shown = false
					done()
				}
			}).play()
		},
		close () {
			if (this.shown) this.$emit('cancel')
		}
	}
}
</script>
