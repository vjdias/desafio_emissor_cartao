import React, { useState, useEffect, FormEvent } from 'react';
import { fetchClients, createOrUpdateClient, deleteClient } from '../services/apiService';

interface Client {
  clientId: string;
  account: string;
  name: string;
  email: string;
  proposalName: string;
  limitCredit: string;
}

const ClientManagementPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState<Client>({ clientId: '', account: '', name: '', email: '', proposalName: '', limitCredit: '' });

  useEffect(() => {
    const loadClients = async () => {
      const clients = await fetchClients();
      setClients(clients);
    };
    loadClients();
  }, []);

  const handleAddClient = async (e: FormEvent) => {
    e.preventDefault();
    const response = await createOrUpdateClient(newClient);
    setClients([...clients, response]);
    setShowForm(false);
    setNewClient({ clientId: '', account: '', name: '', email: '', proposalName: '', limitCredit: '' });
  };

  const handleUpdateClient = async (id: string) => {
    const clientToUpdate = clients.find(client => client.clientId === id);
    if (clientToUpdate) {
      setNewClient(clientToUpdate);
      setShowForm(true);
    }
  };

  const handleDeleteClient = async (id: string) => {
    await deleteClient(id);
    setClients(clients.filter(client => client.clientId !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white p-2 mb-4 rounded-lg">
        {showForm ? 'Cancelar' : 'Adicionar Novo Cliente'}
      </button>

      {showForm && (
        <form onSubmit={handleAddClient} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Conta"
              value={newClient.account}
              onChange={(e) => setNewClient({ ...newClient, account: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Nome"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Nome da Proposta"
              value={newClient.proposalName}
              onChange={(e) => setNewClient({ ...newClient, proposalName: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Limite"
              value={newClient.limitCredit}
              onChange={(e) => setNewClient({ ...newClient, limitCredit: e.target.value })}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded-lg shadow-sm hover:bg-green-600">
            {newClient.clientId ? 'Atualizar Cliente' : 'Adicionar Cliente'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-lg shadow-sm border-solid border-[1px]">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-left rounded-t-lg">
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500 rounded-tl-lg">ID</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Conta</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Nome</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Email</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Proposta</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500">Limite</th>
              <th className="py-2 px-4 border-b border-gray-200 text-gray-500 rounded-tr-lg">Ações</th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">{client.clientId}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.account}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.proposalName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{client.limitCredit}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handleUpdateClient(client.clientId)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded shadow-sm hover:bg-yellow-600 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.clientId)}
                      className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-2 px-4 text-center text-gray-500">Nenhum dado disponível</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientManagementPage;
