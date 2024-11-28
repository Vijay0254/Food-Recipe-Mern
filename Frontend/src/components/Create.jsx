import React, { useState } from 'react'
import axios from '../utils/Axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Create = () => {

    // const [name,setname] = useState("")
    // const [description,setdescription] = useState("")
    // const [ingredients,setingredients] = useState("")
    // const [imageURL,setimageURL] = useState("")
    // const [id,setid] = useState(window.localStorage.getItem("id"))
    const [recipe,setrecipe] = useState({
        name: "",
        description: "",
        ingredients: "",
        imageURL: "",
        userId: window.localStorage.getItem("id")
    })
    const navigate = useNavigate()

    function handleChange(event) {
        console.log(event.target.name, event.target.value)
        setrecipe({...recipe, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const response = await axios.post(`/recipe/create-recipe`, {name: recipe.name, description: recipe.description, ingredients: recipe.ingredients, imageURL: recipe.imageURL, userId: recipe.userId}, {withCredentials: true})
            console.log(recipe)
            if(response.data.message == "Contents are missing"){
                toast.warn('Fill everything!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            if(response.data.message == "Recipe Created"){
                toast.success('Recipe created!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    setrecipe("")
                    navigate("/")
            }
        }
        catch(err){
            console.log(`Error in Handle Submit in Create Ingredients - ${err}`)
        }
    }

  return (
    <section className='flex justify-center items-center my-10 md:my-[78px]'>
        <div className='flex flex-col gap-5 border-[1px] p-6 border-slate-500 rounded-md w-[300px] md:w-[500px]'>
            <h1 className='text-3xl font-bold text-center'>Create Recipe</h1>
            <form className='flex flex-col gap-3' onSubmit={() =>handleSubmit(event)}>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='text-lg font-medium'>Name</label>
                    <input value={recipe.name} onChange={() =>handleChange(event)} className="border-[1px] border-slate-300 px-2 py-1 rounded outline-blue-300 outline-offset-2" type="text" name="name" id="name" placeholder='Name' />
                </div>
                <div className='flex flex-col pt-3'>
                    <label htmlFor="description" className='text-lg font-medium'>Description</label>
                    <input value={recipe.description} onChange={() =>handleChange(event)} className="border-[1px] border-slate-300 px-2 py-1 rounded outline-blue-300 outline-offset-2" type="text" name="description" id="description" placeholder='Description' />
                </div>
                <div className='flex flex-col pt-3'>
                    <label htmlFor="ingredients" className='text-lg font-medium'>Ingredients</label>
                    <input value={recipe.ingredients} onChange={() =>handleChange(event)} className="border-[1px] border-slate-300 px-2 py-1 rounded outline-blue-300 outline-offset-2" type="text" name="ingredients" id="ingredients" placeholder='Ingredients' />
                </div>
                <div className='flex flex-col pt-3'>
                    <label htmlFor="imageURL" className='text-lg font-medium'>Image URL</label>
                    <input value={recipe.imageURL} onChange={() =>handleChange(event)} className="border-[1px] border-slate-300 px-2 py-1 rounded outline-blue-300 outline-offset-2" type="text" name="imageURL" id="imageURL" placeholder='Image URL' />
                </div>
                <button className='w-full mt-4 bg-green-700 hover:bg-green-500 text-white duration-200 rounded py-2 text-lg'>Submit</button>
            </form>
        </div>
    </section>
  )
}

export default Create