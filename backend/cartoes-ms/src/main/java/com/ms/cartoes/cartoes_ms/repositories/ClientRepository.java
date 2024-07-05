package com.ms.cartoes.cartoes_ms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.cartoes.cartoes_ms.models.ClientModel;

public interface ClientRepository extends JpaRepository<ClientModel, UUID> {
        
}