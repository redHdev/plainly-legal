import { z } from "zod";
import { type ContractQuestions, type Clauses } from "@prisma/client"; // Import Prisma client

export const createDynamicContractQuestionsSchema = (
  contractQuestions: ContractQuestions[]
) => {
  const schema: {
    [key: string]: z.ZodOptional<z.ZodString | z.ZodArray<z.ZodString>>;
  } = {};

  // Hard code the users agreement name into the schema
  schema["users_agreement_name"] = z.string().optional();

  // Loop through the contract questions and add them to the schema
  contractQuestions.forEach((question) => {
    if (question.inputType === "CHECKBOX") {
      schema[question.variable] = z.array(z.string()).optional();
    } else {
      schema[question.variable] = z.string().optional();
    }
  });

  return z.object(schema);
};

export const createDynamicClauseSchema = () => {
  const schema: {
    [key: string]: z.ZodOptional<z.ZodString | z.ZodArray<z.ZodString>>;
  } = {};

  return z.object(schema);
};

export interface liveFormData {
  [x: string]: string | (string | undefined)[] | undefined;
}

export interface completionData {
  [x: string]: boolean;
}

export interface AgreementData {
  id: string;
  user_id: string;
  user_defined_name: string;
  agreement_variables: liveFormData;
  data_questions: liveFormData;
  data_clauses: Clauses[];
  data_clause_answers: liveFormData;
  data_contract_edits: liveFormData;
  completed: boolean;
}
