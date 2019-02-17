import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/special/list',
    method: 'get',
    params
  })
}

export function saveSpecial(params) {
    return request({
      url: '/special/save',
      method: 'post',
      params
    })
  }


  export function updateSpecial(params) {
    return request({
      url: '/special/update',
      method: 'post',
      params
    })
  }

  export function delSpecial(params) {
    return request({
      url: '/special/del',
      method: 'post',
      params
    })
  }



