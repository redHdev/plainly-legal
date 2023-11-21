import { type SavedAgreements } from "@prisma/client";

//Export a lite agreement type that is SavedAgreements with only these keys
// id: true,
// user_id: true,
// archived: true,
// createdAt: true,
// updatedAt: true,
// completed: true,
// user_defined_name: true,
// agreement: true,
// data_questions: true,
// data_clause_answers: true,
  
export interface LiteSavedAgreements extends SavedAgreements {
  id: string;
  user_id: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  user_defined_name: string;
  agreement: string;
  data_questions: object;
  data_clause_answers: object;
}