import device from './modules/device'
import person from './modules/person'
import Vuex from 'vuex'

export default new Vuex.Store({
  modules:{
    device,
    person
  }
})
