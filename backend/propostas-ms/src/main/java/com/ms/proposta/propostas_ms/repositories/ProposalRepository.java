package com.ms.proposta.propostas_ms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.proposta.propostas_ms.models.ProposalsModel;

public interface ProposalRepository extends JpaRepository<ProposalsModel, UUID> { 
}
