import request from '@/utils/request'
import qs from 'Qs';

export function login(username, password) {
  return request({
    url: '/u/login',
    method: 'post',
    data: qs.stringify({
      username,
      password
    })
  })
}

export function getInfo(token) {
  return request({
    url: '/u/info',
    method: 'get',
    params: { token },
    headers: {"Authorization": "Bearer " + token }
  })
}

export function logout() {
  return request({
    url: '/u/logout',
    method: 'post'
  })
}
