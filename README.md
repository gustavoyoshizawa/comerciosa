# Sistema de Gestão de Contatos

##  Descrição
Este projeto tem como objetivo substituir a agenda física da empresa Comércio S.A. por um sistema digital para cadastro e gerenciamento de clientes e seus respectivos contatos. O sistema permite adicionar, editar, excluir e listar clientes e contatos de maneira eficiente e organizada.

##  Tecnologias Utilizadas
- **Front-end:** HTML, CSS, JavaScript
- **Back-end:** Java com Spring Boot, Hibernate
- **Banco de Dados:** MySQL
- **Ambiente de Desenvolvimento:** XAMPP


##  Instalação e Configuração

### 🔹 1. Clone o Repositório
```sh
git clone https://github.com/gustavoyoshizawa/comerciosa.git
cd comerciosa
```

### 🔹 2. Configuração do Banco de Dados
1. Certifique-se de que o MySQL está instalado e rodando.
2. Execute o script SQL localizado em `database.sql` para criar e popular o banco.
```sh
mysql -u root -p < database.sql
```
3. Configure as credenciais do banco de dados no arquivo `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nome_do_banco
spring.datasource.username=root
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
```

### 🔹 3. Executar o Projeto
```sh
mvn spring-boot:run
```

## 📜 Funcionalidades Implementadas
- ✅ Cadastro de clientes (Nome, CPF, Data de Nascimento, Endereço)
- ✅ Edição de clientes
- ✅ Exclusão de clientes
- ✅ Listagem de clientes
- ✅ Busca de clientes por Nome ou CPF
- ✅ Cadastro de contatos (Telefone, E-mail, Observação)
- ✅ Edição de contatos
- ✅ Exclusão de contatos
- ✅ Listagem de contatos de um cliente específico

## 📂 Estrutura do Projeto
```
📂 sistema-gestao-contatos
 ├── 📁 src
 │   ├── 📂 main
 │   │   ├── 📂 java/com/empresa/gestaocontatos
 │   │   │   ├── 📂 controllers   # Controladores da aplicação
 │   │   │   ├── 📂 models        # Modelos de entidades
 │   │   │   ├── 📂 repositories  # Camada de acesso ao banco
 │   │   │   ├── 📂 services      # Lógica de negócios
 │   │   │   ├── 📄 Application.java  # Classe principal
 │   ├── 📂 resources
 │   │   ├── 📄 application.properties  # Configurações do Spring Boot
 ├── 📄 database.sql        # Script para criação do banco
 ├── 📄 README.md           # Documentação
 ├── 📄 pom.xml             # Dependências do projeto
 ├── 📄 .gitignore          # Arquivos ignorados pelo Git
```

##  Script SQL
```sql
CREATE DATABASE agenda;

USE agenda;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    dataNascimento DATE,
    endereco VARCHAR(255)
);

CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    tipo VARCHAR(50) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    observacao VARCHAR(255),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);
```

##  Demonstração
https://www.youtube.com/watch?v=GAKmO6xv8bs

##  Contato
Desenvolvido por Gustavo Yoshizawa - [LinkedIn](https://www.linkedin.com/in/gustavo-yoshizawa-17915619b/)
