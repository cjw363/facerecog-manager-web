import device from './modules/device'
import person from './modules/person'
import group from './modules/group'
import Vuex from 'vuex'

export default new Vuex.Store({
  modules: {
    device,
    person,
    group
  }
})
