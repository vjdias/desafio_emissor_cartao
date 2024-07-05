import React, { useState, useEffect, FormEvent } from 'react';
import { fetchClients, createOrUpdateClient, deleteClient, Client } from '../services/apiService';
import { FaTrash } from 'react-icons/fa'; // Adicione esta linha para importar o ícone de exclusão
import Table from '../components/Table';

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
  });

  useEffect(() => {
    const loadClients = async () => {
      const clients = await fetchClients();
      setClients(clients);
    };
    loadClients();
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

  const renderActionButton = (client: Client) => (
    <button
      onClick={() => handleDeleteClient(client.clientId)}
      className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:bg-red-600"
    >
      <FaTrash />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white p-2 mb-4 rounded-lg">
        {showForm ? 'Cancelar' : 'Adicionar Novo Cliente'}
      </button>

      {showForm && (
        <form onSubmit={handleAddClient} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Conta</label>
              <input
                type="text"
                value={newClient.account}
                onChange={(e) => setNewClient({ ...newClient, account: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Nome</label>
              <input
                type="text"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Proposta</label>
              <input
                type="text"
                value={newClient.proposalName}
                onChange={(e) => setNewClient({ ...newClient, proposalName: e.target.value })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Limite</label>
              <input
                type="number"
                value={newClient.limitCredit}
                onChange={(e) => setNewClient({ ...newClient, limitCredit: parseFloat(e.target.value) })}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg shadow-sm hover:bg-green-600">
            Adicionar Cliente
          </button>
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
