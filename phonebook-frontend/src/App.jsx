import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import './App.css'
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import servicePerson from './services/persons'
import { SuccessNotification, ErrorNotification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  //useEffect for fetching data from local server
  useEffect(() => {
    console.log('effect')
    servicePerson
        .getAllPersons()
        .then(initialPersonList => {
          console.log('promise fullfilled')
          setPersons(initialPersonList)
        })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (e) => {
    e.preventDefault()
    const personsObj = {
      name: newName,
      number: newPhone,
      //id: persons.length + 1
    }
    const found = persons.find(person => person.name === personsObj.name)
    if(found){
      if (window.confirm(personsObj.name + ' is already added to phonebook. Do you want to update phone number?')){
        servicePerson
            .updateP(found.id, {name: found.name, number: newPhone})
            .then(returnedPerson => {
              console.log(returnedPerson)
              setPersons([ ...persons ])
              setSuccessMessage(`Phone number of ${found.name} successfully updated`)
              setTimeout(() => {
                setSuccessMessage('')
              }, 5000);
              setNewName('')
              setNewPhone('')
            })
      }
      
    } else {
      //setPersons(persons.concat(personsObj))
      //setNewName('')
      //setNewPhone('')
      servicePerson
          .createPerson(personsObj)
          .then(returnedPerson => {
            setPersons([ ...persons, returnedPerson])
            setSuccessMessage(`${personsObj.name} successfully added`)
            setTimeout(() => {
              setSuccessMessage('')
            }, 5000);
            setNewName('')
            setNewPhone('')
          })
    }
  }

  const deletePerson = (id) => {
    if (window.confirm(`Are sure you want to delete the person with ID ${id}?`)){
      servicePerson
        .deleteP(id)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`Information have been already removed from server`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        })
    }
  }
  
  return (
    <div className="container">
      <h1>Phonebook</h1>
      <SuccessNotification message={successMessage} />
      <ErrorNotification error={errorMessage} />
      <Filter 
        newSearch={newSearch} 
        setNewSearch={setNewSearch} 
      />
      
      <h2>Add a new person</h2>
      <PersonForm 
        newName={newName} 
        setNewName={setNewName} 
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        addPerson={addPerson} 
      />

      <h2>Numbers</h2>
      <div> 
        {persons.filter((nameToSearch) =>{
          if (newSearch == ""){
            return nameToSearch
          } else if(nameToSearch.name.toLowerCase().includes(newSearch.toLowerCase())){
            return nameToSearch
          }
        }).map(person => 
        <Persons key={person.name} person={person} deletePerson={deletePerson} />)}</div>
      {console.log(persons)}
    </div>
  )
}

export default App