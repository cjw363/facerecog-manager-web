// initial state
const state = {
  deviceList: [],
  dialogDeviceListVisible: ''
}

// getters
const getters = {
  getDeviceList() {
    return state.deviceList
  },
  getDialogDeviceListVs() {
    return state.dialogDeviceListVisible;
  }
}

// mutations
const mutations = {
  setDeviceList(state, device) {
    state.deviceList = device
  },
  setDialogDeviceListVs(state, visible) {
    state.dialogDeviceListVisible = visible
  },
  changeDialogDeviceListVs(state){
    state.dialogDeviceListVisible = !state.dialogDeviceListVisible
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
