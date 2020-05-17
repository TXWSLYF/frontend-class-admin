// eslint-disable-next-line import/no-cycle
import fetch from '@/util/fetch';


export const getOneAuthorityList = (data) => fetch.post('/admin/userRoleAuthority', data);
export const changeAuthorityRole = (data) => fetch.put('/admin/userRole', data);
export const addAuthorityRole = (data) => fetch.post('/admin/userRole', data);
export const getRoleList = () => fetch.get('/admin/roleList');

export default null;
