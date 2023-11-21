import getUserMeta from "~/data/userData";
// import deleteAll from 'tests/import/audit/deleteAll';
// import importAuditQuestions from 'tests/import/audit/importAuditQuestions';
// import importAuditQuestionConditionals from 'tests/import/audit/importAuditQuestionConditionals';
// import importAuditQuestionSets from 'tests/import/audit/importAuditQuestionSets';
// import importAuditQuestionSetConditionals from 'tests/import/audit/importAuditQuestionSetConditionals';

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
    // // Delete all
    // console.log('Deleting all audit data...');
    // await deleteAll().then(() => console.log('Deletion complete'));
    // console.log('Importing Audit Questions...');
    // await importAuditQuestions().then(() => console.log('Import of audit questions complete'));
    // console.log('Importing Audit Question Conditionals...');
    // await importAuditQuestionConditionals().then(() => console.log('Import of audit question conditionals complete'));
    // console.log('Importing Audit Question sets...');
    // await importAuditQuestionSets().then(() => console.log('Import of audit question sets complete'));
    // console.log('Importing Audit Question Set Conditionals...');
    // await importAuditQuestionSetConditionals().then(() => console.log('Import of audit question set conditionals complete'));
  }

  return "CSVs imported!";
}
