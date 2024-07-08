package com.ms.cartoes.cartoes_ms.models;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TB_PROPOSAL")
public class ProposalModel {
    @Id
    private UUID proposalId;
    
    private String name;
    
    private String typeProposal;
    
    private String description;
    
    private String emailTitle;
    
    @Column(columnDefinition = "TEXT")
    private String emailContent;
    
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

    public String getTypeProposal() {
        return typeProposal;
    }

    public void setTypeProposal(String typeProposal) {
        this.typeProposal = typeProposal;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmailTitle() {
        return emailTitle;
    }

    public void setEmailTitle(String emailTitle) {
        this.emailTitle = emailTitle;
    }

    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

}
