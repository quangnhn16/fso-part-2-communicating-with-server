import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import { useEffect } from 'react'
import phonebookService from './services/phonebook'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`noti ${message.type}`}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService.get().then(persons => {
      setPersons(persons)
    })
  }, [])

  const handleNameOnChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberOnChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterOnChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.find(person => person.name === newName)
    if (alreadyAdded) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(alreadyAdded)
        phonebookService.put(alreadyAdded.id, { ...alreadyAdded, number: newNumber }).then(updated => {
          const newPersons = [...persons];
          for (let i = 0; i < newPersons.length; i++) {
            if (newPersons[i].id === updated.id) {
              newPersons[i] = { ...updated }
              break
            }
          }
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setErrorMessage({
            text: `Information of ${updated.name} has been updated!`,
            type: "success"
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }).catch((error) => {
          console.error(error.message);
          setPersons(persons.filter(person => person.id !== alreadyAdded.id))
          setErrorMessage({
            text: `Information of ${alreadyAdded.name} has already been removed from server!`,
            type: "error"
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      phonebookService.post(newPerson).then(person => {
        setPersons([...persons, person])
        setNewName('')
        setNewNumber('')
        setErrorMessage({
          text: `Added ${newPerson.name}`,
          type: "success"
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const handleDeleteOnClick = (event) => {
    const deletePerson = persons.find(person => person.id === event.target.value);
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      phonebookService.del(deletePerson.id).then(() => {
        setPersons(persons.filter(person => person.id !== deletePerson.id))
      })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={newFilter} onChange={handleFilterOnChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addNewPerson} name={newName} handleNameOnChange={handleNameOnChange} number={newNumber} handleNumberOnChange={handleNumberOnChange} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDeleteOnClick={handleDeleteOnClick} />
    </div>
  )
}

export default App