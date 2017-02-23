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
	bottom: 0;
	left: 0;
	width: 100%;
	position: fixed;
	padding-bottom: 1em;
	padding-left: 1em;
	transform: translateX(-300%);
	transform-origin: left;
	transition: 0.75s ease-in;
	background-color: black;
	box-shadow: 0 0 2em 1em black;
	z-index: 2;

	> .link {
		position: relative;
	}

	.mounted & {
		transform: translateX(0);
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
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	overflow-y: auto;
	padding-left: 10%;
	padding-right: 10%;
	transition: 0.5s ease-out;

	&-enter,
	&-leave-to {
		transform: translateY(-200%);
	}

	&-leave-active {
		transition: 0.5s ease-in;
	}
}

.contact {
	margin-bottom: 4.5em;
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
		.greet(v-if="mounted")
			h1 Heyho
			p
				| My name is Rizki Ardian.
				br
				| I develop websites and design user interfaces.
				br
				| Love travelling and photography.
			.contact
				p
					| Jalan Logam III, Margacinta
					br
					| Buahbatu, Bandung
					br
					| Indonesia
				a(href="tel:+6285974002493") P — 628 597 400 2493
				br
				a(href="mailto:radeite8@gmail.com") E — radeite8@gmail.com
</template>

<script>
import MarkView from 'vue/components/MarkView'

export default {
	name: 'Home',
	components: { MarkView },

	data () {
		return {
			mounted: false,
		}
	},

	mounted () {
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
