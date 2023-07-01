const IsNameAlreadyAdded = (persons, newName) => persons.filter(person => person.name === newName).length > 0
 
const NameChecking = { IsNameAlreadyAdded } 

export default NameChecking