import fetch from 'utils/fetch'

export function verify ({idToken = '', accessToken = ''}) {
  return fetch({
    url: `/auth?ID-Token=${idToken}&Access-Token=${accessToken}`,
    method: 'get'
  })
}

export function getAccess ({scope = 'public_profile'}) {
  const data = {
    scope: scope
  }
  return fetch({
    url: `/auth`,
    method: 'post',
    data
  })
}
