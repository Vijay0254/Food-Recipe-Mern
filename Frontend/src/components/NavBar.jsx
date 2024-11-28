import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from "../utils/Axios"

const NavBar = () => {

  async function handleLogout() {
    const response = await axios.get(`/auth/logout`)
    if(response.data.message == "Logout Success"){
      toast.success('Logout Successful!', {
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
  }

  return (
    <nav className='bg-gray-800 flex justify-between px-2 md:px-10 text-white items-center py-4'>
      <div className='flex md:gap-x-16 gap-x-3 items-center'>
        <h1 className='md:text-2xl md:w-auto w-[80px] text-xl font-bold'>Food Recipe</h1>
        <div className='flex md:gap-x-5 gap-x-3 items-center'>
          <Link to="create-recipe"><p className='md:text-lg md:font-medium'>Create</p></Link>
          <Link to="saved-recipe"><p className='md:text-lg md:font-medium'>Saved</p></Link>
        </div>
      </div>
      <div>
        {
          window.localStorage.length ?
          <button onClick={handleLogout} className='rounded-lg md:text-lg hover:bg-slate-200 md:font-medium hover:text-black duration-200 md:px-5 px-3 py-2 border-2'>Logout</button>
          :
          <Link to="register"><button className='rounded-lg md:text-lg hover:bg-slate-200 md:font-medium hover:text-black duration-200 md:px-5 px-3 py-2 border-2'>Login/Register</button></Link>
        }
      </div>
    </nav>
  )
}

export default NavBar