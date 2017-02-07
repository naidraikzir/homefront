import Vue from 'vue'
const DELAYED_EVENTS = [ 'cut', 'paste', 'drop', 'keydown' ]

Vue.directive('auto-resize', (el, binding) => {
	el.addEventListener('change', resize, false)
	for (let e of DELAYED_EVENTS) el.addEventListener(e, delayedResize, false)
})

function resize (event) {
	event.target.style.height = 'auto'
	event.target.style.height = `${event.target.scrollHeight}px`
}

/* 0-timeout to get the already changed text */
function delayedResize (event) {
	window.setTimeout(resize, 0, event)
}
