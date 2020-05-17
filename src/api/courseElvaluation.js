// eslint-disable-next-line import/no-cycle
import fetch from '@/util/fetch';

export const getClassFeedbackList = (data) => fetch.post('/admin/classFeedback', data);
export const getClassFeedbackDetail = (data) => fetch.post('/admin/classFeedbackDetail', data);
export default null;
