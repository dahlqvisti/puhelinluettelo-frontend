import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import NotificationAdd from './components/notifications/NotificationAdd'
import NotificationDelete from './components/notifications/NotificationDelete'
import NotificationError from './components/notifications/NotificationError'
import NotificationReplace from './components/notifications/NotificationReplace'






 
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterList, setFilterList] = useState([{name:'' , number: ''}])
  const [showAll, setShowAll] = useState(true)
  const [addedMessage, setAddedMessage] = useState(null)
  const [deletedMessage, setDeletedMessage] = useState(null)
  const [replacedMessage, setReplacedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    personService
    .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const checkName = (arr, val) => {
    return arr.some(element => element.name === val); 
  }
  

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }    
    setPersons(persons.concat(personObject));
    personService
    .create(personObject)
    .then(returnedPerson => {
  
      ///setPersons(persons.concat(returnedPerson.data));
      setAddedMessage(`Added ${newName}`)
      setTimeout(() => {
        setAddedMessage(null)
      }, 4000)
      setNewName('') 
      setNewNumber('')
      
    })
    .catch(error => {
      let messageError = error.response.data.error;
      console.log(messageError)
      setErrorMessage(`${messageError}`)
      setTimeout(() => { setErrorMessage(null)}, 4000)
    })
  }


  const rePlacePerson = (event) => {
    event.preventDefault();
 
  const personObject = {
    name: newName,
    number: newNumber
  }    
  
  const person = persons.find(p => p.name === newName); 

  console.log('ID',person.id);
  const changedPerson = {...person, number: newNumber}
  console.log('changedPersons ', changedPerson); 

  if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
    
  personService
  .update(person.id, changedPerson)
  .then(response => {
    setPersons(persons.map(person => person.id !== changedPerson.id ? person : response.data))
   
    setReplacedMessage(`Replaced ${newName}`)
    setTimeout(() => {
      setReplacedMessage(null)
    }, 4000)
  })

  .catch(error => {
  setErrorMessage(`Information of ${newName} has already deleted  from server`); 
  setTimeout(() => {
    setErrorMessage(null)
  }, 4000)
})
    
}}
  
  const remove = (id) => {

    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name} ?`)) {
            
    personService
    .remove(id)
    .then(response => {
      console.log(response);
      setPersons(persons.filter(p => p.id !==id))
     
    })
    setDeletedMessage(`Deleted ${person.name}`)
    setTimeout(() => {
      setDeletedMessage(null)
    }, 4000)
  }
  }

  const handleNameChange = (event) => {
    
    setShowAll(true);
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
        
    setNewNumber(event.target.value)
  }
  let filtered = '';
  const handleFilterChange = (event) => {
    setShowAll(false);
    filtered = persons.filter(person => person.name.toUpperCase().includes(event.target.value.toUpperCase()));
    

    setFilterList(filtered);
      } 
  
  const personsToShow = showAll ? persons : filterList; 

 

  const message = () => {
    alert(`${newName} is already added to phonebook`); 
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <NotificationAdd  message={addedMessage} />
      <NotificationDelete message={deletedMessage} />
      <NotificationReplace message={replacedMessage} />
      <NotificationError message={errorMessage} />

    

      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add new</h2>
     
     <PersonForm 
      checkName={checkName}
     persons={persons} newName={newName}
        rePlacePerson={rePlacePerson} addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
     />
      
      <h2>Numbers</h2>
      
    {personsToShow.map(person =>  
      <Person
          key={person.name}
          name={person.name}
          number={person.number}
          remove={() => remove(person.id)}
      
      />

    )}

 
    </div>
  )

}

export default App
