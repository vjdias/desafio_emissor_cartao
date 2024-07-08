package com.ms.cartoes.cartoes_ms.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.cartoes.cartoes_ms.models.ProposalModel;
import com.ms.cartoes.cartoes_ms.repositories.ProposalRepository;

@Service
public class ProposalService {
    @Autowired
    private ProposalRepository proposalRepository;

    public List<ProposalModel> findAll() {
        return proposalRepository.findAll();
    }

    public ProposalModel save(ProposalModel proposta) {
        return proposalRepository.save(proposta);
    }

    public void deleteById(UUID id) {
        proposalRepository.deleteById(id);
    }

    public Optional<ProposalModel> findById(UUID proposalId) {
        return proposalRepository.findById(proposalId);
    }

}