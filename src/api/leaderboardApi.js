import axios from 'axios'

const API_URL = '/api/users'

export const fetchUsersReq = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const addUserReq = async (user) => {
  const response = await axios.post(API_URL, user)
  return response.data
}

export const deleteUserReq = async (id) => {
  await axios.delete(`${API_URL}/${id}`)
  return id
}

export const incrementUserPointsReq = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/increment`)
  return response.data
}

export const decrementUserPointsReq = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/decrement`)
  return response.data
}
