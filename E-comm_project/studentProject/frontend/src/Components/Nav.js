import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>NavBar
            <Link to="/Home">Home</Link>
            <Link to="/Blogs">Blogs</Link>
            <Link to="/Contact">Contact</Link>
        </div>
    )
}

export default Nav