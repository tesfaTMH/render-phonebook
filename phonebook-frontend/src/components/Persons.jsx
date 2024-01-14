const Persons = ({ person, deletePerson }) => {
    return (
        <div>
            {person.name} : {person.number}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
          
    )
}

export default Persons