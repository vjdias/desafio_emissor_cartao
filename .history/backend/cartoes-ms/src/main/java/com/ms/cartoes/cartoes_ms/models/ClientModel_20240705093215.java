package com.ms.cartoes.cartoes_ms.models;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private String nameProposal;
    private String emailProposalContent;

}
