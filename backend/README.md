# Resumo do Projeto

## Visão Geral

Este backend combina as funcionalidades de um **dashboard administrativo** e um **sistema de e-commerce**, desenvolvido em NestJS com Prisma ORM. Ele suporta:

- Gerenciamento de usuários e permissões.
- Gestão de produtos e pedidos.
- Relatórios e logs de atividades administrativas.

---

## Modelos Implementados

### Usuários e Permissões

- **User**: Gerencia os usuários do sistema (clientes e administradores).
- **Role**: Define os papéis de usuário (e.g., "Admin", "Cliente").
- **Permission**: Lista as permissões associadas aos papéis.

### E-commerce

- **Product**: Gerencia os produtos vendidos no sistema.
- **Category**: Permite organizar produtos em categorias.
- **Order**: Registra os pedidos feitos pelos clientes.
- **OrderItem**: Detalhes dos itens incluídos em cada pedido.
- **OrderStatus**: Define os possíveis status de um pedido (e.g., "PENDING", "DELIVERED").

### Administração

- **Log**: Registra as atividades realizadas no sistema.
- **Report**: (A ser implementado) Armazena relatórios gerados no dashboard administrativo.

---

## Funcionalidades do Backend

### 1. Autenticação e Autorização

- **Endpoints**:
  - Login e registro de usuários.
  - Gestão de papéis e permissões.

### 2. Gestão de Produtos

- **Endpoints**:
  - CRUD para produtos.
  - CRUD para categorias.
  - Gerenciamento de estoque.

### 3. Gestão de Pedidos

- **Endpoints**:
  - Criação e visualização de pedidos.
  - Atualização do status dos pedidos.

### 4. Administração e Relatórios

- **Endpoints**:
  - Listagem e filtragem de logs de atividades.
  - (Futuro) Geração e consulta de relatórios.

---

## Próximos Passos

1. Configurar o Prisma e criar as migrations.
2. Implementar os endpoints REST ou GraphQL baseados nos modelos.
3. Adicionar middlewares para autenticação e autorização.
4. Testar a integração do backend com o frontend.

---

## Tecnologias Utilizadas

- **NestJS**: Framework principal para o backend.
- **Prisma ORM**: Gerenciamento do banco de dados.
- **SQLite**: Banco de dados (pode ser substituído por PostgreSQL em produção).
  """
