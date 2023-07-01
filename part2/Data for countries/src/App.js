import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import CountriesService from './services/CountriesService'

const App = () => { 
  const [filter, setFilter] = useState('') 
  const [countries, setCountries] = useState([])

  useEffect(() => {    //useEffect    
    CountriesService
      .getAll()
      .then(countries => setCountries(countries))       
  }, [])

  const HandleFilterChange = (event) => setFilter(event.target.value)

  const countriesToShow = filter === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()) ||
                                                                                country.name.official.toLowerCase().includes(filter.toLowerCase())) // filter  

  return ( // forms
    <div>
      <Filter value={filter} onChange={HandleFilterChange}/>
      <Countries countries={countriesToShow}/>       
    </div>
  )
}

export default App