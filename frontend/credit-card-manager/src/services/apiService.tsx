import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8081';

export interface Client {
  clientId: string;
  account: string;
  name: string;
  email: string;
  proposalName: string;
  limitCredit: number;
  active: boolean;
  proposalId: string;
}

export interface Proposal {
  proposalId: string;
  name: string;
  description: string;
}

export const fetchClients = async (): Promise<Client[]> => {
  const response: AxiosResponse<Client[]> = await axios.get(`${API_URL}/client/list`);
  return response.data;
};

export const createOrUpdateClient = async (client: Client): Promise<Client> => {
  const response: AxiosResponse<Client> = await axios.post(`${API_URL}/client/create_or_update`, client);
  return response.data;
};

export const deleteClient = async (clientId: string): Promise<void> => {
  await axios.delete(`${API_URL}/client/delete/${clientId}`);
};

export const fetchProposals = async (): Promise<Proposal[]> => {
  const response: AxiosResponse<Proposal[]> = await axios.get(`${API_URL}/proposal/list`);
  return response.data;
};
