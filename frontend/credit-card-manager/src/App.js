import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreditCardManagementPage from './pages/CreditCardManagementPage';
import ClientManagementPage from './pages/ClientManagementPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<CreditCardManagementPage />} />
            <Route path="/clients_manager" element={<ClientManagementPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
