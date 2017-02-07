'use strict'

import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import router from './router'
import store from './store'
import App from 'vue/App'

Vue.use(VueFire)

// ajax
// require('./http')

// directives
// require('./directives/autoResize')
require('./directives/clickaway')
require('./directives/hammer')

// styles
require('sass/app')

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
