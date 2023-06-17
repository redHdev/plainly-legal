import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function importClauseNumbers() {
  const contractsData = [
    {
      key: 1,
      clauses: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 114, 115, 110, 111, 112, 116, 117, 113, 500, 501, 502, 503, 900, 1901, 1300, 1100, 1101, 1102, 901, 1902, 1903, 1904, 1908, 1900, 50]
    },
    {
      key: 2,
      clauses: [1905, 504, 505, 506, 507, 508, 700, 701, 702, 300, 301, 302, 303, 304, 305, 306, 307, 308, 1103, 1104, 1105, 1301, 1302, 1907, 1903, 1904, 1908, 902, 1906, 51]
    },
    {
      key: 3,
      clauses: [1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 2100, 1712, 1713, 51]
    },
    // Add other contracts here...
  ];

  for (const contractData of contractsData) {

    console.log(`Importing clauses for contract with key '${contractData.key}'...`);

    const contract = await prisma.contracts.findUnique({
      where: { key: contractData.key },
    });

    if (!contract) {
      console.log(`Contract with key '${contractData.key}' not found. Skipping import.`);
      continue;
    }

    for (const clauseKey of contractData.clauses) {
      //check if the clause exists in the database
      const existingClause = await prisma.clauses.findUnique({
        where: { key: clauseKey },
      });

      if (!existingClause) {
        console.log(`Clause with key '${clauseKey}' not found. Skipping import.`);
        continue;
      }

      await prisma.clauses.update({
        where: { key: clauseKey },
        data: {
          contract: {
            connect: { key: contract.key }
          }
        }
      });
    }
  }
}
