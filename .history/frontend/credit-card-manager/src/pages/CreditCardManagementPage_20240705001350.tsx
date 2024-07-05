import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import Table from '../components/Table';
import { fetchClients, sendCreditProposal } from '../services/apiService';

interface Client {
  id: string;
  account: string;
  name: string;
  proposal: string;
  limit: string;
  client: string;
  accountType: string;
}

const mockData: Client[] = [
  { id: '1', account: '12345', name: 'John Doe', proposal: 'Proposta 1', limit: '1000', client: 'Cliente 1', accountType: 'option1' },
  { id: '2', account: '67890', name: 'Jane Smith', proposal: 'Proposta 2', limit: '2000', client: 'Cliente 2', accountType: 'option2' },
];

const CreditCardManagementPage = () => {
  const [clients, setClients] = useState<Client[]>(mockData);
  const [filteredClients, setFilteredClients] = useState<Client[]>(mockData);

  const handleSearch = (searchTerm: string, radioValue: string) => {
    const filtered = clients.filter(client =>
      client.name.includes(searchTerm) && client.accountType === radioValue
    );
    setFilteredClients(filtered);
  };

  const handleSendProposal = async (clientId: string) => {
    const proposal = "Detalhes da sua proposta de crédito";
    try {
      const response = await sendCreditProposal(clientId, proposal);
      console.log('Proposta enviada com sucesso:', response);
    } catch (error) {
      console.error('Falha ao enviar a proposta:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Cartões</h1>
      <SearchForm onSearch={handleSearch} />
      {filteredClients.length > 0 ? (
        <Table data={filteredClients} onSendProposal={handleSendProposal} />
      ) : (
        <p className="text-center text-gray-500">Nenhum dado disponível</p>
      )}
    </div>
  );
};

export default CreditCardManagementPage;
