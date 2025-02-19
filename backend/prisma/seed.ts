import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  // Order Status
  const orderStatus = ['PENDING', 'CONFIRMED', 'DELIVERED', 'REFUSED'];
  for (const [index, status] of orderStatus.entries()) {
    await prisma.orderStatus.upsert({
      where: { id: index + 1 },
      update: { name: status },
      create: { id: index + 1, name: status },
    });
  }

  // Payment Status
  const paymentStatus = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'];
  for (const [index, status] of paymentStatus.entries()) {
    await prisma.paymentStatus.upsert({
      where: { id: index + 1 },
      update: { name: status },
      create: { id: index + 1, name: status },
    });
  }

  // Payment Methods
  const paymentMethods = [
    'DEBIT_CARD',
    'CREDIT_CARD',
    'PIX',
    'BOLETO',
    'DINHEIRO',
  ];
  for (const [index, method] of paymentMethods.entries()) {
    await prisma.paymentMethod.upsert({
      where: { id: index + 1 },
      update: { name: method },
      create: { id: index + 1, name: method },
    });
  }

  // Roles
  const roles = ['ADMIN', 'MANAGER', 'CUSTOMER'];
  for (const [index, role] of roles.entries()) {
    await prisma.role.upsert({
      where: { id: index + 1 },
      update: { name: role },
      create: { id: index + 1, name: role },
    });
  }
}
