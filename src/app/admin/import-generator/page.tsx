import getUserMeta from "~/data/userData";
// import importClauseQuestions from 'tests/import/generator/importClauseQuestions';
// import importClauses from 'tests/import/generator/importClauses';
// import importClauseConditionals from 'tests/import/generator/importClauseConditionals';
// import importAgreementQuestions from 'tests/import/generator/importAgreementQuestions';
// import importAgreementConditionals from 'tests/import/generator/importAgreementConditionals';
// import importAgreements from 'tests/import/generator/importAgreements';
// import deleteAll from 'tests/import/generator/deleteAll';

export const dynamic = 'force-dynamic'

export default async function Page() {
  //get the user meta from the database based on clerk userID
  const currentUserMeta = await getUserMeta();

  //Confirm that our current user is admin
  const isAdmin = currentUserMeta?.isAdmin === true;

  //If the user is not admin, return an error
  if (!isAdmin) {
    return "You are not authorized to import CSVs";
  } else {
    // Delete all
    // console.log('Deleting all contract data...');
    // await deleteAll().then(() => console.log('Deletion complete'));
    // console.log('Importing Clause Questions...');
    // await importClauseQuestions().then(() => console.log('Import of clause questions complete'));
    // console.log('Importing Clauses...');
    // await importClauses().then(() => console.log('Import of clauses complete'));
    // console.log('importing Clause Conditionals...');
    // await importClauseConditionals().then(() => console.log('Import of Clause Conditionals complete'));
    // console.log('Importing Agreement Questions...');
    // await importAgreementQuestions().then(() => console.log('Import of agreement questions complete'));
    // console.log('Importing Agreement Conditionals...');
    // await importAgreementConditionals().then(() => console.log('Import of agreement conditionals complete'));
    // console.log('Importing Agreements...');
    // await importAgreements().then(() => console.log('Importing Agreements complete'));
  }

  return "CSVs imported!";
}
