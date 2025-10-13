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

beforeEach(async () => {
  // Clean up test data before each test
  await prisma.user.deleteMany({
    where: {
      email: {
        contains: 'test@example.com',
      },
    },
  });
});
