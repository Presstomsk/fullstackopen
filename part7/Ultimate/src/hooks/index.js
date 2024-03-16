import { useState, useEffect } from "react"
import axios from "axios"


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

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    useEffect(() => {        
        axios.get(`${baseUrl}`)
            .then((response) => {
                const data = response.data
                console.log(data)
                setResources(data)
            })
            .catch((error) => {        
                if (error.response.status === 404){            
                    setResources([])
                }
            })      
    }, [baseUrl])
  
    const create = (resource) => {
       axios.post(`${baseUrl}`, resource)
            .then((response) => {
                setResources(resources.concat(response.data))
            })
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
}