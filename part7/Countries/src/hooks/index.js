import { useState, useEffect } from "react"
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)    

    useEffect(() => {        
        if (name !== '') {
            axios.get(`${baseUrl}/api/name/${name.toLowerCase()}`)
            .then((response) => {
                const data = response.data
                console.log(data)
                setCountry({
                    data: {
                        flag: data.flags.png,
                        name: data.name.official,
                        population: data.population,
                        capital: data.capital[0]
                    },                    
                    found: true                    
                })
            })
            .catch((error) => {        
                if (error.response.status === 404){            
                    setCountry({
                    found: false
                    })
                }
            })            
        }
        else {
            setCountry(null)
        }

    }, [name])

   
  
    return country
}