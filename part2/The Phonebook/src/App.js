import { useState, useEffect } from 'react'
import axios from 'axios' // axios
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

function IsNameAlreadyAdded(persons, newName) {
  var isNameAlreadyAdded = false;    

  persons.forEach(person => {
    if (person.name === newName)
    {       
      isNameAlreadyAdded = true;     
    }
  }) 

  return isNameAlreadyAdded;
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {    //useEffect
    axios
      .get('http://localhost:3001/persons')
      .then(response => {        
        setPersons(response.data)
      })
  }, [])

  const HandleNameChange = (event) => setNewName(event.target.value)   
  const HandleNumberChange = (event) => setNewNumber(event.target.value)
  const HandleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter)) // filter

  const AddPerson = (event) => {    
    event.preventDefault()   //disable submitting form to server

    if (IsNameAlreadyAdded(persons, newName))
    {
      alert(`${newName} is already added to phonebook`); 
    }
    else if (newName !== '')
    {
      
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1      
      }      
      
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber('')
  }

  return ( // forms
    <div>
      <h2>Phonebook</h2>
        <Filter value={filter} onChange={HandleFilterChange}/>       
      <h2>Add a new contact</h2>     
        <PersonForm name={newName} number={newNumber} onNameChange={HandleNameChange} onNumberChange={HandleNumberChange} onSubmit={AddPerson}/>
      <h2>Numbers</h2>    
        <Persons persons={personsToShow}/>    
    </div>
  )
}

export default App