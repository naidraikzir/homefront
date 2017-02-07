import Vue from 'vue'
import Hammer from 'hammerjs'

Vue.directive('touch', (el, binding) => {
	const MC = new Hammer(el)
	MC.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
	MC.on(binding.arg, () => {
		binding.value()
	})
})
