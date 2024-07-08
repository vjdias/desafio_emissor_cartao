package com.ms.proposta.propostas_ms.models;

import java.util.UUID;

public class ProposalsModel {
    private UUID proposalId;    
    private String name; // PJ ou PF
    private String typeProsposal;
    private String description;
    private String emailTitle;
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
    public String getTypeProsposal() {
        return typeProsposal;
    }
    public void setTypeProsposal(String typeProsposal) {
        this.typeProsposal = typeProsposal;
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
