import { Client } from '../../services/apiService';

const generateProposalEmailContent = (client: Client): string => {
  const emailContents = {
    PJ: 'Bem-vindo ao nosso serviço de cartão de crédito empresarial. Agradecemos a sua confiança!',
    PF: 'Bem-vindo ao nosso serviço de cartão de crédito pessoal. Estamos felizes em tê-lo como cliente!',
  };

  const proposalDescriptions = {
    PJ: 'Esta proposta de cartão de crédito é especialmente desenvolvida para atender às necessidades da sua empresa, proporcionando benefícios exclusivos e flexibilidade financeira.',
    PF: 'Esta proposta de cartão de crédito é especialmente desenvolvida para você, proporcionando benefícios exclusivos e flexibilidade financeira para suas compras pessoais.',
  };

  const content = emailContents[client.proposalName as 'PJ' | 'PF'];
  const description = proposalDescriptions[client.proposalName as 'PJ' | 'PF'];

  return `
    <div>
      <h2>Bem-vindo, ${client.name}!</h2>
      <p>${content}</p>
      <p>${description}</p>
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
};

export default generateProposalEmailContent;
