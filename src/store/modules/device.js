// initial state
const state = {
  deviceList: [],
  dialogAddPersonVisible: '',
  dialogGrantPersonVisible: ''
}

// getters
const getters = {
  getDeviceList() {
    return state.deviceList
  },
  getDialogAddPersonVs() {
    return state.dialogAddPersonVisible;
  },
  getDialogGrantPersonVs() {
    return state.dialogGrantPersonVisible;
  },
}

// mutations
const mutations = {
  setDeviceList(state, device) {
    state.deviceList = device
  },
  setDialogAddPersonVs(state, visible) {
    state.dialogAddPersonVisible = visible
  },
  changeDialogAddPersonVs(state) {
    state.dialogAddPersonVisible = !state.dialogAddPersonVisible
  },
  setDialogGrantPersonVs(state, visible) {
    state.dialogGrantPersonVisible = visible
  },
  changeDialogGrantPersonVs(state) {
    state.dialogGrantPersonVisible = !state.dialogGrantPersonVisible
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
