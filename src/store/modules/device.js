// initial state
const state = {
  deviceList: [],
  dialogAddPersonVisible: ''
}

// getters
const getters = {
  getDeviceList() {
    return state.deviceList
  },
  getDialogAddPersonVs() {
    return state.dialogAddPersonVisible;
  }
}

// mutations
const mutations = {
  setDeviceList(state, device) {
    state.deviceList = device
  },
  setDialogAddPersonVs(state, visible) {
    state.dialogAddPersonVisible = visible
  },
  changeDialogAddPersonVs(state){
    state.dialogAddPersonVisible = !state.dialogAddPersonVisible
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
