export default {
	setAuthState: make('SET_AUTH_STATE'),
	toggleDashMenu: make('TOGGLE_DASH_MENU'),
	toggleMenu: make('TOGGLE_MENU'),
}

function make (type) {
	return ({ commit }, ...args) => commit(type, ...args)
}
