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
