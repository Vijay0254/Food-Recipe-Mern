import React, { useEffect, useState } from 'react'
import axios from "../utils/Axios"
import { Link } from 'react-router-dom'

const Home = () => {
  const [allRecipe,setallRecipe] = useState([])

  async function getRecipe() {
    const response = await axios.get('/recipe/get-recipe')
    setallRecipe(response.data)
  }

  useEffect(() =>{
    getRecipe()
  },[])

  return (
    <section>
      <div className='px-20'>
        <h2 className='text-4xl font-bold text-center py-7 pb-10'>Recipes</h2>
        {
          allRecipe.map((element) =>(
            <div key={element._id} className='pl-10 flex flex-col gap-y-3'>
              <Link to={`/read-recipe/${element._id}`}><h3 className='text-2xl font-bold'>{element.name}</h3></Link>
              <img className='h-[300px]' src={element.imageURL} alt="" />
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Home