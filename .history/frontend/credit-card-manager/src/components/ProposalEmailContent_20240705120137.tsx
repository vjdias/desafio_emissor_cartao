import React from 'react';
import { Client } from '../services/apiService';

interface ProposalEmailContentProps {
  client: Client;
}

const ProposalEmailContent: React.FC<ProposalEmailContentProps> = ({ client }) => {
  const emailContents = {
    PJ: 'Bem-vindo ao nosso serviço de cartão de crédito empresarial. Agradecemos a sua confiança!',
    PF: 'Bem-vindo ao nosso serviço de cartão de crédito pessoal. Estamos felizes em tê-lo como cliente!',
  };

  const content = emailContents[client.proposalName as 'PJ' | 'PF'];

  const emailHtml = `
    <div>
      <h2>Texto do Email de Boas-vindas</h2>
      <p>${content}</p>
      <h3>Informações do Cliente</h3>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr>
          <th>Nome</th>
          <td>${client.name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${client.email}</td>
        </tr>
        <tr>
          <th>Conta</th>
          <td>${client.account}</td>
        </tr>
        <tr>
          <th>Limite de Crédito</th>
          <td>${client.limitCredit}</td>
        </tr>
        <tr>
          <th>Nome da Proposta</th>
          <td>${client.proposalName}</td>
        </tr>
      </table>
    </div>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
  );
};

export default ProposalEmailContent;
