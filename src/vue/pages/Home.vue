<style lang="scss" scoped>
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
	display: inline-block;
	font-size: 1.2em;
	padding: 0.5em 1em;
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
		top: 50%;
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
	padding: 0 1em 1em 1em;
	background-color: black;
	box-shadow: 0 0 2em 1em black;
	z-index: 2;

	> .link {
		opacity: 0;
		position: relative;
		transform: translateX(-300%);
		transform-origin: left;
		transition: 0.5s ease-in;

		.mounted & {
			opacity: 1;
			transform: translateX(0);
		}
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
	margin-bottom: 9em;

	@include breakpoint('sm') {
		margin-bottom: 6em;
	}
}
</style>

<template lang="pug">
.wrapper(:class="{ 'mounted': mounted }")
	.bottom
		router-link.link(:to="{ name: 'thoughts' }", v-if="thoughts", style="transition-delay: 0.3s") Thoughts
		a.link(href="https://drive.google.com/open?id=0Bw0IWO_QJRzSMHBEZXVJQmpPbkk", style="transition-delay: 0.2s") Resume
		a.link(href="https://github.com/naidraikzir", style="transition-delay: 0.1s") Github
		a.link(href="https://www.linkedin.com/in/rizkiardian/", style="transition-delay: 0s") LinkedIn
	router-link.link.projects(:to="{ name: 'projects' }", v-if="projects")
		span
		| Projects

	transition(name="greet")
		.greet(v-if="mounted")
			mark-view(:content="greet")
			.contact
				a(:href="`tel:+${contact.phone.replace(/ /g, '')}`") P — {{ contact.phone }}
				br
				a(:href="`mailto:${contact.email}`") E — {{ contact.email }}
</template>

<script>
import MarkView from 'vue/components/MarkView'

export default {
	name: 'Home',
	components: { MarkView },

	data () {
		return {
			mounted: false,
			greet: null,
			contact: {
				email: null,
				phone: null
			},
			thoughts: false,
			projects: false
		}
	},

	created () {
		let greet = this.fetch()
		let contact = this.fetchContact()
		Promise.all([
			greet,
			contact
		]).then(() => {
			this.fetchCounts()
			this.mounted = true
		})
	},

	beforeRouteLeave (to, from, next) {
		this.mounted = false
		
		setTimeout(() => {
			next()
		}, 1500)
	},

	methods: {
		fetch () {
			return new Promise(resolve => {
				this.$firebaseFiles.ref().child(`greet.md`)
					.getDownloadURL()
					.then(url => {
						let xhr = new XMLHttpRequest()
						xhr.onreadystatechange = event => {
							if (xhr.readyState === 4) {
								if (xhr.status === 200) {
									setTimeout(() => {
										this.greet = xhr.responseText
										resolve()
									}, 300)
								}
							}
						}
						xhr.open('GET', url)
						xhr.send()
					})
			})
		},
		fetchContact () {
			return new Promise(resolve => {
				this.$firebaseDB.ref('contact').once('value')
					.then((snapshot) => {
						this.contact = snapshot.val()
						resolve()
					})
			})
		},
		fetchCounts () {
			this.$firebaseDB.ref('thoughts_count').once('value')
				.then((snapshot) => {
					if (snapshot.val() > 0) this.thoughts = true
				})

			this.$firebaseDB.ref('projects_count').once('value')
				.then((snapshot) => {
					if (snapshot.val() > 0) this.projects = true
				})
		}
	}
}
</script>
