import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-cycle
import { getUserInfo } from '@/api/user';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'UserManage',
    component: () => import('@/views/UserManage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/userManage',
    name: 'UserManage',
    component: () => import('@/views/UserManage.vue'),
  },
  {
    path: '/authorityManage',
    name: 'AuthorityManage',
    component: () => import('@/views/AuthorityManage.vue'),
  },
  {
    path: '/roleManage',
    name: 'RoleManage',
    component: () => import('@/views/RoleManage.vue'),
  },
  {
    path: '/courseEvaluation',
    name: 'CourseEvaluation',
    component: () => import('@/views/CourseEvaluation.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { isLogin } = store.state.userInfo;
  // 未登录跳转登录页
  if (to.path !== '/login' && !isLogin) {
    const userInfo = await getUserInfo();
    store.commit('setUserInfo', { isLogin: true, ...userInfo });
    next();
  } else {
    next();
  }
});

export default router;
