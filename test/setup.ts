// Test setup file
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Clean up test data before running tests
  await prisma.user.deleteMany({
    where: {
      email: {
        contains: 'test@example.com',
      },
    },
  });
});

afterAll(async () => {
  // Clean up test data after running tests
  await prisma.user.deleteMany({
    where: {
      email: {
        contains: 'test@example.com',
      },
    },
  });
  
  await prisma.$disconnect();
});
