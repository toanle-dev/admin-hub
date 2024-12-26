# Tarefas de Desenvolvimento Frontend

## **Dashboard **Administrativo\*\*\*\*

### 1. **Tela de Login**

- Criar a tela de login com campos para email e senha.
- Adicionar validação de campos e feedback de erro.
- Integrar com a API de autenticação (backend).
- Redirecionar para o dashboard após login bem-sucedido.

### 2. **Dashboard Principal**

- Criar o layout do dashboard com navegação lateral (menu de admin).
- Adicionar gráficos com dados de vendas, pedidos e usuários.
- Exibir tabela com registros de logs de atividades de usuários.
- Exibir informações gerais do sistema, como total de pedidos, total de usuários e total de produtos.

### 3. **Gerenciamento de Usuários**

- Criar uma tela para visualização e gerenciamento de usuários.
- Permitir a visualização de dados do usuário (nome, email, função).
- Implementar ações de editar, deletar e atribuir roles aos usuários.

### 4. **Gerenciamento de Produtos**

- Criar tela para visualização e gerenciamento de produtos.
- Exibir informações do produto: nome, descrição, preço, estoque, categoria.
- Implementar funções para adicionar, editar e excluir produtos.
- Exibir a lista de produtos com filtros por nome, preço e categoria.

### 5. **Relatórios**

- Criar uma tela para visualização de relatórios gerados pelo admin.
- Implementar funcionalidade de geração de relatórios.
- Exibir relatórios com dados em formato de tabela ou gráfico (dependendo dos dados).

### 6. **Logs de Atividades**

- Criar uma tela para visualização dos logs de atividades de usuários.
- Exibir dados como ação, usuário e timestamp.
- Implementar filtros por tipo de ação ou usuário.

---

## **E-Commerce**

### 1. **Tela de Listagem de Produtos**

- Criar a tela de listagem de produtos.
- Exibir produtos com nome, preço e imagem.
- Implementar filtros por categoria e ordenação por preço e nome.

### 2. **Tela de Detalhes do Produto**

- Criar uma tela para exibir detalhes do produto.
- Exibir informações completas do produto (nome, descrição, preço, estoque).
- Implementar botão de adicionar ao carrinho.

### 3. **Carrinho de Compras**

- Criar tela de carrinho de compras.
- Exibir lista de produtos no carrinho com nome, preço e quantidade.
- Implementar opção para remover produtos ou alterar a quantidade.
- Exibir subtotal e total da compra.

### 4. **Fluxo de Checkout**

- Criar a tela de checkout com campos de informações de pagamento e entrega.
- Exibir resumo do pedido e valores totais.
- Implementar funcionalidade para envio do pedido ao backend e criação de um novo pedido no banco de dados.

### 5. **Tela de Confirmação de Pedido**

- Criar tela de confirmação de pedido após a conclusão do checkout.
- Exibir informações detalhadas sobre o pedido (produtos, preço total, status do pedido).

---

## **Autenticação e Autorização**

### 1. **Cadastro e Login**

- Criar telas para cadastro de novos usuários.
- Criar uma tela de login com validação e integração com a API de autenticação.

### 2. **Gerenciamento de Sessão**

- Implementar sistema de autenticação baseado em tokens JWT.
- Implementar lógica para expiração de sessão e redirecionamento para a tela de login.

### 3. **Controle de Acesso**

- Implementar controle de acesso com base nas permissões de cada usuário (admin vs cliente).
- Bloquear acesso a funcionalidades do dashboard para usuários não administradores.

---

## **Geral**

### 1. **Responsividade**

- Garantir que o layout seja responsivo para dispositivos móveis e desktops.

### 2. **Estilo e UI**

- Implementar o estilo visual com uma paleta de cores consistente e fontes legíveis.
- Usar componentes reutilizáveis para botões, tabelas, gráficos e inputs.

### 3. **Integração com Backend**

- Integrar as funcionalidades do frontend com o backend, usando API RESTful ou GraphQL.
- Certificar que as ações de login, criação de pedidos, e gerenciamento de usuários funcionem corretamente com a base de dados.

### 4. **Testes e Validações**

- Implementar testes unitários e de integração para garantir a estabilidade da aplicação.
- Adicionar validações para entradas de dados, como emails e senhas.

### 5. **Documentação**

- Criar documentação do projeto no GitHub Pages.
- Descrever as funcionalidades principais da aplicação, como login, gerenciamento de usuários, e fluxo de compras.

E-commerce
├── Tela de Listagem de Produtos
│ ├── Filtragem por Categoria
│ ├── Ordenação (Preço, Popularidade, etc.)
│ └── Acesso ao Detalhes do Produto
├── Tela de Detalhes do Produto
│ ├── Informações do Produto (Descrição, Preço, Estoque)
│ ├── Imagens do Produto
│ ├── Opção de Selecionar Quantidade
│ └── Botão "Adicionar ao Carrinho"
├── Carrinho de Compras
│ ├── Listagem de Produtos no Carrinho
│ ├── Alteração de Quantidade
│ ├── Resumo do Pedido (Subtotal, Frete)
│ └── Botão "Ir para Checkout"
├── Fluxo de Checkout
│ ├── Informações de Endereço
│ ├── Opções de Pagamento
│ ├── Resumo Final do Pedido
│ └── Confirmação do Pagamento
└── Tela de Confirmação de Pedido
├── Número do Pedido
├── Resumo do Pedido
└── Mensagem de Agradecimento
