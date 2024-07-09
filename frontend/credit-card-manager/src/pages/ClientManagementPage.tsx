import React, { useState, useEffect, FormEvent } from 'react';
import { fetchClients, createOrUpdateClient, deleteClient, Client, fetchProposals, Proposal } from '../services/apiService';
import { FaTrash } from 'react-icons/fa';
import Table from '../components/Table';
import CreditCardProposal from '../components/CreditCardProposal';
import { NumericFormat, PatternFormat, NumberFormatValues } from 'react-number-format';

const ClientManagementPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState<Client>({
    clientId: '',
    name: '',
    email: '',
    account: '',
    proposalName: '',
    limitCredit: 0,
    active: true,
    proposalId: ''
  });
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      const clients = await fetchClients();
      setClients(clients);
    };

    const loadProposals = async () => {
      const fetchedProposals = await fetchProposals();
      setProposals(fetchedProposals);
    };

    loadClients();
    loadProposals();
  }, []);

  const handleAddClient = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const createdClient = await createOrUpdateClient(newClient);
      setClients([...clients, createdClient]);
      setShowForm(false);
      setNewClient({
        clientId: '',
        name: '',
        email: '',
        account: '',
        proposalName: '',
        limitCredit: 0,
        active: true,
        proposalId: ''
      });
    } catch (error) {
      console.error('Falha ao adicionar o cliente:', error);
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      setClients(clients.filter(client => client.clientId !== clientId));
      console.log('Cliente deletado com sucesso');
    } catch (error) {
      console.error('Falha ao deletar o cliente:', error);
    }
  };

  const handleProposalChange = (proposalId: string, proposalName: string, content: string) => {
    setNewClient({ ...newClient, proposalId, proposalName: proposalName});
  };

  const renderActionButton = (client: Client) => (
    <button
      onClick={() => handleDeleteClient(client.clientId)}
      className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:bg-red-600"
    >
      <FaTrash />
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white p-2 mb-4 rounded-lg">
          Adicionar Novo Cliente
        </button>
      )}

      {showForm && (
        <form onSubmit={handleAddClient} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md overflow-x-auto rounded-lg shadow-sm border-solid border-[1px]">
          <h2 className="text-xl font-bold mb-4">Novo Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="text-gray-700">Conta</span>
              <PatternFormat
                value={newClient.account}
                format="#### #### #### ####"
                mask="_"
                onValueChange={(values) => {
                  const { value } = values;
                  setNewClient({ ...newClient, account: value });
                }}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Nome</span>
              <input
                type="text"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
            </label>
            <CreditCardProposal client={newClient} onProposalChange={handleProposalChange} />
            <label className="block">
              <span className="text-gray-700">Limite</span>
              <NumericFormat
                value={newClient.limitCredit}
                thousandSeparator={true}
                prefix={'R$ '}
                decimalScale={2}
                fixedDecimalScale={true}
                onValueChange={(values: NumberFormatValues) => {
                  const { floatValue } = values;
                  setNewClient({ ...newClient, limitCredit: floatValue || 0 });
                }}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white p-2 rounded-lg shadow-sm hover:bg-gray-600">
              Cancelar
            </button>
            <button type="submit" className="bg-green-500 text-white p-2 rounded-lg shadow-sm hover:bg-green-600">
              Adicionar Cliente
            </button>
          </div>
        </form>
      )}
      
      {clients.length > 0 ? (
        <Table data={clients} actionButton={renderActionButton} />
      ) : (
        <p className="text-center text-gray-500">Nenhum dado disponível</p>
      )}
    </div>
  );
};

export default ClientManagementPage;
