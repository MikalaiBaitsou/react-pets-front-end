// I'M ON THE react-router branch!
// New code on react-router branch
// new code being written
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// react router stuff
import { Routes, Route, useNavigate } from 'react-router'

import Header from './components/Header/Header'
import PetList from './components/PetList/PetList'
import PetForm from './components/PetForm/PetForm'
import PetDetail from './components/PetDetail/PetDetail'
// petService.index, petService.create, etc,
// each function you define in the petService file
// will be a method on the petService object
import * as petService from './services/petService'

function App() {
  const [pets, setPets] = useState([])

  // navigate is a function that we can pass
  // a route path to

  useEffect(() => {

    // define and then call the function immediatly
    async function fetchPets() {
      try {

        const data = await petService.index()
        // check your work before you do anything else!
        console.log(data, ' <- data')
        // every time you update state, go to your 
        // dev tools and look at it!
        setPets(data)
      } catch (err) {
        console.log(err)
      }
    }

    // calling the function
    fetchPets()

  }, []);// empty array says run the use effect, 
  // when the components loads onto the dom

  // use case: We want all of the pets when the page loads

  async function createPet(dataFromTheForm) {
    // lift the dataFromTheForm
    // pass this function to the form component
    // and call it when the user submits the form
    try {
      const newPet = await petService.create(dataFromTheForm)
      console.log(newPet, ' <- this is our newPet')
      setPets([...pets, newPet])
    } catch (err) {
      console.log(err)
    }
  }

  async function deletePet(petIdFromPetDetails) {
    try {
      const response = await petService.deletePet(petIdFromPetDetails)

      // one way to handle an error from the response
      if (response.err) {
        // this forces the err to go to the catch block, the arugment to new Error 
        // will be the value of err in the catch block
        throw new Error(response.err)
      }

      // update our state! filter creates a new array
      const filteredPetsArray = pets.filter((pet) => {
        return pet._id !== petIdFromPetDetails
      })
      // update state with the filtered array
      setPets(filteredPetsArray) // remove from the pet array
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<PetList  pets={pets} />} />
        <Route path='/pets/:petId' element={<PetDetail deletePet={deletePet} pets={pets}/>} />
        <Route path='/pets/new' element={<PetForm createPet={createPet} />} />
        <Route path="*" element={<h1>Nothing Here!</h1>} />
      </Routes>
    </div>
  )
}

export default App
