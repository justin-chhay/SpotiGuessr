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
    <div className="relative flex h-screen bg-black">
      <div className="flex-1">
        <div className="h-full pb-40">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/game" element={<Game />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
