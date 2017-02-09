import Vue from 'vue'
import Vuex from 'vuex'
import VuexFire from 'vuexfire'

import state from './store/state'
import getters from './store/getters'

Vue.use(Vuex)
Vue.use(VuexFire)

export default new Vuex.Store({
	state,
	mutations: VuexFire.mutations,
	getters
})
