'use strict'

import Vue from 'vue'
import router from './router'
import App from 'vue/App'

// database
require('./firebase')

// styles
require('sass/app')

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
