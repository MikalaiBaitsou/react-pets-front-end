
import { useState } from 'react'
import './PetForm.css'

const initialState = {
    name: '',
    age: 0,
    breed: ''
}

export default function PetForm(props) {

    const [formData, setFormData] = useState(initialState)

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        // this is coming from the app component
        // lifting the formData up the app, 
        // so we can make our POST fetch call to 
        // express api
        props.createPet(formData)
        setFormData(initialState)
    }

    return (
        <form className='pet-form' onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' id='name' value={formData.name} onChange={handleChange} />
            <label htmlFor="age">Age:</label>
            <input type="number" name='age' id='age' value={formData.age} onChange={handleChange} />
            <label htmlFor="breed">Breed:</label>
            <input type="text" name='breed' id='breed' value={formData.breed} onChange={handleChange} />
            <button type='submit'>Create Pet</button>
        </form>
    )
}