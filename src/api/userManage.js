// eslint-disable-next-line import/no-cycle
import fetch from '@/util/fetch';

/**
* @description 获取学员信息
*/
export const getUserInfo = (data) => fetch.post('/admin/viewUserInfo', data);

export const updateUserInfo = (data) => fetch.post('/admin/user', data);

export const getWholeCourseList = (data) => fetch.get('/wholeCourseList', data);


export default null;
