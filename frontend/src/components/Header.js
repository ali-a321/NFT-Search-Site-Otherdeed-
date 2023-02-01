import React from 'react'
import '../App.css' ;
import { Link } from 'react-router-dom'
import kodalogo from "../othersidelogo.jpg"

function Header() {
  return (
    <nav className="headerContainer">
    <div className="title"> 
      <img src= {kodalogo} alt="otherside logo" className="logo"/>
      Otherdeed Search Engine
    </div>
    <ul className="miniheader">
      <li><Link to ="/"> Home </Link> </li>
      <li><Link to = "/search"> Search </Link></li>
    </ul>
  </nav>
  )
}
export default Header