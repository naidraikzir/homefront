<template lang="pug">
div
	.pad.h100
		loading
	article
		h1 Heading H1
		h1
			mark Heading H1 marked and long
		h2 Heading H2
		h2
			a(href="javascript:void(0)", title="Heading Link")
				| Heading H2 linked
		h3 Heading H3
		h4 Heading H4
		h5 Heading H5
		h6 Heading H6

		ol
			li First
			li Second
			li Third
				ol
					li First
					li Second
					li Third

		ul
			li First
			li Second
			li Third
				ul
					li First
					li Second
					li Third

		a(href="javascript:void(0)", title="Haiperling") This is hyperlink

		blockquote And this is a very wise quote by someone awesome

		p
			| A very long long paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis condimentum elit, quis ornare felis pulvinar id. Sed mollis in mauris et auctor. Vestibulum aliquam laoreet lobortis 
			code sudo rm -rf /
			|  cras finibus eget turpis eu tincidunt.
			q This is some kind of inline quote.
			|  Donec bibendum dictum consequat. Nulla mauris nulla, 
			a(href="javascript:void(0)") aliquet sit
			|  amet sem at, blandit hendrerit mi. In convallis varius sapien, vel bibendum lacus
			mark auctor
			|  sit amet. Etiam consectetur tincidunt purus sit amet blandit. Aliquam et sagittis justo.

		pre
			code function() {
			br
			code   return 'Hell Yeah Holy Molly Bowly Uy Uy'
			br
			code }

		p
			button Button
			button Press This
			button Button
			button Click This

		table
			thead
				tr
					th Do
					th You
					th have
					th Some
					th Data
					th for
					th This
					th Really
					th wide
					th Table
					th ?
			tbody
				for val in [1, 2, 3, 4]
					tr
						td I
						td don't
						td know
						td if
						td I
						td have
						td but
						td let
						td me
						td check
						td first

		form
			fieldset
				label(for="text") Text Input Label
				input#text(type="text")
			fieldset
				label(for="textarea") Textarea Label
				textarea#textarea
			fieldset
				label(for="select") Select Label
				select
					for val in [1, 2, 3, 4]
						option(value=val) Option #{val}
			fieldset
				for val in [1, 2, 3, 4]
					div
						input(
							id="checkbox-" + val,
							type="checkbox",
							name="checkbox[]",
							value=val)
						label(for="checkbox-" + val) Checkbox Label

			fieldset
				for val in [1, 2, 3, 4]
					div
						input(
							id="radio-" + val,
							type="radio",
							name="radio",
							value=val)
						label(for="radio-" + val) Radio #{val} Label
						
			fieldset
				label(for="range") Range Label
				input#range(type="range")
				
	figure
		img(src="../../../images/giphy.gif")
		figcaption AhohaoiahoaoY
</template>

<script>
import Loading from 'vue/components/Loading'

export default {
	components: { Loading }
}
</script>
