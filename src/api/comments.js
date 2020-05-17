import fetch from '@/util/fetch';

/**
 * @description 查看课堂评价
 */
export const courseComments = (data) => fetch.post('/admin/classFeedback', data);

/**
 * @description 查看课堂评价详情
 */
export const courseCommDetails = (data) => fetch.post('/admin/classFeedbackDetail', data);

export default null;
