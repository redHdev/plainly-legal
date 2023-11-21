import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteAll(): Promise<void> {

  
  // Delete all data from AuditQuestions, AuditQuestionConditionals, AuditQuestionSets, AuditQuestionSetConditionals

  console.log('Deleting Audit Question Conditionals');
  await prisma.auditQuestionConditionals.deleteMany();
  console.log('Deleting Audit Questions');
  await prisma.auditQuestions.deleteMany();
  console.log('Deleting Audit Question Sets');
  await prisma.auditQuestionSets.deleteMany();
  console.log('Deleting Audit Question Set Conditionals');
  await prisma.auditQuestionSetConditionals.deleteMany();
  console.log('Completed Deleting Data');
  await prisma.$disconnect();

}

export default deleteAll;