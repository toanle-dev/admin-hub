Possuo esse escopo do projeto, e na sequencia o schema do prisma, vou lhe fazer umas perguntas

# **Plano de Desenvolvimento do Projeto (NestJS + Prisma)**

## **1. Configuração Inicial**

1. **Instalar dependências**:

   - `@nestjs/cli`, `@prisma/client`, `prisma`, `bcrypt`, `jsonwebtoken`.
   - Exemplo:
     ```bash
     npm install @nestjs/cli @nestjs/config @prisma/client prisma bcrypt jsonwebtoken
     npm install --save-dev @types/bcrypt @types/jsonwebtoken
     ```

2. **Configuração do Prisma**:

   - Criar a base de dados SQLite.
     ```bash
     npx prisma init
     ```
   - Ajustar o `DATABASE_URL` no `.env`.
   - Criar as migrations baseando-se no seu **schema**.
     ```bash
     npx prisma migrate dev --name init
     ```

3. **Configuração do NestJS**:
   - Estrutura básica de módulos: `UserModule`, `AuthModule`, `ProductModule`, `OrderModule`, etc.

---

## **2. Autenticação e Autorização**

Primeiro, implemente a autenticação para garantir segurança e um fluxo de permissões adequado.

### **Endpoints Prioritários**:

1. **Registro e Login de Usuários**:

   - Implementar JWT (Json Web Token) para autenticação.
   - **POST `/auth/register`**
   - **POST `/auth/login`**

2. **Middlewares e Guards**:
   - Criar um **JWT Auth Guard**.
   - Middleware para checar papéis e permissões (Admin/Cliente).

---

## **3. Módulo de Gestão de Usuários e Permissões**

### **Funcionalidades**:

1. **CRUD de Usuários** (restrito a Admin).
   - **GET/POST/PUT/DELETE `/users`**
2. **Gestão de Papéis e Permissões**:
   - Endpoints de listagem e atualização de permissões.
   - **GET/POST `/roles`**

---

## **4. Módulo de Produtos e Categorias**

### **Funcionalidades**:

1. **CRUD de Produtos**:

   - **POST `/products`** (criar produto)
   - **GET `/products`** (listar todos)
   - **PUT `/products/:id`** (editar)
   - **DELETE `/products/:id`**

2. **CRUD de Categorias**:

   - **POST `/categories`**
   - **GET `/categories`**

3. **Gerenciamento de Estoque**:
   - Adicionar lógica para controlar `stock`.

---

## **5. Módulo de Pedidos e Status**

### **Funcionalidades**:

1. **Criação de Pedidos**:

   - Endpoint que recebe `OrderItem[]` e calcula o `totalAmount`.
   - **POST `/orders`**

2. **Visualização e Atualização de Status**:
   - **GET `/orders`** (listar pedidos de um usuário ou Admin).
   - **PATCH `/orders/:id/status`** (atualizar status).

---

## **6. Módulo de Logs**

### **Funcionalidades**:

1. **Criação automática de logs**:

   - Implementar um **interceptor** ou serviço que registre ações de usuários (e.g., login, criação de pedidos).

2. **Listagem de Logs** (Admin):
   - **GET `/logs`**

---

## **7. Implementação de Relatórios (Futuro)**

- Gerar relatórios de vendas, logs, etc., quando houver necessidade.
- Model já está preparado; endpoint pode ser planejado posteriormente.

---

# **Checklist de Tarefas Prioritárias**

| **Tarefa**                           | **Status** |
| ------------------------------------ | ---------- |
| Configurar Prisma e criar migrations | ☑         |
| Configurar autenticação JWT          | ☐          |
| Implementar CRUD de Usuários         | ☐          |
| Implementar CRUD de Produtos         | ☐          |
| Implementar CRUD de Categorias       | ☐          |
| Implementar criação de Pedidos       | ☐          |
| Implementar controle de Estoque      | ☐          |
| Criar Middlewares de Logs            | ☐          |
| Implementar atualização de Pedidos   | ☐          |
| Criar visualização de Logs           | ☐          |

---

# **Dicas para Ganhar Tempo**

1. **Use o CLI do Nest** para gerar módulos, serviços e controladores:

   ```bash
   nest generate module auth
   nest generate service auth
   nest generate controller auth
   ```

2. **Scripts Prisma**:

   - Use o Prisma Client gerado automaticamente para evitar escrever queries SQL manualmente.

3. **Divida as entregas em pequenos commits** no Git, como:

   - `feat(auth): implement login`
   - `feat(products): add product CRUD`.

4. **Comece com as funcionalidades essenciais** (Autenticação, Usuários, Produtos). A parte de Logs e Relatórios pode ser adicionada por último.

---

## Esquema Prisma

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "sqlite"
url = env("DATABASE_URL")
}

model User {
id Int @id @default(autoincrement())
email String @unique
password String
firstName String @default("")
lastName String @default("")
role Role @relation(fields: [roleId], references: [id])
roleId Int
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
logs Log[] // Registro de atividades no sistema
orders Order[] // Pedidos feitos pelo usuário (clientes)
}

model Role {
id Int @id @default(autoincrement())
name String @unique
permissions Permission[] @relation("RolePermissions")
users User[]
}

model Permission {
id Int @id @default(autoincrement())
name String @unique
roles Role[] @relation("RolePermissions")
}

model Product {
id Int @id @default(autoincrement())
name String
description String?
price Float
stock Int @default(0) // Quantidade em estoque
imageUrl String? // URL da imagem do produto
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
orders OrderItem[]
categories Category[] @relation("ProductCategories")
}

model Category {
id Int @id @default(autoincrement())
name String @unique
products Product[] @relation("ProductCategories")
}

model Order {
id Int @id @default(autoincrement())
user User @relation(fields: [userId], references: [id])
userId Int
items OrderItem[]
totalAmount Float  
 status OrderStatus @relation(fields: [statusId], references: [id])
statusId Int
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model OrderItem {
id Int @id @default(autoincrement())
product Product @relation(fields: [productId], references: [id])
productId Int
order Order @relation(fields: [orderId], references: [id])
orderId Int
quantity Int // Quantidade do produto no pedido
price Float // Preço unitário no momento do pedido
}

model OrderStatus {
id Int @id @default(autoincrement())
name String @unique // Ex.: "PENDING", "CONFIRMED", "DELIVERED"
orders Order[]
}

// model Report {
// id Int @id @default(autoincrement())
// title String
// data Json // Dados do relatório
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// user User @relation(fields: [userId], references: [id])
// userId Int
// }

model Log {
id Int @id @default(autoincrement())
action String // Ex: "Login", "Criou Relatório", "Fez Pedido"
timestamp DateTime @default(now())
user User @relation(fields: [userId], references: [id])
userId Int
}
