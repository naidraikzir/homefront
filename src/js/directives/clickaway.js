import Vue from 'vue'

Vue.directive('clickaway', (el, binding, vnode) => {
	document.documentElement.addEventListener('click', ev => {
    if (!el.contains(ev.target)) {
      return binding.value(ev)
    }
	})
})
