package com.comerciosa.gestaocontatos.repository;

import com.comerciosa.gestaocontatos.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {
}
