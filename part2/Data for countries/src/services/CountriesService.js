import axios from 'axios' //axios and promises
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api' //crud

const getAll = () => axios.get(`${baseUrl}/all`).then(response => response.data)

const CountriesService = {getAll}

export default CountriesService  