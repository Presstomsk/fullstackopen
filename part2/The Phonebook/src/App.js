import { useState } from 'react'

const Persons = ({persons}) => <p>{persons.map(person => <Person key={person.id} name={person.name} number={person.number}/>)}</p>

const Person = ({name, number}) => <>{name} {number}<br /></>

const Filter = ({value, onChange}) => <form><div>Filter shown with: <input value={value} onChange={onChange}/></div></form> 

const PersonForm = ({name, number, onSubmit, onNameChange, onNumberChange}) => {
  return(
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={onNameChange}/>
        </div>
        <div>
          number: <input value={number} onChange={onNumberChange}/>
          </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  )
}

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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