package com.ms.cartoes.cartoes_ms.mapper;

import java.util.UUID;

import org.springframework.beans.BeanUtils;

import com.ms.cartoes.cartoes_ms.dtos.request.ClientRecordDto;
import com.ms.cartoes.cartoes_ms.models.ClientModel;

public class ClientMapper {

    public static ClientModel toModel(ClientRecordDto clientRecordDto) {
        ClientModel clientModel = new ClientModel();
        BeanUtils.copyProperties(clientRecordDto, clientModel);
        if (clientRecordDto.clientId() != null && !clientRecordDto.clientId().isEmpty()) {
            clientModel.setClientId(UUID.fromString(clientRecordDto.clientId()));
        }
        return clientModel;
    }
}
