package com.ms.cartoes.cartoes_ms.mapper;

import java.util.UUID;

import org.springframework.beans.BeanUtils;

import com.ms.cartoes.cartoes_ms.dtos.request.ClientRecordDto;
import com.ms.cartoes.cartoes_ms.dtos.response.ClientResponseDto;
import com.ms.cartoes.cartoes_ms.models.ClientModel;
import com.ms.cartoes.cartoes_ms.models.ProposalModel;

public class ClientMapper {

    public ClientModel toModel(ClientRecordDto clientRecordDto) {
        ClientModel clientModel = new ClientModel();
        if (clientRecordDto.clientId() != null && !clientRecordDto.clientId().isEmpty()) {
            clientModel.setClientId(UUID.fromString(clientRecordDto.clientId()));
        }
        BeanUtils.copyProperties(clientRecordDto, clientModel, "clientId", "proposalId");

        if (clientRecordDto.proposalId() != null && !clientRecordDto.proposalId().isEmpty()) {
            ProposalModel proposalModel = new ProposalModel();
            proposalModel.setProposalId(UUID.fromString(clientRecordDto.proposalId()));
            clientModel.setProposal(proposalModel);
        }

        return clientModel;
    }

    public ClientResponseDto toResponseDto(ClientModel clientModel) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();
        clientResponseDto.setClientId(clientModel.getClientId());
        clientResponseDto.setName(clientModel.getName());
        clientResponseDto.setEmail(clientModel.getEmail());
        clientResponseDto.setAccount(clientModel.getAccount());
        clientResponseDto.setLimitCredit(clientModel.getLimitCredit());
        clientResponseDto.setActive(clientModel.getActive());
        clientResponseDto.setProposalId(clientModel.getProposal().getProposalId().toString());
        clientResponseDto.setProposalName(clientModel.getProposal().getName());
        clientResponseDto.setEmailProposalContent(clientModel.getProposal().getEmailContent());

        return clientResponseDto;
    }

    public UUID uuidToString(String uuid) {
        return UUID.fromString(uuid);
    }
}
