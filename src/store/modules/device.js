// initial state
const state = {
  deviceList: [],
}

// getters
const getters = {
  getDeviceList() {
    return state.deviceList
  },
}

// mutations
const mutations = {
  setDeviceList(state, device) {
    state.deviceList = device
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
