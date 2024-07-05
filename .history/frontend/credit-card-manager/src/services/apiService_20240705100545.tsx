import axios from 'axios';

const API_URL = 'http://localhost:8081/client';

export const fetchClients = async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const createOrUpdateClient = async (client: any) => {
  const response = await axios.post(`${API_URL}/create_or_update`, client);
  return response.data;
};

export const deleteClient = async (clientId: string) => {
  await axios.delete(`${API_URL}/delete/${clientId}`);
};
