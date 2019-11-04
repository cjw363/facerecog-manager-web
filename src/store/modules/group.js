const state = {
  groupList: [],
}

const getters = {
  getGroupList(){
    return state.groupList
  }
}

const mutations = {
  setGroupList(state, groupList) {
    state.groupList = groupList
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}


