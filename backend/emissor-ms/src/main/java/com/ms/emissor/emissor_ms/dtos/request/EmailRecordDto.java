package com.ms.emissor.emissor_ms.dtos.request;

import java.util.UUID;

public record EmailRecordDto(UUID userId, 
                             String emailTo, 
                             String subject, 
                             String text) {}
