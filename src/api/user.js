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

export function changePassword({id, data}) {
  return fetch({
    url: `/users/${id}/password`,
    method: 'put',
    data: data
  })
}

// 找回密码发送邮件API
export function findPwd({email}) {
  return fetch({
    url: `/email/${email}`,
    method: 'post'
  })
}


// 获取邮件的token重置密码
export function resetPwd({id, data}) {
  return fetch({
    url: `/users/${id}/password`,
    method: 'post',
    data: data
  })
}

// 获取午安积分
export function getUserPoints({id}) {
  return fetch({
    url: `/users/${id}/wuan_points`,
    method: 'get'
  })
}

// 获取午安积分列表
export function getPointslist({id}) {
  return fetch({
    url: `/users/${id}/points_list`,
    method: 'get'
  })
}


// 兑换积分
export function changePoints({id, data}) {
  return fetch({
    url: `/users/${id}/points`,
    method: 'put',
    data: data
  })
}


// 获取午安果数量
export function fruitNum({id}) {
  return fetch({
    url: `/users/${id}/wuan_fruit`,
    method: 'get'
  })
}

//获取签到规则及当日签到状态
export function signInfo({id}) {
  return fetch({
    url: `/users/${id}/wuan_sign_info`,
    method: 'get'
  })
}

//签到
export function signOnce({id}) {
  return fetch({
    url: `/users/${id}/wuan_sign`,
    method: 'get'
  })
}