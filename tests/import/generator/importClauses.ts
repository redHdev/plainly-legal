import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import Papa from "papaparse";

const prisma = new PrismaClient();


interface csvData {
  Key: string;
  'Clause Group': string;
  'Clause Version': string;
  'Clause Text': string;
  'Clause Help'?: string;
  'Delete Warning'?: string;
  'Formatting'?: string;
  'Questions'?: string;
  'Plain Text Name': string;
}

interface connections {
  key: number;
}

function parseCSV(csvData: string) {
  //Create a promise to parse the csv data
  const parseCSV = new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        resolve(results.data);
      },
    });
  });
  
  return parseCSV;
}

// Import all csvs from the clauses folder
export async function importClauses(): Promise<void> {
  const csvFolderPath = path.join(__dirname + '/../../../../../tests/import/generator/clauses/');

  // Read all the files in the folder
  const files = fs.readdirSync(csvFolderPath);

  for (const file of files) {
    // Read the csv file
    const csvData = fs.readFileSync(`${csvFolderPath}/${file}`, 'utf8');
  
    // Parse the csv data
    const parsedCsv = await parseCSV(csvData) as csvData[];

    //create a new object with keys of the csv data to match the JSONData interface
    const dataArray = parsedCsv.map(data => {
      return {
        key: parseInt(data.Key, 10),
        group: data['Clause Group'],
        version: data['Clause Version'],
        text: data['Clause Text'].replace(/\n/g, ""),
        help: data['Clause Help'],
        deleteWarning: data['Delete Warning'] || '',
        formatting: data['Formatting']?.trim() || '',
        questions: data['Questions'],
        plainTextName: data['Plain Text Name'],
      }
    });

    console.log(`Importing data from ${file}`);

    //Confirm that we have a data array
    if (dataArray.length <= 0 || typeof dataArray == undefined ) throw new Error('No data found in csv file.');

    //Go through the data and remove any rows that don't have all data as required by JSONData interface and if not, tell us we are skipping it
    const readyToImportData = dataArray.filter(data => {
      if (data.key && data.group && data.version && data.text, data.plainTextName) {
        return true;
      } else {
        // if(data.key) console.log(`Skipping data with key '${data.key}' because it is missing required data.`);
        return false;
      }
    });

    console.log(`Found ${dataArray.length} rows of data in ${file}. ${readyToImportData.length} rows of data are valid to import.`);
    
    // Import the data into the database
    for (const data of readyToImportData) {
      // Check if the key already exists in the database
      const existingData = await prisma.clauses.findUnique({
        where: { key: data.key },
      });

      if (existingData) {
        console.log(`Key '${data.key}' already exists. Skipping import.`);
        continue;
      }

      //get all questions that should be linked split by comma, trim them and create a object like this:
      //questions: {
      //  connect: [{ id: 8 }, { id: 9 }, { id: 10 }],
      //},
      let questions:connections[] = [];
      if (data.questions) {
        questions = data.questions.split(',').map(question => {
          return { key: parseInt(question.trim(), 10) };
        });
      }

      //clean the text from data.text by removing any <p> or </p> tags
      data.text = data.text.replaceAll(/<\/?p>/g, '');

      // Create a new entry in the database
      const newData = {
        ...data,
        questions: {
          connect: questions
        }
      };

      console.log('Importing clause with key ' + data.key.toString());

      await prisma.clauses.create({ data: newData });

      console.log(`Data with key '${data.key}' imported successfully.`);
    }
  }
}

export default importClauses;
