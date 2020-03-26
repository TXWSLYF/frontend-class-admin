import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      isLogin: false,
      name: '',
      avatar: '',
      role: '',
    },
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = Object.assign(state.userInfo, userInfo);
    },
  },
});
