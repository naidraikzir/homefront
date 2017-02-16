import Vue from 'vue'
import Firebase from 'firebase/app'

require('firebase/database')

const config = {
	apiKey: "AIzaSyC-skpJP4pKL7JrSMydhIXDhp3Rtf8dVLw",
	authDomain: "naidraikzir.firebaseapp.com",
	databaseURL: "https://naidraikzir.firebaseio.com"
}

const firebase = Firebase.initializeApp(config)

Vue.mixin({
	created () {
		this.$firebaseDB = firebase.database()
	}
})
