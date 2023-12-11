import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'

function App() {

  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/search' element={<Search/>} />
      </Routes>
    </React.Fragment>
  )
};

export default App;
