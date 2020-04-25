// eslint-disable-next-line import/no-cycle
import fetch from '@/util/fetch';


export const getOneAuthorityList = (data) => fetch.post('/userRoleAuthority', data);
export const changeAuthorityRole = (data) => fetch.put('/userRole', data);
export const addAuthorityRole = (data) => fetch.post('/userRole', data);
export const getRoleList = () => fetch.get('/roleList');

export default null;
