// import qs from '@types/query-string';
import { API_ENDPOINT } from '../constants';
import axiosService from '../commons/axiosService';
// import {getTokenApi} from '../screens/tab/home/ExplainScreen';
// http://localhost:3000/tasks
const urlLogin = 'login';
const urlRegister = 'signUp';
const urlGrammar = 'getGrammar';
const urlComment = 'getComment';
const urlLogout = 'logout';

// export const getList = (params = {}) => {
//   let queryParams = '';
//   if (Object.keys(params).length > 0) {
//     queryParams = `?${qs.stringify(params)}`;
//   }
//   return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`);
// };

// http://localhost:3000/tasks METHOD: POST
export const getGra = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${urlGrammar}`, data);
};

export const login = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlLogin}`, data);
};

export const register = data => {
    return axiosService.post(`${API_ENDPOINT}/${urlRegister}`, data);
}

export const sendMailPass = data => {
  console.log('url ne: ',`${API_ENDPOINT}/${urlForgotPassword}` );
  return axiosService.post(`${API_ENDPOINT}/${urlForgotPassword}`, data);
}

export const allcomment = data => {
  // console.log('gettokenAPi la', getTokenApi);
  return axiosService.post(`${API_ENDPOINT}/${urlComment}`, data);
}
export const logoutUser = data => {
  return axiosService.post(`${API_ENDPOINT}/${urlLogout}`, data);
}

// http://localhost:3000/tasks/:id METHOD: PUT
// export const updateTask = (data, taskId) => {
//   return axiosService.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
// };

// http://localhost:3000/tasks/:id METHOD: DELETE
// export const deleteTask = taskId => {
//   return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
// };
