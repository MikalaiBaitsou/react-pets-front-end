import { useNavigate, useParams } from "react-router"
import { Navigate } from "react-router"


export default function PetDetail(props){

    // null is the orignal value of selectedPet
   
    // petId is coming from the route
    // <Route path='/pets/:petId' element={<PetDetail deletePet={deletePet} pets={pets}/>} />
    const { petId } = useParams()
    const navigate = useNavigate()

    const selectedPet = props.pets.find((pet) => {
        return pet._id === petId
    })  

    function handleDelete(){
        props.deletePet(selectedPet._id)
        navigate('/')
      // navigate('/'); // navigate function is defined above
      // and it is a custom hook from react-router
    }

    return (
        <section>
            <h2>{selectedPet.name}</h2>
            <span>Breed: {selectedPet.breed}</span>
            <br />
            <span>Age: {selectedPet.age}</span>
            <br />
            <button onClick={handleDelete}>Delete</button>
            <br />
        </section>
    )
}