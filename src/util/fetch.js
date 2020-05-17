import axios from 'axios';
import { Message } from 'element-ui';
import { errorCodeType } from '@/common/constant';
// eslint-disable-next-line import/no-cycle
import router from '@/router/index';

const { USER_NOT_LOGIN } = errorCodeType;

const fetch = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

fetch.interceptors.request.use(
  (requestConfig) => requestConfig,
  (error) => Promise.reject(error),
);

fetch.interceptors.response.use(
  (response) => {
    const { errorCode, msg, data } = response.data;

    if (errorCode !== 0) {
      Message.error(msg);

      // 未登录，跳转到登录页面
      if (errorCode === USER_NOT_LOGIN) {
        setTimeout(() => {
          // TODO: 跳转地址应该由后端来决定
          // window.location = '/#/login';
          router.replace('/login');
        }, 1000);
      }

      return Promise.reject(new Error(msg));
    }

    return data;
  },
  (error) => Promise.reject(error),
);

export default fetch;
