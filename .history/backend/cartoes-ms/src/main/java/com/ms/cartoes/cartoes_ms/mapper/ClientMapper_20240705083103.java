package com.ms.cartoes.cartoes_ms.mapper;

import org.springframework.beans.BeanUtils;

import com.ms.cartoes.cartoes_ms.dtos.request.ClientRecordDto;
import com.ms.cartoes.cartoes_ms.models.ClientModel;

public class ClientMapper {

    public static void updateClientModel(ClientModel clientModel, ClientRecordDto clientRecordDto) {
        BeanUtils.copyProperties(clientRecordDto, clientModel);
    }

    public static void copyProperties(ClientRecordDto clientRecordDto, ClientModel clientModel) {
        BeanUtils.copyProperties(clientRecordDto, clientModel);
    }
}
