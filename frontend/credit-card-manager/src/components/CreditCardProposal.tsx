import React, { useEffect, useState } from 'react';
import { Client, fetchProposals, Proposal } from '../services/apiService';

interface CreditCardProposalProps {
  client: Client;
  onProposalChange: (proposalId: string, proposalName: string, content: string) => void;
}

const CreditCardProposal: React.FC<CreditCardProposalProps> = ({ client, onProposalChange }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    const getProposals = async () => {
      const fetchedProposals = await fetchProposals();
      setProposals(fetchedProposals);
    };

    getProposals();
  }, []);

  const handleProposalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProposalId = event.target.value;
    const selectedProposal = proposals.find(proposal => proposal.proposalId === selectedProposalId);
    if (selectedProposal) {
      onProposalChange(selectedProposal.proposalId, selectedProposal.name, selectedProposal.description);
    }
  };

  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700">Proposta</label>
      <select
        value={client.proposalId}
        onChange={handleProposalChange}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      >
        <option value="">Selecione uma proposta</option>
        {proposals.map(proposal => (
          <option key={proposal.proposalId} value={proposal.proposalId}>
            {proposal.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CreditCardProposal;
