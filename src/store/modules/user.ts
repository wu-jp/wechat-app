import Taro from '@tarojs/taro'
import config from '../../constants/config'

const state = {
  index: 0,
}
const mutations = {
  INDEX(state, data) {
    state.index = data
  }
}
const actions = {}
const getters = {}
export const user = {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
