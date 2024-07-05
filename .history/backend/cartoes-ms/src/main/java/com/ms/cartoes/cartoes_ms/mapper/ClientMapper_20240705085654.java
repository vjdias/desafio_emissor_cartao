package com.ms.cartoes.cartoes_ms.mapper;

import java.util.UUID;

import org.springframework.beans.BeanUtils;

import com.ms.cartoes.cartoes_ms.dtos.request.ClientRecordDto;
import com.ms.cartoes.cartoes_ms.models.ClientModel;

public class ClientMapper {

    public ClientModel ToModel(ClientRecordDto clientRecordDto) {
        ClientModel clientModel = new ClientModel();
        if (clientRecordDto.clientId() != null && !clientRecordDto.clientId().isEmpty()) {
            clientModel.setClientId(UUID.fromString(clientRecordDto.clientId()));
        }
        BeanUtils.copyProperties(clientRecordDto, clientModel, "clientId");
        return clientModel;
    }
    
}
