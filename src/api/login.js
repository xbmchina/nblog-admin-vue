import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/u/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/u/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/u/logout',
    method: 'post'
  })
}
