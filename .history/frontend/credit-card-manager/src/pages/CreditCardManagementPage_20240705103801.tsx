import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import Table from '../components/Table';
import { fetchClients, createOrUpdateClient, deleteClient, Client } from '../services/apiService';

const CreditCardManagementPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [proposalName, setProposalName] = useState('');
  const [limitCredit, setLimitCredit] = useState('');

  useEffect(() => {
    const loadClients = async () => {
      const clients = await fetchClients();
      setClients(clients);
      setFilteredClients(clients);
    };
    loadClients();
  }, []);

  const handleSearch = (searchTerm: string, radioValue: string) => {
    const filtered = clients.filter(client =>
      client.name.includes(searchTerm) && client.proposalName === radioValue
    );
    setFilteredClients(filtered);
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setProposalName(client.proposalName);
    setLimitCredit(client.limitCredit.toString());
  };

  const handleUpdateClient = async () => {
    if (selectedClient) {
      const updatedClient = {
        ...selectedClient,
        proposalName,
        limitCredit: parseFloat(limitCredit),
      };
      try {
        const response = await createOrUpdateClient(updatedClient);
        setClients(clients.map(client => (client.clientId === response.clientId ? response : client)));
        setFilteredClients(filteredClients.map(client => (client.clientId === response.clientId ? response : client)));
        setSelectedClient(null);
        console.log('Cliente atualizado com sucesso:', response);
      } catch (error) {
        console.error('Falha ao atualizar o cliente:', error);
      }
    }
  };

  const renderActionButton = (client: Client) => (
    <button
      onClick={() => handleSelectClient(client)}
      className="bg-yellow-500 text-white px-3 py-1 rounded shadow-sm hover:bg-yellow-600 mr-2"
    >
      Emitir Cartão
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Cartões</h1>
      <SearchForm onSearch={handleSearch} />
      {selectedClient && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Emitir Cartão</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Proposta"
              value={proposalName}
              onChange={(e) => setProposalName(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Limite"
              value={limitCredit}
              onChange={(e) => setLimitCredit(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={handleUpdateClient} className="bg-green-500 text-white p-2 rounded-lg shadow-sm hover:bg-green-600">
            Emitir Cartão
          </button>
        </div>
      )}
      {filteredClients.length > 0 ? (
        <Table data={filteredClients} actionButton={renderActionButton} />
      ) : (
        <p className="text-center text-gray-500">Nenhum dado disponível</p>
      )}
    </div>
  );
};

export default CreditCardManagementPage;
