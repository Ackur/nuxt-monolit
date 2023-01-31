import axios from 'axios'

export const state = () => ({
  users: [],
})

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload
  },
}

export const actions = {
  async GET_USERS({ commit }, payload) {
    try {
      const { data } = await axios.get('api/user', payload)
      commit('SET_USERS', data)
    } catch (err) {
      console.log(err)
      throw err
    }
  },
}

export const getters = {
  USERS: (state) => state.users,
}
