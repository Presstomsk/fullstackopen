import Person from './Person'

const Persons = ({persons}) => <p>{persons.map(person => <Person key={person.id} name={person.name} number={person.number}/>)}</p>

export default Persons