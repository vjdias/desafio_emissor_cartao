package com.ms.cartoes.cartoes_ms.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClientRecordDto(String clientId,
                            @NotBlank String name, 
                            @NotBlank @Email String email, 
                            @NotBlank String account, 
                            @NotNull Boolean active,
                            @NotNull String proposalId,
                            @NotNull  Double limitCredit
                            ) {
}
