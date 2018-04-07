import fetch from 'utils/fetch'

export function login ({email, password}, redirectUrl) {
  const data = {
    email,
    password
  }
  return fetch({
    url: `/users/login?redirect_url=${redirectUrl}&nonce=keke&aud=client-12345`,
    method: 'post',
    data
  })
}

export function signup ({name, email, password}, redirectUrl) {
  const data = new FormData()
  data.set('name', name)
  data.set('email', email)
  data.set('password', password)

  return fetch({
    url: `/users/register?redirect_url=${redirectUrl}&nonce=keke&aud=client-12345&response_type=code&client_id=wuanlife_movie&state=af0ifjsldkj&scope=all`,
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data
  })
}
