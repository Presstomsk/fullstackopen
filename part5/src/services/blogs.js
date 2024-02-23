import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const config = {
    headers: { authorization: token },
  }

  const url = `${baseUrl}/${updatedObject.id}`
  const response = await axios.put(url, updatedObject, config)
  return response.data
}

const remove = async Object => {
  const config = {
    headers: { authorization: token },
  }

  const url = `${baseUrl}/${Object.id}`
  const response = await axios.delete(url, config)
  return response.status
}

export default { getAll, create, setToken, update, remove }