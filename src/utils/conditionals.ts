import { type ContractQuestionConditionals } from "@prisma/client";
import { type liveFormData } from "~/types/forms";

type FormData = liveFormData;

export function shouldRenderField(
  conditionals: ContractQuestionConditionals[] | null,
  formData: FormData | undefined
): boolean {
  if (
    !formData ||
    Object.keys(formData).length === 0 ||
    !conditionals ||
    conditionals.length === 0
  ) {
    return true;
  }

  return conditionals.every((conditional) =>
    !checkConditional(conditional, formData)
  );
}

function checkConditional(
  conditional: ContractQuestionConditionals,
  formData: FormData
): boolean {
  if (!isConditionalValid(conditional)) {
    throw new Error("Conditional is not correctly formatted.");
  }

  const termOne = extractTermOne(conditional, formData);

  //Check if conditional.termTwo is equal to the string "true" or "false" if so, convert it to undercase
  const termTwo = ( conditional.termTwo == 'TRUE' || conditional.termTwo == 'FALSE' ) ? conditional.termTwo.toLowerCase() : conditional.termTwo;


  // if(3 == conditional.key) {
    // console.log('conditional', conditional);
    // console.log(`checking if we should render: ${conditional.key} does ${termTwo} ${conditional.operand} `, termOne);
    // console.log('formdata', formData);
  // }

  //if termOne is undefined, return false right away because the conditional is not valid
  if (!termOne) return false;

  let result = false;

  switch (conditional.operand.trim()) {
    case "GREATER_THAN":
    case "LESS_THAN":
    case "GREATER_THAN_OR_EQUAL_TO":
    case "LESS_THAN_OR_EQUAL_TO":
      if (typeof termOne !== "string") {
        throw new Error("Conditional termOne is not a string.");
      }
      result = checkNumberConditional(
        termOne,
        termTwo,
        conditional.operand
      );
      break;
    case "CONTAINS":
    case "NOT_CONTAINS":
      result = checkArrayConditional(
        termOne,
        termTwo,
        conditional.operand
      );
      break;
    case "EQUALS":
    case "NOT_EQUALS":
      if (typeof termOne !== "string") {
        throw new Error("Conditional termOne is not a string.");
      }
      result = checkStringConditional(
        termOne,
        termTwo,
        conditional.operand
      );
      break;
    default:
      throw new Error("Conditional operand is not a valid operand.");
  }

  //We could apply filters here, but we don't need to yet
  // if(3 == conditional.key) {
  //   console.log(`result of clause: ${result.toString()}`);
  // }
  return result;

}

function isConditionalValid(
  conditional: ContractQuestionConditionals
): boolean {
  return (
    typeof conditional.termOne === "string" &&
    typeof conditional.termTwo === "string" &&
    typeof conditional.operand === "string"
  );
}

function extractTermOne(
  conditional: ContractQuestionConditionals,
  formData: FormData
): string | string[] {
  const variable = conditional.termOne.replace("{", "").replace("}", "");

  let termOne: string | string[] = "";

  //Confirm that the variable exists in the formData and is a string or array
  try {
    termOne = formData[variable] as string | string[];
  } catch (error) {
    throw new Error(
      `Conditional variable ${variable} does not exist in formData or is not a string or array of strings`
    );
  }

  //If we have termOne, maybe it's a list of key value pairs like mi: Michigan for a select box and we only want the key
  if( termOne && termOne !== '' ){

    //if it's an array, replace all of them with .split("|")[0]
    if (Array.isArray(termOne)) {
      termOne = termOne.map((term) => term.split("|")[0] ?? term);
    }else{
      termOne = termOne.split("|")[0] ?? termOne;
    }

  }

  return termOne;
}

function checkStringConditional(
  termOne: string,
  termTwo: string,
  operand: string
): boolean {
  const terms = termTwo.split(' OR ').map(term => term.toLowerCase());
  const lowerCaseTermOne = termOne.toLowerCase();
  switch (operand) {
    case "EQUALS":
      return terms.some(term => lowerCaseTermOne === term);
    case "NOT_EQUALS":
      return terms.every(term => lowerCaseTermOne !== term);
    default:
      throw new Error("Conditional operand is not a valid operand.");
  }
}


function checkArrayConditional(
  termOne: string | string[],
  termTwo: string,
  operand: string
): boolean {
  if (!Array.isArray(termOne)) {
    throw new Error("Conditional termOne is not an array.");
  }

  const lowerCaseTermOne = termOne.map(t => t.toLowerCase());
  const lowerCaseTermTwo = termTwo.toLowerCase();

  switch (operand) {
    case "CONTAINS":
      return lowerCaseTermOne.includes(lowerCaseTermTwo);
    case "NOT_CONTAINS":
      return !lowerCaseTermOne.includes(lowerCaseTermTwo);
    default:
      throw new Error("Conditional operand is not a valid operand.");
  }
}

function checkNumberConditional(
  termOne: string | string[],
  termTwo: string,
  operand: string
): boolean {
  if (typeof termOne !== "string") {
    throw new Error("Conditional termOne is not a string.");
  }

  const parsedOne = parseFloat(termOne);
  const parsedTwo = parseFloat(termTwo);

  if (isNaN(parsedOne) || isNaN(parsedTwo)) {
    throw new Error("Conditional termOne or termTwo is not a number.");
  }

  switch (operand) {
    case "GREATER_THAN":
      return parsedOne > parsedTwo;
    case "LESS_THAN":
      return parsedOne < parsedTwo;
    case "GREATER_THAN_OR_EQUAL_TO":
      return parsedOne >= parsedTwo;
    case "LESS_THAN_OR_EQUAL_TO":
      return parsedOne <= parsedTwo;
    default:
      throw new Error("Conditional operand is not a valid operand.");
  }
}

export default shouldRenderField;
