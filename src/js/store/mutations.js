export default {
	SET_AUTH_STATE (state, value) {
		state.isAuthenticated = value
	},
	TOGGLE_DASH_MENU (state, value) {
		state.dashMenu = value
	},
	TOGGLE_MENU (state, value) {
		state.menu = value
	},
}
