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
      pageNumber: 1,
      pageSize: 1,
    },
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = Object.assign(state.userInfo, userInfo);
    },
    SET_PAGE(state, payload) {
      const {
        pageNumber,
        pageSize,
      } = payload;
      state.pageNumber = pageNumber;
      state.pageSize = pageSize;
    },
  },
});
