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
  ['PENDING', 'CONFIRMED', 'DELIVERED', 'REFUSED'].forEach(
    async (status, index) => {
      await prisma.orderStatus.upsert({
        where: {
          id: index + 1,
        },
        update: {
          name: status,
        },
        create: {
          id: index + 1,
          name: status,
        },
      });
    },
  );

  // Payment Status
  ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'].forEach(
    async (status, index) => {
      await prisma.paymentStatus.upsert({
        where: {
          id: index + 1,
        },
        update: {
          name: status,
        },
        create: {
          id: index + 1,
          name: status,
        },
      });
    },
  );

  // Payment Methods
  ['DEBIT_CARD', 'CREDIT_CARD', 'PIX', 'BOLETO', 'DINHEIRO'].forEach(
    async (status, index) => {
      await prisma.paymentMethod.upsert({
        where: {
          id: index + 1,
        },
        update: {
          name: status,
        },
        create: {
          id: index + 1,
          name: status,
        },
      });
    },
  );
}
