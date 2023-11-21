import { type InputType, PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import Papa from "papaparse";

const prisma = new PrismaClient();


interface csvData {
  ID: string;
  'Group': string;
  'Variable': string;
  'Text': string;
  'Help Text'?: string;
  'Input Type': string;
  'Input Options'?: string;
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
  const csvFolderPath = path.join(__dirname + '/../../../../../tests/import/generator/agreementQuestions/');

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
      if (data['Input Options'] && '' != data['Input Options'] && !JSON.parse(data['Input Options'])) throw new Error(`Invalid JSON in ${file} at row ${data.ID}`);

      return {
        key: parseInt(data.ID, 10),
        group: data.Group,
        variable: data.Variable?.trim(),
        text: data.Text,
        help: data['Help Text'],
        inputType: data['Input Type'].toUpperCase()?.trim() as InputType,
        inputOptions: data['Input Options'] ? JSON.parse(data['Input Options']) as string[] : {},
      }
    });

    console.log(`Importing data from ${file}`);

    //Confirm that we have a data array
    if (dataArray.length <= 0 || typeof dataArray == undefined ) throw new Error('No data found in csv file.');

    //Go through the data and remove any rows that don't have all data as required by JSONData interface and if not, tell us we are skipping it
    const readyToImportData = dataArray.filter(data => {
      if (data.key && data.group && data.variable && data.text && data.inputType) {
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
      const existingData = await prisma.contractQuestions.findUnique({
        where: { key: data.key },
      });

      if (existingData) {
        console.log(`Key '${data.key}' already exists. Skipping import.`);
        continue;
      }

      await prisma.contractQuestions.create({ data: {...data} });

      console.log(`Data with key '${data.key}' imported successfully.`);
    }
  }
}

export default importClauses;
