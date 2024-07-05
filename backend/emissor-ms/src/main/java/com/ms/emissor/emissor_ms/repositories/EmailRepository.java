package com.ms.emissor.emissor_ms.repositories;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.emissor.emissor_ms.models.EmailModel;

public interface EmailRepository extends JpaRepository<EmailModel, UUID> {
}
