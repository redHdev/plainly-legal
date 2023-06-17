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
    checkConditional(conditional, formData)
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

  //if termOne is undefined, return false right away because the conditional is not valid
  if (!termOne) {
    return false;
  }

  switch (conditional.operand) {
    case "GREATER_THAN":
    case "LESS_THAN":
    case "GREATER_THAN_OR_EQUAL_TO":
    case "LESS_THAN_OR_EQUAL_TO":
      if (typeof termOne !== "string") {
        throw new Error("Conditional termOne is not a string.");
      }
      return checkNumberConditional(
        termOne,
        conditional.termTwo,
        conditional.operand
      );
    case "CONTAINS":
    case "NOT_CONTAINS":
      return checkArrayConditional(
        termOne,
        conditional.termTwo,
        conditional.operand
      );
    case "EQUALS":
    case "NOT_EQUALS":
      if (typeof termOne !== "string") {
        throw new Error("Conditional termOne is not a string.");
      }
      return checkStringConditional(
        termOne,
        conditional.termTwo,
        conditional.operand
      );
    default:
      throw new Error("Conditional operand is not a valid operand.");
  }
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
  switch (operand) {
    case "EQUALS":
      return termOne === termTwo;
    case "NOT_EQUALS":
      return termOne !== termTwo;
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

  switch (operand) {
    case "CONTAINS":
      return termOne.includes(termTwo);
    case "NOT_CONTAINS":
      return !termOne.includes(termTwo);
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
