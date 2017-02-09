'use strict'

import Vue from 'vue'
import router from './router'
import store from './store'
import Firebase from 'firebase'
import App from 'vue/App'

let config = {
	apiKey: "AIzaSyC-skpJP4pKL7JrSMydhIXDhp3Rtf8dVLw",
	authDomain: "naidraikzir.firebaseapp.com",
	databaseURL: "https://naidraikzir.firebaseio.com"
}
let firebaseApp = Firebase.initializeApp(config)
let db = firebaseApp.database()

// styles
require('sass/app')

new Vue({
	router,
	store,
	firebase: {
		bio: {
			source: db.ref('bio'),
			asObject: true
		},
		thoughts: db.ref('thoughts')
	},
	render: h => h(App)
}).$mount('#app')
