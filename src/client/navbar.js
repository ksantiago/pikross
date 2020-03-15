import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/"><div className="title">PIKROSS</div></Link>
    </div>
  )
}

export default Navbar
