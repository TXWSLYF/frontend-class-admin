// eslint-disable-next-line import/no-cycle
import fetch from '@/util/fetch';

/**
* @description 获取当前登录用户的用户信息
*/
export const getUserInfo = () => fetch.get('/user');

export default null;
