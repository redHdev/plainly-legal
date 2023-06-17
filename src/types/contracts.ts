import {
  type Contracts,
  type ContractQuestions,
  type Clauses,
  type ContractQuestionConditionals,
  type ClauseQuestions,
  type ClauseConditionals,
} from "@prisma/client"; // Import Prisma client

export interface FullContractQuestions extends ContractQuestions {
  conditionals: ContractQuestionConditionals[];
}

export interface FullClauses extends Clauses {
  questions: ClauseQuestions[];
  clauseConditionals: ClauseConditionals[];
}

//extend the Contracts type to include the contractQuestions
export interface FullContracts extends Contracts {
  contractQuestions: FullContractQuestions[];
  clauses: FullClauses[];
}
