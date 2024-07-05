import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import Table from '../components/Table';
import { fetchClients, createOrUpdateClient, Client } from '../services/apiService';

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

  const handleSendProposal = async (clientId: string) => {
    const proposal = "Detalhes da sua proposta de crédito";
    try {
      await components(clientId, proposal);
      console.log('Proposta enviada com sucesso');
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
