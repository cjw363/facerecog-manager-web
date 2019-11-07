const state = {
  user: '',
}

const getters = {
  getUser() {
    return state.user
  }
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}


