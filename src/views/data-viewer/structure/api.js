import {
  request
} from '@/api/service'
const apiPrefix = '/structures/'
export function GetList(query) {
  return request({
    url: apiPrefix,
    method: 'get',
    params: query
  })
}

export function AddObj(obj) {
  return request({
    url: apiPrefix,
    method: 'post',
    data: obj
  })
}

export function UpdateObj(obj) {
  return request({
    url: apiPrefix,
    method: 'put',
    data: obj
  })
}

export function DelObj(id) {
  return request({
    url: apiPrefix,
    method: 'delete',
    params: {
      id
    }
  })
}

export function GetObj(id) {
  return request({
    url: apiPrefix + `${id}/`,
    method: 'get'
  })
}
/* export function GetRoleList() {
  return request({
    url: apiPrefix + '/getAllRole',
    method: 'get'
  })
}

export function DoAuthz(userId, roleIds) {
  return request({
    url: apiPrefix + '/authz',
    method: 'post',
    params: {
      userId
    },
    data: roleIds
  })
} */
