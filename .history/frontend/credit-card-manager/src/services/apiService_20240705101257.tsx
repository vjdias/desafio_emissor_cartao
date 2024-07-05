import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8081/client';

export interface Client {
  clientId: string;
  account: string;
  name: string;
  email: string;
  proposalName: string;
  limitCredit: number;
}

export const fetchClients = async (): Promise<Client[]> => {
  const response: AxiosResponse<Client[]> = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const createOrUpdateClient = async (client: Client): Promise<Client> => {
  const response: AxiosResponse<Client> = await axios.post(`${API_URL}/create_or_update`, client);
  return response.data;
};

export const deleteClient = async (clientId: string): Promise<void> => {
  await axios.delete(`${API_URL}/delete/${clientId}`);
};
