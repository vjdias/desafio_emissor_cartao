import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchFormProps {
  onSearch: (searchTerm: string, proposalType: 'PJ' | 'PF' | '', activeStatus: true | false | undefined) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proposalType, setProposalType] = useState<'PJ' | 'PF' | ''>('');
  const [activeStatus, setActiveStatus] = useState<true | false | undefined>(undefined);

  const handleSearch = () => {
    onSearch(searchTerm, proposalType, activeStatus);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 py-1 px-2 focus:outline-none border-2 focus:ring-yellow-500 focus:border-yellow-500 font-semibold rounded-l-lg"
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
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            value=""
            checked={proposalType === ''}
            onChange={() => setProposalType('')}
            className="form-radio text-yellow-500"
          />
          <span className="ml-2">Todos</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="PJ"
            checked={proposalType === 'PJ'}
            onChange={() => setProposalType('PJ')}
            className="form-radio text-yellow-500"
          />
          <span className="ml-2">PJ</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="PF"
            checked={proposalType === 'PF'}
            onChange={() => setProposalType('PF')}
            className="form-radio text-yellow-500"
          />
          <span className="ml-2">PF</span>
        </label>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            value=""
            checked={activeStatus === undefined}
            onChange={() => setActiveStatus(undefined)}
            className="form-radio text-yellow-500"
          />
          <span className="ml-2">Todos</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="active"
            checked={activeStatus === true}
            onChange={() => setActiveStatus(true)}
            className="form-radio text-yellow-500"
          />
          <span className="ml-2">Ativo</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="inactive"
            checked={activeStatus === false}
            onChange={() => setActiveStatus(false)}
            className="form-radio text-yellow-500"
          />
          <span className="ml-2">Inativo</span>
        </label>
      </div>
    </div>
  );
};

export default SearchForm;
