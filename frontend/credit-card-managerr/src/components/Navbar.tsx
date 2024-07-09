import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-red-700 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="mr-4">Banco</Link>
        </div>
        <div className="hidden md:flex text-white">
          <Link to="/" className="mr-4">Cartões</Link>
          <Link to="/clients_manager">Clientes</Link>
        </div>
        <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-red-700 text-white p-4">
          <Link to="/" className="block mb-2" onClick={() => setIsOpen(false)}>Cartões</Link>
          <Link to="/clients_manager" className="block" onClick={() => setIsOpen(false)}>Clientes</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
