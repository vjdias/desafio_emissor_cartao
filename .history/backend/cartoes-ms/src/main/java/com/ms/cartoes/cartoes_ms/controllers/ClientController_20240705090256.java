package com.ms.cartoes.cartoes_ms.controllers;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.cartoes.cartoes_ms.dtos.request.ClientRecordDto;
import com.ms.cartoes.cartoes_ms.mapper.ClientMapper;
import com.ms.cartoes.cartoes_ms.models.ClientModel;
import com.ms.cartoes.cartoes_ms.services.impl.ClientService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/client")
public class ClientController {

    final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/create_or_update")
    public ResponseEntity<ClientModel> createOrUpdate(@RequestBody @Valid ClientRecordDto clientRecordDto) {
        ClientMapper clientMapper = new ClientMapper();
        ClientModel clientModel = ClientMapper.toModel(clientRecordDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.save(clientModel));
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<ClientModel>> getAllClients() {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.getAllClients());
    }
}
