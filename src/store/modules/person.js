const state = {
  personList: [],
}

const getters = {
  getPersonList(){
    return state.personList
  }
}

const mutations = {
  setPersonList(state, personList) {
    state.personList = personList
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}


