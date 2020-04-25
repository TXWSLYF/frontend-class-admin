import fetch from '@/util/fetch';

/**
 * @description 角色列表接口
 */
export const roleList = (data) => fetch.post('/roleAuthorityList', data);

/**
 * @description 获取权限点列表
 */
export const authorityList = () => fetch.get('/authorityList');

/**
 * @description 新建角色
 */
export const newRole = (data) => fetch.post('/role', data);

/**
 * @description 删除角色
 */
export const deleteRole = (data) => fetch.delete('/role', { data });

/**
 * @description 角色修改权限
 */
export const editRole = (data) => fetch.put('/roleAuthority', data);

export default null;
