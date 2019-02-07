import request from '@/utils/request'

export function addArticle(params) {
  return request({
    url: '/article/save',
    method: 'post',
    params
  })
}



export function delArticle(params) {
  return request({
    url: '/article/del',
    method: 'post',
    params
  })
}

export function getArticle(params) {
  return request({
    url: '/article/detail',
    method: 'get',
    params
  })
}

export function getArticleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}
