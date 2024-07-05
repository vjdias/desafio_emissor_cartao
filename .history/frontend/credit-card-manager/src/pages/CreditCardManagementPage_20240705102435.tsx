import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import Table from '../components/Table';
import { fetchClients, createOrUpdateClient, deleteClient, Client } from '../services/apiService';

const CreditCardManagementPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

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

  const handleCreateOrUpdateClient = async (clientId: string) => {
    const clientToUpdate = clients.find(client => client.clientId === clientId);
    if (clientToUpdate) {
      try {
        const updatedClient = await createOrUpdateClient(clientToUpdate);
        setClients(clients.map(client => (client.clientId === updatedClient.clientId ? updatedClient : client)));
        setFilteredClients(filteredClients.map(client => (client.clientId === updatedClient.clientId ? updatedClient : client)));
        console.log('Cliente atualizado com sucesso:', updatedClient);
      } catch (error) {
        console.error('Falha ao atualizar o cliente:', error);
      }
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      setClients(clients.filter(client => client.clientId !== clientId));
      setFilteredClients(filteredClients.filter(client => client.clientId !== clientId));
      console.log('Cliente deletado com sucesso');
    } catch (error) {
      console.error('Falha ao deletar o cliente:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Cartões</h1>
      <SearchForm onSearch={handleSearch} />
      {filteredClients.length > 0 ? (
        <Table data={filteredClients} onSendProposal={handleCreateOrUpdateClient} onDeleteClient={handleDeleteClient} />
      ) : (
        <p className="text-center text-gray-500">Nenhum dado disponível</p>
      )}
    </div>
  );
};

export default CreditCardManagementPage;
