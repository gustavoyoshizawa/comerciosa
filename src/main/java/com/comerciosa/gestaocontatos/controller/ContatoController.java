package com.comerciosa.gestaocontatos.controller;

import com.comerciosa.gestaocontatos.model.Cliente;
import com.comerciosa.gestaocontatos.model.Contato;
import com.comerciosa.gestaocontatos.repository.ClienteRepository;
import com.comerciosa.gestaocontatos.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Contato> listarContatos() {
        return contatoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contato> buscarContato(@PathVariable Long id) {
        Optional<Contato> contato = contatoRepository.findById(id);
        return contato.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{clienteId}")
    public ResponseEntity<Contato> criarContato(@PathVariable Long clienteId, @RequestBody Contato contato) {
        return clienteRepository.findById(clienteId)
                .map(cliente -> {
                    contato.setCliente(cliente);
                    Contato novoContato = contatoRepository.save(contato);
                    return ResponseEntity.ok(novoContato);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contato> atualizarContato(@PathVariable Long id, @RequestBody Contato contatoAtualizado) {
        return contatoRepository.findById(id).map(contato -> {
            contato.setTipo(contatoAtualizado.getTipo());
            contato.setValor(contatoAtualizado.getValor());
            contato.setObservacao(contatoAtualizado.getObservacao());
            Contato atualizado = contatoRepository.save(contato);
            return ResponseEntity.ok(atualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarContato(@PathVariable Long id) {
        if (contatoRepository.existsById(id)) {
            contatoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
