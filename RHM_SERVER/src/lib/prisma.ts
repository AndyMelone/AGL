import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  errorFormat: 'minimal',
  log: ['error'],
});
