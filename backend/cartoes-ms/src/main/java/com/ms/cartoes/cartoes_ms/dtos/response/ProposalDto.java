package com.ms.cartoes.cartoes_ms.dtos.response;

import java.util.UUID;

public class ProposalDto {
    private UUID proposalId;
    private String name;
    private String description;

    // Getters and Setters
    public UUID getProposalId() {
        return proposalId;
    }
    public void setProposalId(UUID proposalId) {
        this.proposalId = proposalId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
