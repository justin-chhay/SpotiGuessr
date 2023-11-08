import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, CardBody} from 'react-bootstrap';
import { useState, useEffect } from 'react'
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
