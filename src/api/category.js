import request from '@/utils/request'

export function getCategoryList(params) {
  return request({
    url: '/category/list',
    method: 'get',
    params
  })
}

export function saveCategory(params) {
    return request({
      url: '/category/save',
      method: 'post',
      params
    })
  }


  export function updateCategory(params) {
    return request({
      url: '/category/update',
      method: 'post',
      params
    })
  }

  export function delCategory(params) {
    return request({
      url: '/category/del',
      method: 'post',
      params
    })
  }



