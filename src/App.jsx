// I'm on react-router branch!

// 1.1








import { useState, useEffect } from 'react'
import './App.css'

import PetList from './components/PetList/PetList'
import PetForm from './components/PetForm/PetForm'
import PetDetail from './components/PetDetail/PetDetail'
// petService.index, petService.create, etc,
// each function you define in the petService file
// will be a method on the petService object
import * as petService from './services/petService'

function App() {
  const [pets, setPets] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null); // will be an {}

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

  async function deletePet(petIdFromPetDetails){
    try {
      const response = await petService.deletePet(petIdFromPetDetails)

      // one way to handle an error from the response
      if(response.err){
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
      setSelectedPet(null) // remove the pet from the selectedPet state

    } catch(err){
      console.log(err)
    }
  }

  function handleFormOpen(){
    setIsFormOpen(!isFormOpen)
  }

  const buttonTextForForm = isFormOpen ? 'close form' : 'New Pet';

  return (
    <div className='App'>
      <PetList setSelectedPet={setSelectedPet} pets={pets} handleFormOpen={handleFormOpen} buttonTextForForm={buttonTextForForm}/>
      
      {selectedPet ?  <PetDetail deletePet={deletePet} selectedPet={selectedPet} setSelectedPet={setSelectedPet}/> : null}
     
      {isFormOpen ? <PetForm createPet={createPet} /> : null}
      
      
      
    </div>
  )
}

export default App