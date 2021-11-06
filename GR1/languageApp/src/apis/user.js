// import qs from '@types/query-string';
import { API_ENDPOINT } from '../constants';
import axiosService from '../commons/axiosService';

// http://localhost:3000/tasks
const urlLogin = 'login';
const urlRegister = 'signUp';
const urlGrammar = 'getGrammar';
// export const getList = (params = {}) => {
//   let queryParams = '';
//   if (Object.keys(params).length > 0) {
//     queryParams = `?${qs.stringify(params)}`;
//   }
//   return axiosService.get(`${API_ENDPOINT}/${url}${queryParams}`);
// };

// http://localhost:3000/tasks METHOD: POST
export const getGra = () => {
  return axiosService.get(`${API_ENDPOINT}/${urlGrammar}`);
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

// http://localhost:3000/tasks/:id METHOD: PUT
// export const updateTask = (data, taskId) => {
//   return axiosService.put(`${API_ENDPOINT}/${url}/${taskId}`, data);
// };

// http://localhost:3000/tasks/:id METHOD: DELETE
// export const deleteTask = taskId => {
//   return axiosService.delete(`${API_ENDPOINT}/${url}/${taskId}`);
// };
