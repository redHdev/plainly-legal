import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import Papa from "papaparse";

const prisma = new PrismaClient();


interface csvData {
  Key: string;
  'Name': string;
  'Agreement Title': string;
  'Variables'?: string;
  'Tags': string;
  'contractQuestions': string;
  'Clauses': string;
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
  const csvFolderPath = path.join(__dirname + '/../../../../../tests/import/generator/agreements/');

  // Read all the files in the folder
  const files = fs.readdirSync(csvFolderPath);

  for (const file of files) {
    // Read the csv file
    const csvData = fs.readFileSync(`${csvFolderPath}/${file}`, 'utf8');
  
    // Parse the csv data
    const parsedCsv = await parseCSV(csvData) as csvData[];

    //create a new object with keys of the csv data to match the JSONData interface
    const dataArray = parsedCsv.map(data => {

      //if the data['Input Options'] is not empty, confirm that is is valid JSON and if not, throw an error
      if (data['Variables'] && '' != data['Variables'] && !JSON.parse(data['Variables'])) throw new Error(`Invalid variable JSON in ${file} at row ${data.Key}`);

      //get all questions that should be linked split by comma, trim them and create a object like this:
      let contractQuestions:connections[] = [];
      if (data.contractQuestions) {
        contractQuestions = data.contractQuestions.split(',').map(record => {
          return { key: parseInt(record.trim(), 10) };
        });
      }

      //do the same for clauses
      let clauses:connections[] = [];
      if (data.Clauses) {
        clauses = data.Clauses.split(',').map(record => {
          return { key: parseInt(record.trim(), 10) };
        });
      }

      //explode data.Clauses into json array in this format [1,2,3,4] so that we can create a contract question order
      let contractQuestionOrder:number[] = [];
      contractQuestionOrder = data.contractQuestions.split(',').map(record => {
        return parseInt(record.trim(), 10);
      });

      //explode data.Clauses into json array in this format [1,2,3,4]
      let clauseOrder:number[] = [];
      clauseOrder = data.Clauses.split(',').map(record => {
        return parseInt(record.trim(), 10);
      });

      return {
        key: parseInt(data.Key, 10),
        slug: data.Name ? data.Name.toLowerCase().replaceAll(" ", '-').replaceAll("-&", '').trim() : "",
        name: data.Name,
        description: "",
        agreementTitle: data['Agreement Title'],
        variables: data['Variables'] ? JSON.parse(data['Variables']) as string[] : {},
        tags: data.Tags,
        contractQuestions: contractQuestions,
        clauses: clauses,
        clauseOrder: clauseOrder,
        contractQuestionOrder: contractQuestionOrder,
      }
    });


    console.log(`Importing data from ${file}`);

    //Confirm that we have a data array
    if (dataArray.length <= 0 || typeof dataArray == undefined ) throw new Error('No data found in csv file.');

    //Go through the data and remove any rows that don't have all data as required by JSONData interface and if not, tell us we are skipping it
    const readyToImportData = dataArray.filter(data => {
      if (data.key && data.slug && data.name && data.agreementTitle && data.tags && data.contractQuestions && data.clauses && data.clauseOrder) {
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
      const existingData = await prisma.contracts.findUnique({
        where: { key: data.key },
      });

      if (existingData) {
        console.log(`Key '${data.key}' already exists. Skipping import.`);
        continue;
      }

      // Create a new entry in the database
      const newData = {
        ...data,
        contractQuestions: {
          connect: data.contractQuestions,
        },
        clauses: {
          connect: data.clauses,
        },
      };

      console.log(`Importing data with key '${data.key}'...`);

      await prisma.contracts.create({ data: newData });

      console.log(`Data with key '${data.key}' imported successfully.`);
    }
  }
}

export default importClauses;
