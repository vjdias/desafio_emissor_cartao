package com.ms.cartoes.cartoes_ms.mapper;

import org.springframework.stereotype.Component;

import com.ms.cartoes.cartoes_ms.dtos.response.ProposalDto;
import com.ms.cartoes.cartoes_ms.models.ProposalModel;

@Component
public class ProposalMapper {

    public ProposalDto toDTO(ProposalModel model) {
        ProposalDto dto = new ProposalDto();
        dto.setProposalId(model.getProposalId());
        dto.setName(model.getName());
        dto.setDescription(model.getDescription());
        return dto;
    }

    public ProposalModel toModel(ProposalDto dto) {
        ProposalModel model = new ProposalModel();
        model.setProposalId(dto.getProposalId());
        model.setName(dto.getName());
        model.setDescription(dto.getDescription());
        return model;
    }
}