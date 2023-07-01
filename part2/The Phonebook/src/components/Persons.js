import Person from './Person'
import PersonDeleteButton from './PersonDeleteButton'

const Persons = ({persons, onDelete}) => <div>{persons.map(person => 
        <div key={person.id}>
            <Person key={person.id} name={person.name} number={person.number}/>
            <PersonDeleteButton deletePerson={() => onDelete(person)}/>
            <br/>
        </div>
    )}
</div>

export default Persons