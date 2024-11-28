import React, { useState } from 'react'
import axios from '../utils/Axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {

    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault()
        try{
            const response = await axios.post('/auth/login', {username: username, password: password}, {withCredentials: true})
            if(response.data.message == "User Doesn't exist")
            {
                toast.warn('Register Please!', {
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
            if(response.data.message == "Passwrong is wrong"){
                toast.warn('Password is wrong!', {
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
            if(response.data.message == "User Logged in"){
                window.localStorage.setItem("id", response.data.id)
                setusername("")
                setpassword("")
                navigate('/')
                toast.success('Logged in!', {
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
            console.log(`Error in Handle Login - ${err}`)
        }
    }

  return (
    <section className='flex justify-center items-center my-20 md:my-44'>
        <div className='flex flex-col gap-5 border-[1px] p-6 border-slate-500 rounded-md w-[300px]'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <form className='' onSubmit={() =>handleLogin(event)}>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='text-lg font-medium'>Username</label>
                    <input value={username} onChange={(event) =>setusername(event.target.value)} className="border-[1px] border-slate-300 px-2 py-1 rounded outline-blue-300 outline-offset-2" type="text" name="name" id="name" placeholder='Username' />
                </div>
                <div className='flex flex-col pt-3'>
                    <label htmlFor="password" className='text-lg font-medium'>Password</label>
                    <input value={password} onChange={(event) =>setpassword(event.target.value)} className="border-[1px] border-slate-300 px-2 py-1 rounded outline-blue-300 outline-offset-2" type="password" name="password" id="password" placeholder='Password' />
                </div>
                <button className='w-full mt-7 bg-green-700 hover:bg-green-500 text-white duration-200 rounded py-1 text-lg'>Login</button>
                <div className='pt-4 flex flex-col'>
                    <span>Are you new?</span>
                    <Link to='/register'><button className='w-full bg-red-700 text-white hover:bg-red-500 duration-200 rounded text-lg py-1'>Register</button></Link>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Login