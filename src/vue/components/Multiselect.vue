<template lang="pug">
.multiselect(
	tabindex="0",
	:class="{ 'multiselect--active': isOpen, 'multiselect--disabled': disabled }",
	@focus="activate()",
	@blur="searchable ? false : deactivate()",
	@keydown.self.down.prevent="pointerForward()",
	@keydown.self.up.prevent="pointerBackward()",
	@keydown.enter.stop.prevent.self="addPointerElement()",
	@keydown.tab.stop.prevent.self="addPointerElement()",
	@keyup.esc="deactivate()")

	.multiselect__select(@mousedown.prevent="toggle()")
	.multiselect__tags(ref="tags")
		span.multiselect__tag(
			v-for="option of visibleValue",
			onmousedown="event.preventDefault()")
			span(v-text="getOptionLabel(option)")
			i.multiselect__tag-icon(
				aria-hidden="true",
				tabindex="1",
				@keydown.enter.prevent="removeElement(option)",
				@mousedown.prevent="removeElement(option)")
		template(v-if="internalValue && internalValue.length > limit")
			strong(v-text="limitText(internalValue.length - limit)")
		transition(name="multiselect__loading")
			.multiselect__spinner(v-show="loading")
		input.multiselect__input(
			name="search",
			ref="search",
			type="text",
			autocomplete="off",
			:placeholder="placeholder",
			v-if="searchable",
			:value="search",
			:disabled="disabled",
			@input="updateSearch($event.target.value)",
			@focus.prevent="activate()",
			@blur.prevent="deactivate()",
			@keyup.esc="deactivate()",
			@keyup.down="pointerForward()",
			@keyup.up="pointerBackward()",
			@keydown.enter.stop.prevent.self="addPointerElement()",
			@keydown.tab.stop.prevent.self="addPointerElement()",
			@keydown.delete="removeLastElement()")
		span.multiselect__single(
			v-if="!searchable && !multiple"
			v-text="currentOptionLabel || placeholder")
	transition(name="multiselect")
		ul.multiselect__content(
			:style="{ maxHeight: `${maxHeight}px` }",
			ref="list",
			v-show="isOpen")
			slot(name="beforeList")
			li(v-if="multiple && max === internalValue.length")
				span.multiselect__option
					slot(name="maxElements") Maximum of {{ max }} options selected. First remove a selected option to select another.
			template(v-if="!max || internalValue.length < max")
				li(v-for="(option, index) of filteredOptions", :key="index")
					span.multiselect__option(
						tabindex="0",
						:class="optionHighlight(index, option)",
						@mousedown.prevent="select(option)",
						@mouseenter="pointerSet(index)",
						:data-select="option.isTag ? tagPlaceholder : selectLabelText",
						:data-selected="selectedLabelText",
						:data-deselect="deselectLabelText")
						multiselect-option(
							:option-function="optionFunction",
							:label="getOptionLabel(option)",
							:option="option")
			li(v-show="filteredOptions.length === 0 && search")
				span.multiselect__option
					slot(name="noResult") No elements found. Consider changing the search query.
			slot(name="afterList")
</template>

<script>
import { multiselectMixin, pointerMixin } from 'vue-multiselect'
import MultiselectOption from 'vue-multiselect/lib/MultiselectOption'

export default {
	name: 'Multiselect',
	components: { MultiselectOption },
	mixins: [ multiselectMixin, pointerMixin ],

	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
    optionFunction: {
      type: Function,
      default: (h, option, label) => h('span', {}, label)
    }
	},

	computed: {
		visibleValue () {
			return this.multiple ? this.internalValue.slice(0, this.limit) : []
		},
    deselectLabelText () {
      return this.showLabels ? this.deselectLabel : ''
    },
    selectLabelText () {
      return this.showLabels ? this.selectLabel : ''
    },
    selectedLabelText () {
      return this.showLabels ? this.selectedLabel : ''
    }
	}
}
</script>
