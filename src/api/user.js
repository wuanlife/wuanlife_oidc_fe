import fetch from 'utils/fetch'

/* eslint-disable */
export function login ({email, password, client_id}) {
  const data = {
    email,
    password,
    client_id
  }
  return fetch({
    url: `/users/login`,
    method: 'post',
    data
  })
}

export function signup ({name, email, password, client_id}) {
  const data = {
    name,
    email,
    password,
    client_id
  }
  return fetch({
    url: `/users/register`,
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUser({id}) {
  return fetch({
    url: `/users/${id}`,
    method: 'get',
  })
}

// 修改用户信息
export function putUser({id, data}) {
  // TODO: 验证？
  return fetch({
    url: `/users/${id}`,
    method: 'put',
    data: data
  })
}