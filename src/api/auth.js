import fetch from '@/util/fetch';

/**
 * @description 登陆接口
 */
export const login = (data) => fetch.post('/admin/login', data);

/**
 * @description 登出接口
 */
export const logout = () => fetch.post('/admin/logout');

export default null;
