import React from 'react'
import Nav from './Components/Nav.js'
import Home from './pages/Home.js'
import Blogs from './pages/Blogs.js'
import Contact from './pages/Contact.js'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App

