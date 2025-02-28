package com.ms.cartoes.cartoes_ms.models;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TB_CLIENTS")
public class ClientModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id 
    @GeneratedValue(strategy= GenerationType.AUTO)
    private UUID clientId;
    private String name;
    private String email;
    private String account;
    private Double limitCredit;
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "proposal_id")
    private ProposalModel proposal;

    // Getters and setters
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

    public ProposalModel getProposal() {
        return proposal;
    }

    public void setProposal(ProposalModel proposal) {
        this.proposal = proposal;
    }
}
