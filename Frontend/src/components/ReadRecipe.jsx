import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "../utils/Axios"

const ReadRecipe = () => {
    
    const { id } = useParams()
    const [recipe,setrecipe] = useState([])
    const [savedRecipe,setsavedRecipe] = useState([])

    async function getARecipe() {
        try{
            const response = await axios.get(`/recipe/single-recipe/${id}`)
            setrecipe(response.data)
        }
        catch(err)
        {
            console.log(`Error in Get A recipe - ${err}`)
        }
    }

    async function getSavedRecipe() {
        try{
            const response = await axios.get(`/recipe/saved-recipe/${id}`)
            console.log(response)
            setsavedRecipe(response.data)
        }
        catch(err)
        {
            console.log(`Error in Get Saved recipe - ${err}`)
        }
    }

    useEffect(() =>{
        getARecipe()
        getSavedRecipe()
    },[])

    async function handleSavedRecipe(recipeId){
        try{
            console.log("id",id)
            const response = await axios.put(`/recipe/saved`, {id, recipeId})
            console.log(response)
        }
        catch(err){
            console.log(`Error in Handle Saved recipe - ${err}`)
        }
    }

  return (
    <section className='py-20'>
        <div className='flex gap-x-10 flex-row-reverse justify-center'>
            <div className='flex flex-col gap-y-4'>
                <h2 className='text-4xl font-bold'>{recipe.name}</h2>
                <button onClick={() =>handleSavedRecipe(recipe._id)} className='bg-yellow-600 text-white hover:bg-yellow-500 text-lg font-medium rounded py-2 px-5'>Save</button>
                <div>
                    <h3 className='text-xl font-bold'>Description:</h3>
                    <p className='font-medium pl-4'>{recipe.description}</p>
                </div>
                <div>
                    <h3 className='text-xl font-bold'>Ingredients</h3>
                    <p className='font-medium pl-4'>{recipe.ingredients}</p>
                </div>
            </div>
            <img className='w-1/2 h-1/2' src={recipe.imageURL} alt="" />

        </div>
    </section>
  )
}

export default ReadRecipe