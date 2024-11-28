import React, { useState } from 'react'
import axios from '../utils/Axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Register = () => {

    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()

    async function handleRegister(event) {
        event.preventDefault()
        try{
            const response = await axios.post(`/auth/register`, {username: username, password: password})
            if(response.data.message == "Enter Username and Password")
            {
                toast.warn('Username (or) Password is missing!', {
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
            if(response.data.message == "User already exist"){
                toast.warn('User already exist!', {
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
            if(response.data.message == "User Registered Successfully"){
                setusername("")
                setpassword("")
                navigate('/login')
                toast.success('User Registered!', {
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
        catch(err){
            console.log(`Error in Handle Register - ${err}`)
        }
        
    }

  return (
    <section className='flex justify-center items-center my-20 md:my-44'>
        <div className='flex flex-col gap-5 border-[1px] p-6 border-slate-500 rounded-md w-[300px]'>
            <h1 className='text-3xl font-bold text-center'>Register</h1>
            <form className='' onSubmit={() =>handleRegister(event)}>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='text-lg font-medium'>Username</label>
                    <input value={username} onChange={(event) =>setusername(event.target.value)} className="border-[1px] border-slate-300 px-2 py-1 rounded outline-blue-300 outline-offset-2" type="text" name="name" id="name" placeholder='Username' />
                </div>
                <div className='flex flex-col pt-3'>
                    <label htmlFor="password" className='text-lg font-medium'>Password</label>
                    <input value={password} onChange={(event) =>setpassword(event.target.value)} className="border-[1px] border-slate-300 px-2 py-1 rounded outline-blue-300 outline-offset-2" type="password" name="password" id="password" placeholder='Password' />
                </div>
                <button className='w-full mt-7 bg-green-700 hover:bg-green-500 text-white duration-200 rounded py-1 text-lg'>Register</button>
                <div className='pt-4 flex flex-col'>
                    <span>Already have an Account?</span>
                    <Link to='/login'><button className='w-full bg-red-700 text-white hover:bg-red-500 duration-200 rounded text-lg py-1'>Login</button></Link>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Register