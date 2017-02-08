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

	&.mounted::before {
		transform: skewY(25deg) scaleX(1);
	}

	&::before {
		position: absolute;
		left: 1.5em;
		right: 1.5em;
		top: 1em;
		bottom: 1em;
		border: solid white;
		border-width: 0 1px 0 0;
		transform: skewY(25deg) scaleX(1.25);
		transition: 0.75s ease-in;
		content: '';

		.mounted & {
			transition: 0.75s ease-out;
		}

		@include breakpoint('md') {
			left: 2em;
			right: 2em;
			top: 2em;
			bottom: 2em;
		}
	}
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
}

.greet {
	position: absolute;
	left: 10%;
	right: 10%;
	top: 1.5em;
	bottom: 1.5em;
	overflow-y: auto;
	padding-bottom: 1.5em;
	z-index: -1;
	transform: translateY(-200%);
	transition: 0.75s ease-in;
	z-index: 1;

	.mounted & {
		transform: translateY(0);
		transition: 0.75s ease-out;
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
		a.link(@click="") Resume
	router-link.link.projects(:to="{ name: 'projects' }") Projects

	.greet
		h1
			| Hey Ho
		p#greet
		.contact
			mark-view(:content="bio.address")
			a(:href="phoneLink") P — {{ bio.phone }}
			br
			a(:href="emailLink") E — {{ bio.email }}
</template>

<script>
import typer from 'typer-js'
import MarkView from 'vue/components/MarkView'
import bio from 'json/bio'

export default {
	name: 'Landing',
	components: { MarkView },

	data () {
		return {
			mounted: false,
			bio,
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
		setTimeout(() => {
			this.mounted = true
			typer('#greet')
				.pause(500)
				.line(this.bio.greet, 50)
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
