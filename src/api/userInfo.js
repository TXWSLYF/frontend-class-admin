import fetch from '@/util/fetch';

/**
* @description 获取用户列表信息
*/
export const usersInfo = (data) => fetch.post('/viewUserInfo', data);

export default null;
