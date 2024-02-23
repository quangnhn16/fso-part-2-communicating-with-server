const Persons = ({ persons, handleDeleteOnClick }) => {
    return (
        <>
            {persons.map((person, index) => <p key={index}>{person.name} {person.number} <button value={person.id} onClick={handleDeleteOnClick}>delete</button></p>)}
        </>
    )
}

export default Persons