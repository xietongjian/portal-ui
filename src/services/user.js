import request from '../utils/request';
import {stringify} from "qs";

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request(`/portal/api/user/currentUser.jhtml?${stringify(params)}`);
}
