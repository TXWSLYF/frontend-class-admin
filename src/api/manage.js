// eslint-disable-next-line import/no-cycle
import fetch from '@/util/fetch';


export const getOneAuthorityList = (data) => fetch.post('/userRoleAuthority', data);
export const getRoleList = () => fetch.get('/roleList');

export default null;
