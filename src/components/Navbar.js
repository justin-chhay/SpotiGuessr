import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <nav class="bg-blue-500 p-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold underline">SpotiGuessr</h1>
        </div>
        <div>
            <a href="/" class="text-black mx-2 hover:underline">Home</a>
            <a href="/search" class="text-black mx-2 hover:underline">Search</a>
        </div>
    </div>
    </nav>



  );
};

export default Navbar;