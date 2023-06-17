import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

interface JSONData {
  key: string;
  group: string;
  version: string;
  text: string;
  help: string;
  deleteWarning: string;
  questions: string;
  formatting: string;
}

export async function importData(): Promise<void> {
  const jsonFilePath = './src/import/import.json';

  try {
    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const dataArray = JSON.parse(jsonData) as JSONData[];

    for (const data of dataArray) {
      // Check if the key already exists in the database
      const existingData = await prisma.clauses.findUnique({
        where: { key: parseInt(data.key, 10) },
      });

      if (existingData) {
        console.log(`Key '${data.key}' already exists. Skipping import.`);
      } else {
        // Create a new entry in the database
        const newData = {
          key: parseInt(data.key, 10),
          group: data.group,
          version: data.version,
          text: data.text,
          help: data.help,
          deleteWarning: data.deleteWarning,
          formatting: data.formatting,
        };

        await prisma.clauses.create({ data: newData });
        console.log(`Data with key '${data.key}' imported successfully.`);
      }
    }
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
