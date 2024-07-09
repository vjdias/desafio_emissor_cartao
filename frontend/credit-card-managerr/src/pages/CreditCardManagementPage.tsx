import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import Table from '../components/Table';
import CreditCardProposal from '../components/CreditCardProposal';
import { fetchClients, createOrUpdateClient, Client } from '../services/apiService';
import { NumericFormat, NumberFormatValues } from 'react-number-format';

const CreditCardManagementPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [limitCredit, setLimitCredit] = useState('');
  const [proposalId, setProposalId] = useState<string>('');
  const [proposalName, setProposalName] = useState<string>('');
  const [emailProposalContent, setEmailProposalContent] = useState('');
  const [active, setActive] = useState<boolean>(true); // Add active state

  useEffect(() => {
    const loadClients = async () => {
      const clients = await fetchClients();
      setClients(clients);
      setFilteredClients(clients);
    };

    loadClients();
  }, []);

  const handleSearch = (searchTerm: string, radioValue: 'PJ' | 'PF' | '', activeStatus: true | false | undefined) => {
    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (radioValue === '' || client.proposalName === radioValue) &&
      (activeStatus === undefined || client.active === activeStatus)
    );
    setFilteredClients(filtered);
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setLimitCredit(client.limitCredit.toString());
    setProposalId(client.proposalId);
    setProposalName(client.proposalName);
    setEmailProposalContent(client.proposalName);
    setActive(client.active); // Set active state
  };

  const handleProposalChange = (proposalId: string, proposalName: string, content: string) => {
    setProposalId(proposalId);
    setProposalName(proposalName);
    setEmailProposalContent(content);
  };

  const handleUpdateClient = async () => {
    if (selectedClient) {
      const updatedClient = {
        ...selectedClient,
        limitCredit: parseFloat(limitCredit),
        proposalId,
        proposalName,
        emailProposalContent,
        active, // Include active state
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

  const handleCancel = () => {
    setSelectedClient(null);
  };

  const renderActionButton = (client: Client) => (
    <button
      onClick={() => handleSelectClient(client)}
      className="bg-green-500 text-white px-3 py-1 rounded shadow-sm hover:bg-green-600 mr-2"
    >
      Emitir Cartão
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <SearchForm onSearch={handleSearch} />
      {selectedClient && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md overflow-x-auto rounded-lg shadow-sm border-solid border-[1px]">
          <h2 className="text-xl font-bold mb-4">Emitir Cartão</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Nome</label>
              <input
                type="text"
                value={selectedClient.name}
                className="border p-2 rounded-lg focus:outline-none focus:border-gray-500 w-full bg-gray-200 text-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Conta</label>
              <input
                type="text"
                value={selectedClient.account}
                className="border p-2 rounded-lg focus:outline-none focus:border-gray-500 w-full bg-gray-200 text-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="text"
                value={selectedClient.email}
                className="border p-2 rounded-lg focus:outline-none focus:border-gray-500 w-full bg-gray-200 text-gray-600"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Limite</label>
              <NumericFormat
                value={limitCredit}
                thousandSeparator={true}
                prefix={'R$ '}
                decimalScale={2}
                fixedDecimalScale={true}
                onValueChange={(values: NumberFormatValues) => {
                  const { floatValue } = values;
                  setLimitCredit(floatValue?.toString() || '');
                }}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Ativo</label>
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <CreditCardProposal client={selectedClient} onProposalChange={handleProposalChange} />
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

export default CreditCardManagementPage;
