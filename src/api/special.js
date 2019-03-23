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
      url: '/admin/special/save',
      method: 'post',
      params
    })
  }


  export function updateSpecial(params) {
    return request({
      url: '/admin/special/update',
      method: 'post',
      params
    })
  }

  export function delSpecial(params) {
    return request({
      url: '/admin/special/del',
      method: 'post',
      params
    })
  }



