import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
  <> 
    <Header />
    <Routes> 
          <Route path='/' element= {<Home/> }/> 
          <Route path='/search' element={<Search />} />
        </Routes>
    <Footer />
  </>
  )
}
export default App
