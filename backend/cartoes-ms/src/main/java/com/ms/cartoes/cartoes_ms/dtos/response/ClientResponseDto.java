package com.ms.cartoes.cartoes_ms.dtos.response;

import java.util.UUID;

public class ClientResponseDto {
    private UUID clientId;
    private String name;
    private String email;
    private String account;
    private Double limitCredit;
    private Boolean active;
    private String proposalId;
    private String proposalName;
    private String emailProposalContent;

    public UUID getClientId() {
        return clientId;
    }

    public void setClientId(UUID clientId) {
        this.clientId = clientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public Double getLimitCredit() {
        return limitCredit;
    }

    public void setLimitCredit(Double limitCredit) {
        this.limitCredit = limitCredit;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getProposalId() {
        return proposalId;
    }

    public void setProposalId(String proposalId) {
        this.proposalId = proposalId;
    }

    public String getProposalName() {
        return proposalName;
    }

    public void setProposalName(String proposalName) {
        this.proposalName = proposalName;
    }

    public String getEmailProposalContent() {
        return emailProposalContent;
    }

    public void setEmailProposalContent(String emailProposalContent) {
        this.emailProposalContent = emailProposalContent;
    }
}
