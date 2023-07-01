import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import NameChecking from './services/NameChecking'
import PersonService from './services/PersonService'

let isError = false;

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)  

  useEffect(() => {    //useEffect
    PersonService
      .getAll()
      .then(persons => setPersons(persons))      
  }, [])

  const HandleNameChange = (event) => setNewName(event.target.value)   
  const HandleNumberChange = (event) => setNewNumber(event.target.value)
  const HandleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) // filter

  const AddPerson = (event) => {    
    event.preventDefault()   //disable submitting form to server

    if (NameChecking.IsNameAlreadyAdded(persons, newName))
    {
      if (window.confirm(`You want to update ${newName} contact?`))
      {
        const person = persons.find(person => person.name === newName) // find       
        const changedPerson = {...person, number: newNumber}
        
        PersonService
          .update(changedPerson.id, changedPerson)
          .then(updatedPerson => setPersons(persons.map(person => person.id !== changedPerson.id ? person : updatedPerson)))
      }
    }
    else if (newName !== '')
    {
      
      const newPerson = {
        name: newName,
        number: newNumber   
      }      
      
      PersonService
        .create(newPerson)      
        .then(newPerson => {          
          setMessage(`Added ${newPerson.name}`) //message about add person
          setTimeout(() => {setMessage(null)}, 2000)
          setPersons(persons.concat(newPerson))          
        })
    }

    setNewName('')
    setNewNumber('')
  } 

  const DeletePerson = (person) =>
  {
    if (window.confirm(`Delete ${person.name}?`))
    {
      PersonService
        .deletePerson(person.id)
        .then(() => setPersons(persons.filter(savedPerson => savedPerson.id !== person.id)))
        .catch(() => {
          isError = true
          setMessage(`Information about ${person.name} has already been removed from server`) //error message 
          setTimeout(() => {           
            setMessage(null)
            isError = false
          }, 2000)   
          setPersons(persons.filter(savedPerson => savedPerson.id !== person.id))         
        })        
    }
  }

  return ( // forms
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} isError={isError}/>
        <Filter value={filter} onChange={HandleFilterChange}/>       
      <h2>Add a new contact</h2>     
        <PersonForm name={newName} number={newNumber} onNameChange={HandleNameChange} onNumberChange={HandleNumberChange} onSubmit={AddPerson}/>
      <h2>Numbers</h2>    
        <Persons persons={personsToShow} onDelete={DeletePerson}/>    
    </div>
  )
}

export default App