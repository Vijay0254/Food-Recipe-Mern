import React from 'react'
import Register from './components/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Create from './components/Create'
import Saved from './components/Saved'
import ReadRecipe from './components/readRecipe'

const App = () => {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/create-recipe' element={<Create />} />
        <Route path='/saved-recipe' element={<Saved />} />
        <Route path='/read-recipe/:id' element={<ReadRecipe />} />
      </Routes>
    </main>
  )
}

export default App