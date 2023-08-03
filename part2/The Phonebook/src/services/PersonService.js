import axios from 'axios' //axios and promises
const baseUrl = '/api/persons' //crud

const getAll = () => axios.get(baseUrl).then(response => response.data)  
const create = (newObject) => axios.post(baseUrl, newObject).then(response => response.data)
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data) 
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)

const PersonService = {getAll, create, deletePerson, update}

export default PersonService  