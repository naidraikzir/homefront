import Vue from 'vue'
import Router from 'vue-router'
import makeTitle from './makeTitle'

Vue.use(Router)

import Home from 'vue/pages/Home'
import Thoughts from 'vue/pages/Thoughts'
import Thought from 'vue/pages/Thought'
import Projects from 'vue/pages/Projects'
import NotFound from 'vue/pages/NotFound'

const router = new Router({
	linkActiveClass: '-active',
	mode: 'history',
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/thoughts', name: 'thoughts', component: Thoughts },
		{ path: '/thoughts/:slug', name: 'thought', component: Thought },
		{ path: '/projects', name: 'projects', component: Projects },
		{ path: '/404', name: '404', component: NotFound },
		{ path: '*', redirect: '/404' }
	]
})

router.afterEach(to => {
	makeTitle(to.name, 'Rizki Ardian')
})

export default router
