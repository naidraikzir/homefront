<style lang="sass" scoped>
@import
	'../../sass/variables',
	'../../sass/mixins';

a {
	border: 0;
	color: white;
}

.wrapper {
	height: 100vh;
	overflow: hidden;
	position: relative;
}

.link {
	background: black;
	border: 0;
	color: white;
	font-size: 1.2em;
	padding: 0 1em;
	transition: 0.3s;

	&:hover {
		&::before {
			opacity: 0;
			transform: translateY(0) scaleY(0);
		}
		&::after {
			transform: translateY(0);
		}
	}

	&::before {
		content: '';
		position: absolute;
		top: -200%;
		left: 0;
		width: 100%;
		height: 300%;
		background: $green;
		transform: translateY(300%) scaleY(1);
		transition:
			0.5s transform,
			0.3s 0.2s opacity;
	}

	&::after {
		content: '';
		position: absolute;
		top: 0.7em;
		left: 5%;
		width: 90%;
		height: 1px;
		background: $green;
		transform: translateY(5em);
		transition: 0.5s;
	}
}

.bottom {
	bottom: 1em;
	left: 1em;
	position: absolute;
	transform: translateX(-300%);
	transform-origin: left;
	transition: 0.75s ease-in;
	z-index: 2;

	> .link {
		position: relative;
	}

	.mounted & {
		transform: translateX(0);
	}

	@include breakpoint('md') {
		left: 1.7em;
	}
}

.projects {
	bottom: 67%;
	position: absolute;
	right: -4.55em;
	transform: rotate(-90deg) translateX(-50%) translateY(400%);
	transform-origin: left;
	transition: 0.75s ease-in;
	z-index: 2;

	.mounted & {
		transform: rotate(-90deg) translateX(-50%);
		transition: 0.75s ease-out;
	}

	@include breakpoint('md') {
		right: -3.8em;
	}

	> span {
		content: '';
		position: absolute;
		right: 100%;
		top: 0.7em;
		border-top: 1px solid white;
		width: 100em;
		transition: 0.75s ease-in;
	}
}

.greet {
	position: absolute;
	left: 10%;
	right: 10%;
	top: 0;
	bottom: 1.5em;
	overflow-y: auto;
	padding-bottom: 1.5em;
	z-index: -1;
	transition: 0.5s ease-out;
	z-index: 1;

	&-enter,
	&-leave-to {
		transform: translateY(-200%);
	}

	&-leave-active {
		transition: 0.5s ease-in;
	}

	@include breakpoint('md') {
		padding-left: -3.8em;
	}
}
</style>

<template lang="pug">
.wrapper(:class="{ 'mounted': mounted }")
	.bottom
		router-link.link(:to="{ name: 'thoughts' }") Thoughts
		a.link(
			href="https://drive.google.com/open?id=0Bw0IWO_QJRzSMHBEZXVJQmpPbkk",
			target="_blank") Resume
	router-link.link.projects(:to="{ name: 'projects' }")
		span
		| Projects

	transition(name="greet")
		.greet(v-if="mounted && bio")
			mark-view(:content="bio.greet")
			.contact
				mark-view(:content="bio.address")
				a(:href="phoneLink") P — {{ bio.phone }}
				br
				a(:href="emailLink") E — {{ bio.email }}
</template>

<script>
import MarkView from 'vue/components/MarkView'

export default {
	name: 'Home',
	components: { MarkView },

	data () {
		return {
			bio: null,
			mounted: false,
		}
	},

	computed: {
		phoneLink () {
			return `tel:${this.bio.phone.split(' ').join('')}`
		},
		emailLink () {
			return `mailto:${this.bio.email}`
		},
	},

	mounted () {
		this.$firebaseDB.ref('bio').once('value')
			.then(snapshot => {
				this.bio = snapshot.val()
			})

		setTimeout(() => {
			this.mounted = true
		}, 1000)
	},

	beforeRouteLeave (to, from, next) {
		this.mounted = false
		
		setTimeout(() => {
			next()
		}, 1500)
	},
}
</script>
