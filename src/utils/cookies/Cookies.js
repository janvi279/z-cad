import Cookies from 'js-cookie'

export const getToken = () => {
  return Cookies.get('user_token')
}

export const setToken = (token) => {
  Cookies.set('user_token', token)
}

export const removeToken = () => {
  Cookies.remove('user_token')
}
