package com.ms.cartoes.cartoes_ms.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ms.cartoes.cartoes_ms.dtos.response.ProposalDto;
import com.ms.cartoes.cartoes_ms.mapper.ProposalMapper;
import com.ms.cartoes.cartoes_ms.models.ProposalModel;
import com.ms.cartoes.cartoes_ms.services.impl.ProposalService;

@RestController
@RequestMapping("/proposal")
@CrossOrigin(origins = "http://localhost:3000")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;

    @Autowired
    private ProposalMapper proposalMapper;

    @GetMapping("/list")
    public List<ProposalDto> getAllProposals() {
        List<ProposalModel> proposals = proposalService.findAll();
        return proposals.stream()
                        .map(proposalMapper::toDTO)
                        .collect(Collectors.toList());
    }
}