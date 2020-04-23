// eslint-disable-next-line import/no-cycle
import fetch from '@/util/fetch';


export const getOneRoleList = (data) => fetch.post('/roleAuthorityList', data);
export const addNewRole = (data) => fetch.post('/role', data);
export const changeRoleAuthority = (data) => fetch.put('/roleAuthority', data);
export const getAuthorityList = () => fetch.get('/authorityList');
export const deleteRole = (data) => fetch.delete('/role', { data });

export default null;
