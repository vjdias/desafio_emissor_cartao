import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import Table from '../components/Table';
import CreditCardProposal from '../components/CreditCardProposal';
import { fetchClients, createOrUpdateClient, Client } from '../services/apiService';

const ClientManagementPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [nameProposal, setNameProposal] = useState<'PJ' | 'PF' | ''>('');
  const [limitCredit, setLimitCredit] = useState('');
  const [emailProposalContent, setEmailProposalContent] = useState('');

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
      client.name.includes(searchTerm) && client.nameProposal === radioValue
    );
    setFilteredClients(filtered);
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setProposalName(client.nameProposal as 'PJ' | 'PF');
    setLimitCredit(client.limitCredit.toString());
    setEmailProposalContent(client.emailProposalContent);
  };

  const handleProposalChange = (proposal: 'PJ' | 'PF', content: string) => {
    setProposalName(proposal);
    setEmailProposalContent(content);
  };

  const handleUpdateClient = async () => {
    if (selectedClient) {
      const updatedClient = {
        ...selectedClient,
        proposalName,
        limitCredit: parseFloat(limitCredit),
        emailProposalContent,
      };
      try {
        //updatedClient.emailProposalContent = generateProposalEmailContent(updatedClient);

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

  const handleCancel = () => {
    setSelectedClient(null);
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
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <SearchForm onSearch={handleSearch} />
      {selectedClient && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Emitir Cartão</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Nome</label>
              <input
                type="text"
                value={selectedClient.name}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Conta</label>
              <input
                type="text"
                value={selectedClient.account}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="text"
                value={selectedClient.email}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Limite</label>
              <input
                type="number"
                value={limitCredit}
                onChange={(e) => setLimitCredit(e.target.value)}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <CreditCardProposal client={selectedClient}
              onProposalChange={handleProposalChange}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button onClick={handleCancel} className="bg-gray-500 text-white p-2 rounded-lg shadow-sm hover:bg-gray-600">
              Cancelar
            </button>
            <button onClick={handleUpdateClient} className="bg-green-500 text-white p-2 rounded-lg shadow-sm hover:bg-green-600">
              Emitir Cartão
            </button>
          </div>
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

export default ClientManagementPage;
