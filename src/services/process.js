import request from '../utils/request';
import {stringify} from "qs";

export async function queryTodo(params) {
  return request(`/api/process/getAlreadySend?${stringify(params)}`);
}

export async function queryAlreadyDo(params) {
    return request(`/portal/api/process/ajaxListApprovingTask.jhtml?${stringify(params)}`);
}
export async function getAllSystems() {
  return request(`/portal/api/process/getAllSystems.jhtml`);
}
export async function getProcessEnums() {
  return request(`/portal/api/process/getProcessEnums.jhtml`);
}


export async function queryAlreadySend(params) {
  return request('/api/process/getAlreadySend', {
    body: {
      ...params,
      method: 'get',
    },
  });
}
