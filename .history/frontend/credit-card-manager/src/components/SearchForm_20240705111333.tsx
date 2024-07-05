import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [radioValue, setRadioValue] = useState('option1');

  const handleSearch = () => {
    onSearch(searchTerm, radioValue);
  };
  // text-md py-1 px-2 focus:outline-none border-2 focus:ring-yellow-500 focus:border-yellow-500 font-semibold rounded-l
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 py-1 px-2 focus:outline-none border-2 focus:ring-yellow-500 focus:border-yellow-500 font-semibold rounded-l-lg "
          placeholder="Buscar cliente"
          style={{ height: '40px' }}
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          style={{ height: '40px' }}
        >
          <FaSearch />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="option1"
            checked={radioValue === 'option1'}
            onChange={() => setRadioValue('option1')}
            className="form-radio text-yellow-500"
          />
          <span className="ml-2">Ativo</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="option2"
            checked={radioValue === 'option2'}
            onChange={() => setRadioValue('option2')}
            className="form-radio text-yellow-500"
          />
          <span className="ml-2">Cliente ativo</span>
        </label>
      </div>
    </div>
  );
};

export default SearchForm;
