import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
        <h1>Welcome to Pikross</h1>
        <div>
        <Link to="/board"><button>1 Player</button></Link>
        <Link to="/board"><button disabled>2 Player</button></Link>
        </div>
    </div>
  )
}
export default Home
