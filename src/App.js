import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import Login from './pages/Login'

function App() {

  return (
    <React.Fragment>
      <div>
      <Routes>
       <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/search' element={<Search/>} />
      </Routes>
      </div>
    </React.Fragment>
  )
};

export default App;
