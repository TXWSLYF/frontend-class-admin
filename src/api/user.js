// eslint-disable-next-line import/no-cycle
import fetch from '@/util/fetch';

/**
* @description 获取当前登录用户的用户信息
*/
export const getCurUserInfo = () => fetch.get('/admin/user');

export default null;
