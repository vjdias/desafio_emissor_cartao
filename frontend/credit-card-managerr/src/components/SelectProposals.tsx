import React from 'react';

interface Proposal {
  id: string;
  name: string;
  content: string;
}

interface SelectProposalsProps {
  selectedProposal: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const proposals: Proposal[] = [
  { id: '1', name: 'Proposta 1', content: 'Detalhes da proposta 1' },
  { id: '2', name: 'Proposta 2', content: 'Detalhes da proposta 2' },
  { id: '3', name: 'Proposta 3', content: 'Detalhes da proposta 3' },
];

const SelectProposals: React.FC<SelectProposalsProps> = ({ selectedProposal, onChange }) => {
  return (
    <select
      value={selectedProposal}
      onChange={onChange}
      className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="" disabled>Selecione uma proposta</option>
      {proposals.map((proposal) => (
        <option key={proposal.id} value={proposal.id}>
          {proposal.name}
        </option>
      ))}
    </select>
  );
};

export default SelectProposals;
