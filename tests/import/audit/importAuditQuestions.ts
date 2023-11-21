import { type auditAnswerFormat, PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import Papa from "papaparse";

const prisma = new PrismaClient();


interface csvData {
  ID: string;
  'Question Group': string;
  'Question Variable': string;
  'Question Text': string;
  'Question Help'?: string;
  'Answer Type': string;
  'Answer Options'?: string;
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
  const csvFolderPath = path.join(__dirname + '/../../../../../tests/import/audit/auditQuestions/');

  // Read all the files in the folder
  const files = fs.readdirSync(csvFolderPath);

  for (const file of files) {
    // Read the csv file
    const csvData = fs.readFileSync(`${csvFolderPath}/${file}`, 'utf8');
  
    // Parse the csv data
    const parsedCsv = await parseCSV(csvData) as csvData[];

    //create a new object with keys of the csv data to match the JSONData interface
    const dataArray = parsedCsv.map(data => {

      console.log('checking if ' + data.ID + ' is valid JSON');
      //if the data['Input Options'] is not empty, confirm that is is valid JSON and if not, throw an error
      if (data['Answer Options'] && '' != data['Answer Options'] && !JSON.parse(data['Answer Options'])) throw new Error(`Invalid JSON in ${file} at row ${data.ID}`);


      return {
        key: parseInt(data.ID, 10),
        group: data['Question Group'],
        variable: data['Question Variable'],
        text: data['Question Text'],
        help: data['Question Help'] ?? '',
        answerType: data['Answer Type']?.trim() as auditAnswerFormat,
        answerOptions: data['Answer Options'] ? JSON.parse(data['Answer Options']) as string[] : {},
      }
    });

    console.log(`Importing data from ${file}`);

    //Confirm that we have a data array
    if (dataArray.length <= 0 || typeof dataArray == undefined ) throw new Error('No data found in csv file.');

    //Go through the data and remove any rows that don't have all data as required by JSONData interface and if not, tell us we are skipping it
    const readyToImportData = dataArray.filter(data => {
      if (data.key && data.group && data.answerType) {
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
      const existingData = await prisma.auditQuestions.findUnique({
        where: { key: data.key },
      });

      if (existingData) {
        console.log(`Key '${data.key}' already exists. Skipping import.`);
        continue;
      }


      //clean the text from data.text by removing any <p> or </p> tags
      data.text = data.text.replaceAll(/<\/?p>/g, '');

      console.log('Importing clause with key ' + data.key.toString());

      await prisma.auditQuestions.create({ data: { ...data } });

      console.log(`Data with key '${data.key}' imported successfully.`);
    }
  }
}

export default importClauses;
