import fetch from '@/util/fetch';

/**
 * @description 角色列表接口
 */
export const roleList = () => fetch.get('/roleList');

/**
 * @description 获取权限点列表
 */
export const authorityList = () => fetch.get('/authorityList');

export default null;
