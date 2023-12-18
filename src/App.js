import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="relative flex min-h-screen bg-black">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/game" element={<Game />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
    </div>
  );
}

export default App;
