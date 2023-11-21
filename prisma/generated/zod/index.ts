import { z } from "zod";
import { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput =
  | Prisma.JsonValue
  | null
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | "JsonNull"
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | "DbNull"
  | Prisma.NullTypes.DbNull
  | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === "DbNull") return Prisma.DbNull;
  if (v === "JsonNull") return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ]),
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal("DbNull"), z.literal("JsonNull")])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(
  () =>
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
      z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
      z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    ]),
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const ContractsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "slug",
  "userRole",
  "name",
  "description",
  "agreementTitle",
  "variables",
  "tags",
  "createdAt",
  "updatedAt",
  "contractQuestionOrder",
  "clauseOrder",
]);

export const ContractQuestionsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "group",
  "variable",
  "text",
  "help",
  "inputType",
  "inputOptions",
]);

export const ContractQuestionConditionalsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "operand",
  "termOne",
  "termTwo",
]);

export const ClausesScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "group",
  "plainTextName",
  "version",
  "text",
  "help",
  "deleteWarning",
  "formatting",
]);

export const ClauseQuestionsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "questionType",
  "variable",
  "prompt",
  "help",
  "answerFormat",
  "answerOptions",
  "function",
]);

export const ClauseConditionalsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "operand",
  "termOne",
  "termTwo",
]);

export const SavedAgreementsScalarFieldEnumSchema = z.enum([
  "id",
  "user_defined_name",
  "agreement",
  "createdAt",
  "updatedAt",
  "user_id",
  "agreement_variables",
  "data_questions",
  "data_clauses",
  "data_clause_answers",
  "data_clause_calculations",
  "data_contract_edits",
  "completedClauses",
  "text",
  "completed",
  "archived",
]);

export const UserMetaScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "key",
  "value",
]);

export const BusinessProfileScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "businessName",
  "ownerName",
  "signerName",
  "contactEmail",
  "addressOne",
  "addressTwo",
  "city",
  "state",
  "zip",
  "website",
  "choiceOfLaw",
  "choiceOfForum",
  "disputeLocation",
  "enableFee",
  "prefillBusinessName",
  "prefillOwnerName",
  "prefillSignerName",
  "prefillContactEmail",
  "prefillAddress",
  "prefillWebsite",
  "prefillChoiceOfLaw",
  "prefillChoiceOfForum",
  "prefillDisputeLocation",
  "prefillEnableFee",
  "disclaimersIncluded",
  "disclaimerLegal",
  "disclaimerMedical",
  "disclaimerFitness",
  "disclaimerFinancial",
  "disclaimerTax",
]);

export const ProductScalarFieldEnumSchema = z.enum([
  "id",
  "productId",
  "name",
  "description",
  "priceId",
  "active",
]);

export const PricesScalarFieldEnumSchema = z.enum([
  "id",
  "priceId",
  "active",
  "currency",
  "productId",
  "unitAmount",
  "interval",
]);

export const SubscriptionScalarFieldEnumSchema = z.enum([
  "id",
  "subscriptionId",
  "metaData",
  "userId",
  "status",
  "price",
  "quantity",
  "cancelAtPeriodEnd",
  "cancelAt",
  "canceledAt",
  "currentPeriodStart",
  "currentPeriodEnd",
  "created",
  "endedAt",
  "trialStart",
  "trialEnd",
]);

export const CustomerScalarFieldEnumSchema = z.enum([
  "id",
  "uuId",
  "email",
  "stripeCustomerId",
]);

export const OptionsScalarFieldEnumSchema = z.enum(["id", "key", "value"]);

export const TermsOfServiceScalarFieldEnumSchema = z.enum([
  "id",
  "version",
  "text",
  "createdAt",
]);

export const UserTermsOfServiceAcceptanceScalarFieldEnumSchema = z.enum([
  "id",
  "userId",
  "createdAt",
]);

export const AuditQuestionsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "group",
  "variable",
  "text",
  "help",
  "answerType",
  "answerOptions",
]);

export const AuditQuestionConditionalsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "operand",
  "termOne",
  "termTwo",
]);

export const AuditQuestionSetsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "setCode",
  "variable",
  "text",
  "help",
  "answerType",
  "answerOptions",
]);

export const AuditQuestionSetConditionalsScalarFieldEnumSchema = z.enum([
  "id",
  "key",
  "operand",
  "termOne",
  "termTwo",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const JsonNullValueInputSchema = z
  .enum(["JsonNull"])
  .transform((value) => (value === "JsonNull" ? Prisma.JsonNull : value));

export const NullableJsonNullValueInputSchema = z
  .enum(["DbNull", "JsonNull"])
  .transform((value) =>
    value === "JsonNull"
      ? Prisma.JsonNull
      : value === "DbNull"
      ? Prisma.DbNull
      : value,
  );

export const JsonNullValueFilterSchema = z
  .enum(["DbNull", "JsonNull", "AnyNull"])
  .transform((value) =>
    value === "JsonNull"
      ? Prisma.JsonNull
      : value === "DbNull"
      ? Prisma.JsonNull
      : value === "AnyNull"
      ? Prisma.AnyNull
      : value,
  );

export const NullsOrderSchema = z.enum(["first", "last"]);

export const InputTypeSchema = z.enum([
  "SELECT",
  "CHECKBOX",
  "BOOLEAN",
  "DROPDOWN",
  "RADIO",
]);

export type InputTypeType = `${z.infer<typeof InputTypeSchema>}`;

export const OperandSchema = z.enum([
  "EQUALS",
  "NOT_EQUALS",
  "GREATER_THAN",
  "LESS_THAN",
  "GREATER_THAN_OR_EQUAL_TO",
  "LESS_THAN_OR_EQUAL_TO",
  "CONTAINS",
  "NOT_CONTAINS",
]);

export type OperandType = `${z.infer<typeof OperandSchema>}`;

export const answerFormatSchema = z.enum([
  "text",
  "price",
  "integer",
  "email",
  "address",
  "date",
  "percentage",
  "select",
  "wysiwyg",
]);

export type answerFormatType = `${z.infer<typeof answerFormatSchema>}`;

export const BusinessForumSchema = z.enum(["Arbitration", "Court"]);

export type BusinessForumType = `${z.infer<typeof BusinessForumSchema>}`;

export const auditAnswerFormatSchema = z.enum([
  "boolean",
  "text",
  "integer",
  "question_set",
]);

export type auditAnswerFormatType = `${z.infer<
  typeof auditAnswerFormatSchema
>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CONTRACTS SCHEMA
/////////////////////////////////////////

export const ContractsSchema = z.object({
  id: z.string().cuid(),
  key: z.number().int(),
  slug: z.string(),
  userRole: z.string(),
  name: z.string(),
  description: z.string(),
  agreementTitle: z.string(),
  variables: JsonValueSchema.nullable(),
  tags: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  contractQuestionOrder: JsonValueSchema,
  clauseOrder: JsonValueSchema,
});

export type Contracts = z.infer<typeof ContractsSchema>;

/////////////////////////////////////////
// CONTRACT QUESTIONS SCHEMA
/////////////////////////////////////////

export const ContractQuestionsSchema = z.object({
  inputType: InputTypeSchema,
  id: z.string().cuid(),
  key: z.number().int(),
  group: z.string(),
  variable: z.string(),
  text: z.string(),
  help: z.string().nullable(),
  inputOptions: JsonValueSchema,
});

export type ContractQuestions = z.infer<typeof ContractQuestionsSchema>;

/////////////////////////////////////////
// CONTRACT QUESTION CONDITIONALS SCHEMA
/////////////////////////////////////////

export const ContractQuestionConditionalsSchema = z.object({
  operand: OperandSchema,
  id: z.string().cuid(),
  key: z.number().int(),
  termOne: z.string(),
  termTwo: z.string(),
});

export type ContractQuestionConditionals = z.infer<
  typeof ContractQuestionConditionalsSchema
>;

/////////////////////////////////////////
// CLAUSES SCHEMA
/////////////////////////////////////////

export const ClausesSchema = z.object({
  id: z.string().cuid(),
  key: z.number().int(),
  group: z.string(),
  plainTextName: z.string(),
  version: z.string(),
  text: z.string(),
  help: z.string().nullable(),
  deleteWarning: z.string(),
  formatting: z.string(),
});

export type Clauses = z.infer<typeof ClausesSchema>;

/////////////////////////////////////////
// CLAUSE QUESTIONS SCHEMA
/////////////////////////////////////////

export const ClauseQuestionsSchema = z.object({
  answerFormat: answerFormatSchema,
  id: z.string().cuid(),
  key: z.number().int(),
  questionType: z.string(),
  variable: z.string(),
  prompt: z.string(),
  help: z.string(),
  answerOptions: JsonValueSchema,
  function: z.string().nullable(),
});

export type ClauseQuestions = z.infer<typeof ClauseQuestionsSchema>;

/////////////////////////////////////////
// CLAUSE CONDITIONALS SCHEMA
/////////////////////////////////////////

export const ClauseConditionalsSchema = z.object({
  operand: OperandSchema,
  id: z.string().cuid(),
  key: z.number().int(),
  termOne: z.string(),
  termTwo: z.string(),
});

export type ClauseConditionals = z.infer<typeof ClauseConditionalsSchema>;

/////////////////////////////////////////
// SAVED AGREEMENTS SCHEMA
/////////////////////////////////////////

export const SavedAgreementsSchema = z.object({
  id: z.string().cuid(),
  user_defined_name: z.string(),
  agreement: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user_id: z.string(),
  agreement_variables: JsonValueSchema.nullable(),
  data_questions: JsonValueSchema.nullable(),
  data_clauses: JsonValueSchema.nullable(),
  data_clause_answers: JsonValueSchema.nullable(),
  data_clause_calculations: JsonValueSchema.nullable(),
  data_contract_edits: JsonValueSchema.nullable(),
  completedClauses: JsonValueSchema.nullable(),
  text: z.string().nullable(),
  completed: z.boolean(),
  archived: z.boolean(),
});

export type SavedAgreements = z.infer<typeof SavedAgreementsSchema>;

/////////////////////////////////////////
// USER META SCHEMA
/////////////////////////////////////////

export const UserMetaSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  key: z.string(),
  value: z.string(),
});

export type UserMeta = z.infer<typeof UserMetaSchema>;

/////////////////////////////////////////
// BUSINESS PROFILE SCHEMA
/////////////////////////////////////////

export const BusinessProfileSchema = z.object({
  choiceOfForum: BusinessForumSchema,
  id: z.string().cuid(),
  userId: z.string(),
  businessName: z.string(),
  ownerName: z.string(),
  signerName: z.string(),
  contactEmail: z.string().nullable(),
  addressOne: z.string(),
  addressTwo: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  website: z.string().nullable(),
  choiceOfLaw: z.string(),
  disputeLocation: z.string().nullable(),
  enableFee: z.boolean(),
  prefillBusinessName: z.boolean(),
  prefillOwnerName: z.boolean(),
  prefillSignerName: z.boolean(),
  prefillContactEmail: z.boolean(),
  prefillAddress: z.boolean(),
  prefillWebsite: z.boolean(),
  prefillChoiceOfLaw: z.boolean(),
  prefillChoiceOfForum: z.boolean(),
  prefillDisputeLocation: z.boolean(),
  prefillEnableFee: z.boolean(),
  disclaimersIncluded: JsonValueSchema.nullable(),
  disclaimerLegal: z.string().nullable(),
  disclaimerMedical: z.string().nullable(),
  disclaimerFitness: z.string().nullable(),
  disclaimerFinancial: z.string().nullable(),
  disclaimerTax: z.string().nullable(),
});

export type BusinessProfile = z.infer<typeof BusinessProfileSchema>;

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.string().cuid(),
  productId: z.string(),
  name: z.string(),
  description: z.string(),
  priceId: z.string(),
  active: z.boolean(),
});

export type Product = z.infer<typeof ProductSchema>;

/////////////////////////////////////////
// PRICES SCHEMA
/////////////////////////////////////////

export const PricesSchema = z.object({
  id: z.string().cuid(),
  priceId: z.string(),
  active: z.boolean(),
  currency: z.string(),
  productId: z.string(),
  unitAmount: z.number().int(),
  interval: z.string(),
});

export type Prices = z.infer<typeof PricesSchema>;

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
  id: z.string().cuid(),
  subscriptionId: z.string(),
  metaData: JsonValueSchema.nullable(),
  userId: z.string(),
  status: z.string(),
  price: JsonValueSchema.nullable(),
  quantity: z.number().int(),
  cancelAtPeriodEnd: z.boolean(),
  cancelAt: z.string(),
  canceledAt: z.string(),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  created: z.string(),
  endedAt: z.string(),
  trialStart: z.string(),
  trialEnd: z.string(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

/////////////////////////////////////////
// CUSTOMER SCHEMA
/////////////////////////////////////////

export const CustomerSchema = z.object({
  id: z.string().cuid(),
  uuId: z.string(),
  email: z.string(),
  stripeCustomerId: z.string(),
});

export type Customer = z.infer<typeof CustomerSchema>;

/////////////////////////////////////////
// OPTIONS SCHEMA
/////////////////////////////////////////

export const OptionsSchema = z.object({
  id: z.string().cuid(),
  key: z.string(),
  value: z.string(),
});

export type Options = z.infer<typeof OptionsSchema>;

/////////////////////////////////////////
// TERMS OF SERVICE SCHEMA
/////////////////////////////////////////

export const TermsOfServiceSchema = z.object({
  id: z.string().cuid(),
  version: z.number().int(),
  text: z.string(),
  createdAt: z.coerce.date(),
});

export type TermsOfService = z.infer<typeof TermsOfServiceSchema>;

/////////////////////////////////////////
// USER TERMS OF SERVICE ACCEPTANCE SCHEMA
/////////////////////////////////////////

export const UserTermsOfServiceAcceptanceSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  createdAt: z.coerce.date(),
});

export type UserTermsOfServiceAcceptance = z.infer<
  typeof UserTermsOfServiceAcceptanceSchema
>;

/////////////////////////////////////////
// AUDIT QUESTIONS SCHEMA
/////////////////////////////////////////

export const AuditQuestionsSchema = z.object({
  answerType: auditAnswerFormatSchema,
  id: z.string().cuid(),
  key: z.number().int(),
  group: z.string(),
  variable: z.string(),
  text: z.string(),
  help: z.string(),
  answerOptions: JsonValueSchema,
});

export type AuditQuestions = z.infer<typeof AuditQuestionsSchema>;

/////////////////////////////////////////
// AUDIT QUESTION CONDITIONALS SCHEMA
/////////////////////////////////////////

export const AuditQuestionConditionalsSchema = z.object({
  operand: OperandSchema,
  id: z.string().cuid(),
  key: z.number().int(),
  termOne: z.string(),
  termTwo: z.string(),
});

export type AuditQuestionConditionals = z.infer<
  typeof AuditQuestionConditionalsSchema
>;

/////////////////////////////////////////
// AUDIT QUESTION SETS SCHEMA
/////////////////////////////////////////

export const AuditQuestionSetsSchema = z.object({
  answerType: auditAnswerFormatSchema,
  id: z.string().cuid(),
  key: z.number().int(),
  setCode: z.string(),
  variable: z.string(),
  text: z.string(),
  help: z.string(),
  answerOptions: JsonValueSchema,
});

export type AuditQuestionSets = z.infer<typeof AuditQuestionSetsSchema>;

/////////////////////////////////////////
// AUDIT QUESTION SET CONDITIONALS SCHEMA
/////////////////////////////////////////

export const AuditQuestionSetConditionalsSchema = z.object({
  operand: OperandSchema,
  id: z.string().cuid(),
  key: z.number().int(),
  termOne: z.string(),
  termTwo: z.string(),
});

export type AuditQuestionSetConditionals = z.infer<
  typeof AuditQuestionSetConditionalsSchema
>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CONTRACTS
//------------------------------------------------------

export const ContractsIncludeSchema: z.ZodType<Prisma.ContractsInclude> = z
  .object({
    contractQuestions: z
      .union([z.boolean(), z.lazy(() => ContractQuestionsFindManyArgsSchema)])
      .optional(),
    clauses: z
      .union([z.boolean(), z.lazy(() => ClausesFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ContractsCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ContractsArgsSchema: z.ZodType<Prisma.ContractsDefaultArgs> = z
  .object({
    select: z.lazy(() => ContractsSelectSchema).optional(),
    include: z.lazy(() => ContractsIncludeSchema).optional(),
  })
  .strict();

export const ContractsCountOutputTypeArgsSchema: z.ZodType<Prisma.ContractsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ContractsCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ContractsCountOutputTypeSelectSchema: z.ZodType<Prisma.ContractsCountOutputTypeSelect> =
  z
    .object({
      contractQuestions: z.boolean().optional(),
      clauses: z.boolean().optional(),
    })
    .strict();

export const ContractsSelectSchema: z.ZodType<Prisma.ContractsSelect> = z
  .object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    slug: z.boolean().optional(),
    userRole: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    agreementTitle: z.boolean().optional(),
    variables: z.boolean().optional(),
    tags: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    contractQuestionOrder: z.boolean().optional(),
    clauseOrder: z.boolean().optional(),
    contractQuestions: z
      .union([z.boolean(), z.lazy(() => ContractQuestionsFindManyArgsSchema)])
      .optional(),
    clauses: z
      .union([z.boolean(), z.lazy(() => ClausesFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ContractsCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// CONTRACT QUESTIONS
//------------------------------------------------------

export const ContractQuestionsIncludeSchema: z.ZodType<Prisma.ContractQuestionsInclude> =
  z
    .object({
      contract: z
        .union([z.boolean(), z.lazy(() => ContractsFindManyArgsSchema)])
        .optional(),
      conditionals: z
        .union([
          z.boolean(),
          z.lazy(() => ContractQuestionConditionalsFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => ContractQuestionsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsArgsSchema: z.ZodType<Prisma.ContractQuestionsDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ContractQuestionsSelectSchema).optional(),
      include: z.lazy(() => ContractQuestionsIncludeSchema).optional(),
    })
    .strict();

export const ContractQuestionsCountOutputTypeArgsSchema: z.ZodType<Prisma.ContractQuestionsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => ContractQuestionsCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const ContractQuestionsCountOutputTypeSelectSchema: z.ZodType<Prisma.ContractQuestionsCountOutputTypeSelect> =
  z
    .object({
      contract: z.boolean().optional(),
      conditionals: z.boolean().optional(),
    })
    .strict();

export const ContractQuestionsSelectSchema: z.ZodType<Prisma.ContractQuestionsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      group: z.boolean().optional(),
      variable: z.boolean().optional(),
      text: z.boolean().optional(),
      help: z.boolean().optional(),
      inputType: z.boolean().optional(),
      inputOptions: z.boolean().optional(),
      contract: z
        .union([z.boolean(), z.lazy(() => ContractsFindManyArgsSchema)])
        .optional(),
      conditionals: z
        .union([
          z.boolean(),
          z.lazy(() => ContractQuestionConditionalsFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => ContractQuestionsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// CONTRACT QUESTION CONDITIONALS
//------------------------------------------------------

export const ContractQuestionConditionalsIncludeSchema: z.ZodType<Prisma.ContractQuestionConditionalsInclude> =
  z
    .object({
      contractQuestion: z
        .union([z.boolean(), z.lazy(() => ContractQuestionsFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => ContractQuestionConditionalsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ContractQuestionConditionalsSelectSchema).optional(),
      include: z
        .lazy(() => ContractQuestionConditionalsIncludeSchema)
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsCountOutputTypeArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => ContractQuestionConditionalsCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const ContractQuestionConditionalsCountOutputTypeSelectSchema: z.ZodType<Prisma.ContractQuestionConditionalsCountOutputTypeSelect> =
  z
    .object({
      contractQuestion: z.boolean().optional(),
    })
    .strict();

export const ContractQuestionConditionalsSelectSchema: z.ZodType<Prisma.ContractQuestionConditionalsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      operand: z.boolean().optional(),
      termOne: z.boolean().optional(),
      termTwo: z.boolean().optional(),
      contractQuestion: z
        .union([z.boolean(), z.lazy(() => ContractQuestionsFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => ContractQuestionConditionalsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// CLAUSES
//------------------------------------------------------

export const ClausesIncludeSchema: z.ZodType<Prisma.ClausesInclude> = z
  .object({
    contract: z
      .union([z.boolean(), z.lazy(() => ContractsFindManyArgsSchema)])
      .optional(),
    questions: z
      .union([z.boolean(), z.lazy(() => ClauseQuestionsFindManyArgsSchema)])
      .optional(),
    clauseConditionals: z
      .union([z.boolean(), z.lazy(() => ClauseConditionalsFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ClausesCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ClausesArgsSchema: z.ZodType<Prisma.ClausesDefaultArgs> = z
  .object({
    select: z.lazy(() => ClausesSelectSchema).optional(),
    include: z.lazy(() => ClausesIncludeSchema).optional(),
  })
  .strict();

export const ClausesCountOutputTypeArgsSchema: z.ZodType<Prisma.ClausesCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ClausesCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ClausesCountOutputTypeSelectSchema: z.ZodType<Prisma.ClausesCountOutputTypeSelect> =
  z
    .object({
      contract: z.boolean().optional(),
      questions: z.boolean().optional(),
      clauseConditionals: z.boolean().optional(),
    })
    .strict();

export const ClausesSelectSchema: z.ZodType<Prisma.ClausesSelect> = z
  .object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    group: z.boolean().optional(),
    plainTextName: z.boolean().optional(),
    version: z.boolean().optional(),
    text: z.boolean().optional(),
    help: z.boolean().optional(),
    deleteWarning: z.boolean().optional(),
    formatting: z.boolean().optional(),
    contract: z
      .union([z.boolean(), z.lazy(() => ContractsFindManyArgsSchema)])
      .optional(),
    questions: z
      .union([z.boolean(), z.lazy(() => ClauseQuestionsFindManyArgsSchema)])
      .optional(),
    clauseConditionals: z
      .union([z.boolean(), z.lazy(() => ClauseConditionalsFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ClausesCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// CLAUSE QUESTIONS
//------------------------------------------------------

export const ClauseQuestionsIncludeSchema: z.ZodType<Prisma.ClauseQuestionsInclude> =
  z
    .object({
      clause: z
        .union([z.boolean(), z.lazy(() => ClausesFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => ClauseQuestionsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsArgsSchema: z.ZodType<Prisma.ClauseQuestionsDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ClauseQuestionsSelectSchema).optional(),
      include: z.lazy(() => ClauseQuestionsIncludeSchema).optional(),
    })
    .strict();

export const ClauseQuestionsCountOutputTypeArgsSchema: z.ZodType<Prisma.ClauseQuestionsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => ClauseQuestionsCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const ClauseQuestionsCountOutputTypeSelectSchema: z.ZodType<Prisma.ClauseQuestionsCountOutputTypeSelect> =
  z
    .object({
      clause: z.boolean().optional(),
    })
    .strict();

export const ClauseQuestionsSelectSchema: z.ZodType<Prisma.ClauseQuestionsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      questionType: z.boolean().optional(),
      variable: z.boolean().optional(),
      prompt: z.boolean().optional(),
      help: z.boolean().optional(),
      answerFormat: z.boolean().optional(),
      answerOptions: z.boolean().optional(),
      function: z.boolean().optional(),
      clause: z
        .union([z.boolean(), z.lazy(() => ClausesFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => ClauseQuestionsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// CLAUSE CONDITIONALS
//------------------------------------------------------

export const ClauseConditionalsIncludeSchema: z.ZodType<Prisma.ClauseConditionalsInclude> =
  z
    .object({
      clause: z
        .union([z.boolean(), z.lazy(() => ClausesFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => ClauseConditionalsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsArgsSchema: z.ZodType<Prisma.ClauseConditionalsDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ClauseConditionalsSelectSchema).optional(),
      include: z.lazy(() => ClauseConditionalsIncludeSchema).optional(),
    })
    .strict();

export const ClauseConditionalsCountOutputTypeArgsSchema: z.ZodType<Prisma.ClauseConditionalsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => ClauseConditionalsCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const ClauseConditionalsCountOutputTypeSelectSchema: z.ZodType<Prisma.ClauseConditionalsCountOutputTypeSelect> =
  z
    .object({
      clause: z.boolean().optional(),
    })
    .strict();

export const ClauseConditionalsSelectSchema: z.ZodType<Prisma.ClauseConditionalsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      operand: z.boolean().optional(),
      termOne: z.boolean().optional(),
      termTwo: z.boolean().optional(),
      clause: z
        .union([z.boolean(), z.lazy(() => ClausesFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => ClauseConditionalsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// SAVED AGREEMENTS
//------------------------------------------------------

export const SavedAgreementsSelectSchema: z.ZodType<Prisma.SavedAgreementsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      user_defined_name: z.boolean().optional(),
      agreement: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      user_id: z.boolean().optional(),
      agreement_variables: z.boolean().optional(),
      data_questions: z.boolean().optional(),
      data_clauses: z.boolean().optional(),
      data_clause_answers: z.boolean().optional(),
      data_clause_calculations: z.boolean().optional(),
      data_contract_edits: z.boolean().optional(),
      completedClauses: z.boolean().optional(),
      text: z.boolean().optional(),
      completed: z.boolean().optional(),
      archived: z.boolean().optional(),
    })
    .strict();

// USER META
//------------------------------------------------------

export const UserMetaSelectSchema: z.ZodType<Prisma.UserMetaSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    key: z.boolean().optional(),
    value: z.boolean().optional(),
  })
  .strict();

// BUSINESS PROFILE
//------------------------------------------------------

export const BusinessProfileSelectSchema: z.ZodType<Prisma.BusinessProfileSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      businessName: z.boolean().optional(),
      ownerName: z.boolean().optional(),
      signerName: z.boolean().optional(),
      contactEmail: z.boolean().optional(),
      addressOne: z.boolean().optional(),
      addressTwo: z.boolean().optional(),
      city: z.boolean().optional(),
      state: z.boolean().optional(),
      zip: z.boolean().optional(),
      website: z.boolean().optional(),
      choiceOfLaw: z.boolean().optional(),
      choiceOfForum: z.boolean().optional(),
      disputeLocation: z.boolean().optional(),
      enableFee: z.boolean().optional(),
      prefillBusinessName: z.boolean().optional(),
      prefillOwnerName: z.boolean().optional(),
      prefillSignerName: z.boolean().optional(),
      prefillContactEmail: z.boolean().optional(),
      prefillAddress: z.boolean().optional(),
      prefillWebsite: z.boolean().optional(),
      prefillChoiceOfLaw: z.boolean().optional(),
      prefillChoiceOfForum: z.boolean().optional(),
      prefillDisputeLocation: z.boolean().optional(),
      prefillEnableFee: z.boolean().optional(),
      disclaimersIncluded: z.boolean().optional(),
      disclaimerLegal: z.boolean().optional(),
      disclaimerMedical: z.boolean().optional(),
      disclaimerFitness: z.boolean().optional(),
      disclaimerFinancial: z.boolean().optional(),
      disclaimerTax: z.boolean().optional(),
    })
    .strict();

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z
  .object({
    price: z
      .union([z.boolean(), z.lazy(() => PricesFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductSelectSchema).optional(),
    include: z.lazy(() => ProductIncludeSchema).optional(),
  })
  .strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> =
  z
    .object({
      price: z.boolean().optional(),
    })
    .strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z
  .object({
    id: z.boolean().optional(),
    productId: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    priceId: z.boolean().optional(),
    active: z.boolean().optional(),
    price: z
      .union([z.boolean(), z.lazy(() => PricesFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// PRICES
//------------------------------------------------------

export const PricesIncludeSchema: z.ZodType<Prisma.PricesInclude> = z
  .object({
    products: z
      .union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => PricesCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const PricesArgsSchema: z.ZodType<Prisma.PricesDefaultArgs> = z
  .object({
    select: z.lazy(() => PricesSelectSchema).optional(),
    include: z.lazy(() => PricesIncludeSchema).optional(),
  })
  .strict();

export const PricesCountOutputTypeArgsSchema: z.ZodType<Prisma.PricesCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => PricesCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const PricesCountOutputTypeSelectSchema: z.ZodType<Prisma.PricesCountOutputTypeSelect> =
  z
    .object({
      products: z.boolean().optional(),
    })
    .strict();

export const PricesSelectSchema: z.ZodType<Prisma.PricesSelect> = z
  .object({
    id: z.boolean().optional(),
    priceId: z.boolean().optional(),
    active: z.boolean().optional(),
    currency: z.boolean().optional(),
    productId: z.boolean().optional(),
    unitAmount: z.boolean().optional(),
    interval: z.boolean().optional(),
    products: z
      .union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => PricesCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// SUBSCRIPTION
//------------------------------------------------------

export const SubscriptionSelectSchema: z.ZodType<Prisma.SubscriptionSelect> = z
  .object({
    id: z.boolean().optional(),
    subscriptionId: z.boolean().optional(),
    metaData: z.boolean().optional(),
    userId: z.boolean().optional(),
    status: z.boolean().optional(),
    price: z.boolean().optional(),
    quantity: z.boolean().optional(),
    cancelAtPeriodEnd: z.boolean().optional(),
    cancelAt: z.boolean().optional(),
    canceledAt: z.boolean().optional(),
    currentPeriodStart: z.boolean().optional(),
    currentPeriodEnd: z.boolean().optional(),
    created: z.boolean().optional(),
    endedAt: z.boolean().optional(),
    trialStart: z.boolean().optional(),
    trialEnd: z.boolean().optional(),
  })
  .strict();

// CUSTOMER
//------------------------------------------------------

export const CustomerSelectSchema: z.ZodType<Prisma.CustomerSelect> = z
  .object({
    id: z.boolean().optional(),
    uuId: z.boolean().optional(),
    email: z.boolean().optional(),
    stripeCustomerId: z.boolean().optional(),
  })
  .strict();

// OPTIONS
//------------------------------------------------------

export const OptionsSelectSchema: z.ZodType<Prisma.OptionsSelect> = z
  .object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    value: z.boolean().optional(),
  })
  .strict();

// TERMS OF SERVICE
//------------------------------------------------------

export const TermsOfServiceIncludeSchema: z.ZodType<Prisma.TermsOfServiceInclude> =
  z
    .object({
      userTermsOfServiceAcceptance: z
        .union([
          z.boolean(),
          z.lazy(() => UserTermsOfServiceAcceptanceFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => TermsOfServiceCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceArgsSchema: z.ZodType<Prisma.TermsOfServiceDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TermsOfServiceSelectSchema).optional(),
      include: z.lazy(() => TermsOfServiceIncludeSchema).optional(),
    })
    .strict();

export const TermsOfServiceCountOutputTypeArgsSchema: z.ZodType<Prisma.TermsOfServiceCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TermsOfServiceCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const TermsOfServiceCountOutputTypeSelectSchema: z.ZodType<Prisma.TermsOfServiceCountOutputTypeSelect> =
  z
    .object({
      userTermsOfServiceAcceptance: z.boolean().optional(),
    })
    .strict();

export const TermsOfServiceSelectSchema: z.ZodType<Prisma.TermsOfServiceSelect> =
  z
    .object({
      id: z.boolean().optional(),
      version: z.boolean().optional(),
      text: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      userTermsOfServiceAcceptance: z
        .union([
          z.boolean(),
          z.lazy(() => UserTermsOfServiceAcceptanceFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => TermsOfServiceCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// USER TERMS OF SERVICE ACCEPTANCE
//------------------------------------------------------

export const UserTermsOfServiceAcceptanceIncludeSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceInclude> =
  z
    .object({
      termsOfService: z
        .union([z.boolean(), z.lazy(() => TermsOfServiceFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => UserTermsOfServiceAcceptanceCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserTermsOfServiceAcceptanceSelectSchema).optional(),
      include: z
        .lazy(() => UserTermsOfServiceAcceptanceIncludeSchema)
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCountOutputTypeArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => UserTermsOfServiceAcceptanceCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCountOutputTypeSelectSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCountOutputTypeSelect> =
  z
    .object({
      termsOfService: z.boolean().optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceSelectSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      termsOfService: z
        .union([z.boolean(), z.lazy(() => TermsOfServiceFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => UserTermsOfServiceAcceptanceCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// AUDIT QUESTIONS
//------------------------------------------------------

export const AuditQuestionsIncludeSchema: z.ZodType<Prisma.AuditQuestionsInclude> =
  z
    .object({
      conditionals: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionConditionalsFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsArgsSchema: z.ZodType<Prisma.AuditQuestionsDefaultArgs> =
  z
    .object({
      select: z.lazy(() => AuditQuestionsSelectSchema).optional(),
      include: z.lazy(() => AuditQuestionsIncludeSchema).optional(),
    })
    .strict();

export const AuditQuestionsCountOutputTypeArgsSchema: z.ZodType<Prisma.AuditQuestionsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => AuditQuestionsCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const AuditQuestionsCountOutputTypeSelectSchema: z.ZodType<Prisma.AuditQuestionsCountOutputTypeSelect> =
  z
    .object({
      conditionals: z.boolean().optional(),
    })
    .strict();

export const AuditQuestionsSelectSchema: z.ZodType<Prisma.AuditQuestionsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      group: z.boolean().optional(),
      variable: z.boolean().optional(),
      text: z.boolean().optional(),
      help: z.boolean().optional(),
      answerType: z.boolean().optional(),
      answerOptions: z.boolean().optional(),
      conditionals: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionConditionalsFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// AUDIT QUESTION CONDITIONALS
//------------------------------------------------------

export const AuditQuestionConditionalsIncludeSchema: z.ZodType<Prisma.AuditQuestionConditionalsInclude> =
  z
    .object({
      question: z
        .union([z.boolean(), z.lazy(() => AuditQuestionsFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionConditionalsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsDefaultArgs> =
  z
    .object({
      select: z.lazy(() => AuditQuestionConditionalsSelectSchema).optional(),
      include: z.lazy(() => AuditQuestionConditionalsIncludeSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsCountOutputTypeArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => AuditQuestionConditionalsCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const AuditQuestionConditionalsCountOutputTypeSelectSchema: z.ZodType<Prisma.AuditQuestionConditionalsCountOutputTypeSelect> =
  z
    .object({
      question: z.boolean().optional(),
    })
    .strict();

export const AuditQuestionConditionalsSelectSchema: z.ZodType<Prisma.AuditQuestionConditionalsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      operand: z.boolean().optional(),
      termOne: z.boolean().optional(),
      termTwo: z.boolean().optional(),
      question: z
        .union([z.boolean(), z.lazy(() => AuditQuestionsFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionConditionalsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// AUDIT QUESTION SETS
//------------------------------------------------------

export const AuditQuestionSetsIncludeSchema: z.ZodType<Prisma.AuditQuestionSetsInclude> =
  z
    .object({
      conditionals: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionSetConditionalsFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionSetsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsArgsSchema: z.ZodType<Prisma.AuditQuestionSetsDefaultArgs> =
  z
    .object({
      select: z.lazy(() => AuditQuestionSetsSelectSchema).optional(),
      include: z.lazy(() => AuditQuestionSetsIncludeSchema).optional(),
    })
    .strict();

export const AuditQuestionSetsCountOutputTypeArgsSchema: z.ZodType<Prisma.AuditQuestionSetsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => AuditQuestionSetsCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const AuditQuestionSetsCountOutputTypeSelectSchema: z.ZodType<Prisma.AuditQuestionSetsCountOutputTypeSelect> =
  z
    .object({
      conditionals: z.boolean().optional(),
    })
    .strict();

export const AuditQuestionSetsSelectSchema: z.ZodType<Prisma.AuditQuestionSetsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      setCode: z.boolean().optional(),
      variable: z.boolean().optional(),
      text: z.boolean().optional(),
      help: z.boolean().optional(),
      answerType: z.boolean().optional(),
      answerOptions: z.boolean().optional(),
      conditionals: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionSetConditionalsFindManyArgsSchema),
        ])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionSetsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// AUDIT QUESTION SET CONDITIONALS
//------------------------------------------------------

export const AuditQuestionSetConditionalsIncludeSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsInclude> =
  z
    .object({
      question: z
        .union([z.boolean(), z.lazy(() => AuditQuestionSetsFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionSetConditionalsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsDefaultArgs> =
  z
    .object({
      select: z.lazy(() => AuditQuestionSetConditionalsSelectSchema).optional(),
      include: z
        .lazy(() => AuditQuestionSetConditionalsIncludeSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsCountOutputTypeArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => AuditQuestionSetConditionalsCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const AuditQuestionSetConditionalsCountOutputTypeSelectSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCountOutputTypeSelect> =
  z
    .object({
      question: z.boolean().optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsSelectSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsSelect> =
  z
    .object({
      id: z.boolean().optional(),
      key: z.boolean().optional(),
      operand: z.boolean().optional(),
      termOne: z.boolean().optional(),
      termTwo: z.boolean().optional(),
      question: z
        .union([z.boolean(), z.lazy(() => AuditQuestionSetsFindManyArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => AuditQuestionSetConditionalsCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ContractsWhereInputSchema: z.ZodType<Prisma.ContractsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContractsWhereInputSchema),
          z.lazy(() => ContractsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContractsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContractsWhereInputSchema),
          z.lazy(() => ContractsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      slug: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userRole: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      agreementTitle: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      variables: z.lazy(() => JsonFilterSchema).optional(),
      tags: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      contractQuestionOrder: z.lazy(() => JsonNullableFilterSchema).optional(),
      clauseOrder: z.lazy(() => JsonNullableFilterSchema).optional(),
      contractQuestions: z
        .lazy(() => ContractQuestionsListRelationFilterSchema)
        .optional(),
      clauses: z.lazy(() => ClausesListRelationFilterSchema).optional(),
    })
    .strict();

export const ContractsOrderByWithRelationInputSchema: z.ZodType<Prisma.ContractsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
      userRole: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      agreementTitle: z.lazy(() => SortOrderSchema).optional(),
      variables: z.lazy(() => SortOrderSchema).optional(),
      tags: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      contractQuestions: z
        .lazy(() => ContractQuestionsOrderByRelationAggregateInputSchema)
        .optional(),
      clauses: z
        .lazy(() => ClausesOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ContractsWhereUniqueInputSchema: z.ZodType<Prisma.ContractsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
        slug: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
        slug: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
        slug: z.string(),
      }),
      z.object({
        key: z.number().int(),
      }),
      z.object({
        slug: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          slug: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => ContractsWhereInputSchema),
              z.lazy(() => ContractsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ContractsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ContractsWhereInputSchema),
              z.lazy(() => ContractsWhereInputSchema).array(),
            ])
            .optional(),
          userRole: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          agreementTitle: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          variables: z.lazy(() => JsonFilterSchema).optional(),
          tags: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          contractQuestionOrder: z
            .lazy(() => JsonNullableFilterSchema)
            .optional(),
          clauseOrder: z.lazy(() => JsonNullableFilterSchema).optional(),
          contractQuestions: z
            .lazy(() => ContractQuestionsListRelationFilterSchema)
            .optional(),
          clauses: z.lazy(() => ClausesListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const ContractsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContractsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
      userRole: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      agreementTitle: z.lazy(() => SortOrderSchema).optional(),
      variables: z.lazy(() => SortOrderSchema).optional(),
      tags: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => ContractsCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => ContractsAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ContractsMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ContractsMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => ContractsSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ContractsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContractsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContractsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ContractsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContractsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContractsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ContractsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      slug: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userRole: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      agreementTitle: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      variables: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      tags: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      contractQuestionOrder: z
        .lazy(() => JsonNullableWithAggregatesFilterSchema)
        .optional(),
      clauseOrder: z
        .lazy(() => JsonNullableWithAggregatesFilterSchema)
        .optional(),
    })
    .strict();

export const ContractQuestionsWhereInputSchema: z.ZodType<Prisma.ContractQuestionsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContractQuestionsWhereInputSchema),
          z.lazy(() => ContractQuestionsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContractQuestionsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContractQuestionsWhereInputSchema),
          z.lazy(() => ContractQuestionsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      group: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      variable: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      help: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => EnumInputTypeFilterSchema),
          z.lazy(() => InputTypeSchema),
        ])
        .optional(),
      inputOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
      contract: z.lazy(() => ContractsListRelationFilterSchema).optional(),
      conditionals: z
        .lazy(() => ContractQuestionConditionalsListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const ContractQuestionsOrderByWithRelationInputSchema: z.ZodType<Prisma.ContractQuestionsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      inputType: z.lazy(() => SortOrderSchema).optional(),
      inputOptions: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      contract: z
        .lazy(() => ContractsOrderByRelationAggregateInputSchema)
        .optional(),
      conditionals: z
        .lazy(
          () => ContractQuestionConditionalsOrderByRelationAggregateInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsWhereUniqueInputSchema: z.ZodType<Prisma.ContractQuestionsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ContractQuestionsWhereInputSchema),
              z.lazy(() => ContractQuestionsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ContractQuestionsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ContractQuestionsWhereInputSchema),
              z.lazy(() => ContractQuestionsWhereInputSchema).array(),
            ])
            .optional(),
          group: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          variable: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          text: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          help: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          inputType: z
            .union([
              z.lazy(() => EnumInputTypeFilterSchema),
              z.lazy(() => InputTypeSchema),
            ])
            .optional(),
          inputOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
          contract: z.lazy(() => ContractsListRelationFilterSchema).optional(),
          conditionals: z
            .lazy(() => ContractQuestionConditionalsListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const ContractQuestionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContractQuestionsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      inputType: z.lazy(() => SortOrderSchema).optional(),
      inputOptions: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => ContractQuestionsCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => ContractQuestionsAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => ContractQuestionsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => ContractQuestionsMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => ContractQuestionsSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ContractQuestionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContractQuestionsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContractQuestionsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ContractQuestionsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContractQuestionsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContractQuestionsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ContractQuestionsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      group: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      variable: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      text: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      help: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => EnumInputTypeWithAggregatesFilterSchema),
          z.lazy(() => InputTypeSchema),
        ])
        .optional(),
      inputOptions: z
        .lazy(() => JsonNullableWithAggregatesFilterSchema)
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsWhereInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereInputSchema),
          z.lazy(() => ContractQuestionConditionalsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContractQuestionConditionalsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereInputSchema),
          z.lazy(() => ContractQuestionConditionalsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      contractQuestion: z
        .lazy(() => ContractQuestionsListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsOrderByWithRelationInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
      contractQuestion: z
        .lazy(() => ContractQuestionsOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsWhereUniqueInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ContractQuestionConditionalsWhereInputSchema),
              z
                .lazy(() => ContractQuestionConditionalsWhereInputSchema)
                .array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ContractQuestionConditionalsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ContractQuestionConditionalsWhereInputSchema),
              z
                .lazy(() => ContractQuestionConditionalsWhereInputSchema)
                .array(),
            ])
            .optional(),
          operand: z
            .union([
              z.lazy(() => EnumOperandFilterSchema),
              z.lazy(() => OperandSchema),
            ])
            .optional(),
          termOne: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          termTwo: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          contractQuestion: z
            .lazy(() => ContractQuestionsListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const ContractQuestionConditionalsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(
          () => ContractQuestionConditionalsCountOrderByAggregateInputSchema,
        )
        .optional(),
      _avg: z
        .lazy(() => ContractQuestionConditionalsAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => ContractQuestionConditionalsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => ContractQuestionConditionalsMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => ContractQuestionConditionalsSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(
          () =>
            ContractQuestionConditionalsScalarWhereWithAggregatesInputSchema,
        )
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandWithAggregatesFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ClausesWhereInputSchema: z.ZodType<Prisma.ClausesWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ClausesWhereInputSchema),
        z.lazy(() => ClausesWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ClausesWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ClausesWhereInputSchema),
        z.lazy(() => ClausesWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    group: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    plainTextName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    version: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    help: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    deleteWarning: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    formatting: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    contract: z.lazy(() => ContractsListRelationFilterSchema).optional(),
    questions: z.lazy(() => ClauseQuestionsListRelationFilterSchema).optional(),
    clauseConditionals: z
      .lazy(() => ClauseConditionalsListRelationFilterSchema)
      .optional(),
  })
  .strict();

export const ClausesOrderByWithRelationInputSchema: z.ZodType<Prisma.ClausesOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      plainTextName: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      deleteWarning: z.lazy(() => SortOrderSchema).optional(),
      formatting: z.lazy(() => SortOrderSchema).optional(),
      contract: z
        .lazy(() => ContractsOrderByRelationAggregateInputSchema)
        .optional(),
      questions: z
        .lazy(() => ClauseQuestionsOrderByRelationAggregateInputSchema)
        .optional(),
      clauseConditionals: z
        .lazy(() => ClauseConditionalsOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ClausesWhereUniqueInputSchema: z.ZodType<Prisma.ClausesWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ClausesWhereInputSchema),
              z.lazy(() => ClausesWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ClausesWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ClausesWhereInputSchema),
              z.lazy(() => ClausesWhereInputSchema).array(),
            ])
            .optional(),
          group: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          plainTextName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          version: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          text: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          help: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          deleteWarning: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          formatting: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          contract: z.lazy(() => ContractsListRelationFilterSchema).optional(),
          questions: z
            .lazy(() => ClauseQuestionsListRelationFilterSchema)
            .optional(),
          clauseConditionals: z
            .lazy(() => ClauseConditionalsListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const ClausesOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClausesOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      plainTextName: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      deleteWarning: z.lazy(() => SortOrderSchema).optional(),
      formatting: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => ClausesCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => ClausesAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ClausesMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ClausesMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => ClausesSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ClausesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClausesScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ClausesScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ClausesScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ClausesScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ClausesScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ClausesScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      group: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      plainTextName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      version: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      text: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      help: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      formatting: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ClauseQuestionsWhereInputSchema: z.ZodType<Prisma.ClauseQuestionsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ClauseQuestionsWhereInputSchema),
          z.lazy(() => ClauseQuestionsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ClauseQuestionsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ClauseQuestionsWhereInputSchema),
          z.lazy(() => ClauseQuestionsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      questionType: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      variable: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      prompt: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      help: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      answerFormat: z
        .union([
          z.lazy(() => EnumanswerFormatFilterSchema),
          z.lazy(() => answerFormatSchema),
        ])
        .optional(),
      answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
      function: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      clause: z.lazy(() => ClausesListRelationFilterSchema).optional(),
    })
    .strict();

export const ClauseQuestionsOrderByWithRelationInputSchema: z.ZodType<Prisma.ClauseQuestionsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      questionType: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerFormat: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      function: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      clause: z
        .lazy(() => ClausesOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ClauseQuestionsWhereUniqueInputSchema: z.ZodType<Prisma.ClauseQuestionsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ClauseQuestionsWhereInputSchema),
              z.lazy(() => ClauseQuestionsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ClauseQuestionsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ClauseQuestionsWhereInputSchema),
              z.lazy(() => ClauseQuestionsWhereInputSchema).array(),
            ])
            .optional(),
          questionType: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          variable: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          prompt: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          help: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          answerFormat: z
            .union([
              z.lazy(() => EnumanswerFormatFilterSchema),
              z.lazy(() => answerFormatSchema),
            ])
            .optional(),
          answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
          function: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          clause: z.lazy(() => ClausesListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const ClauseQuestionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClauseQuestionsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      questionType: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerFormat: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      function: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => ClauseQuestionsCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => ClauseQuestionsAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => ClauseQuestionsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => ClauseQuestionsMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => ClauseQuestionsSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ClauseQuestionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClauseQuestionsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ClauseQuestionsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ClauseQuestionsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ClauseQuestionsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ClauseQuestionsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ClauseQuestionsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      questionType: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      variable: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      prompt: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      help: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      answerFormat: z
        .union([
          z.lazy(() => EnumanswerFormatWithAggregatesFilterSchema),
          z.lazy(() => answerFormatSchema),
        ])
        .optional(),
      answerOptions: z
        .lazy(() => JsonNullableWithAggregatesFilterSchema)
        .optional(),
      function: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ClauseConditionalsWhereInputSchema: z.ZodType<Prisma.ClauseConditionalsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ClauseConditionalsWhereInputSchema),
          z.lazy(() => ClauseConditionalsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ClauseConditionalsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ClauseConditionalsWhereInputSchema),
          z.lazy(() => ClauseConditionalsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      clause: z.lazy(() => ClausesListRelationFilterSchema).optional(),
    })
    .strict();

export const ClauseConditionalsOrderByWithRelationInputSchema: z.ZodType<Prisma.ClauseConditionalsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
      clause: z
        .lazy(() => ClausesOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ClauseConditionalsWhereUniqueInputSchema: z.ZodType<Prisma.ClauseConditionalsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ClauseConditionalsWhereInputSchema),
              z.lazy(() => ClauseConditionalsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ClauseConditionalsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ClauseConditionalsWhereInputSchema),
              z.lazy(() => ClauseConditionalsWhereInputSchema).array(),
            ])
            .optional(),
          operand: z
            .union([
              z.lazy(() => EnumOperandFilterSchema),
              z.lazy(() => OperandSchema),
            ])
            .optional(),
          termOne: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          termTwo: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          clause: z.lazy(() => ClausesListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const ClauseConditionalsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClauseConditionalsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => ClauseConditionalsCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => ClauseConditionalsAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => ClauseConditionalsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => ClauseConditionalsMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => ClauseConditionalsSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const ClauseConditionalsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClauseConditionalsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ClauseConditionalsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ClauseConditionalsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ClauseConditionalsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ClauseConditionalsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => ClauseConditionalsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandWithAggregatesFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SavedAgreementsWhereInputSchema: z.ZodType<Prisma.SavedAgreementsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SavedAgreementsWhereInputSchema),
          z.lazy(() => SavedAgreementsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SavedAgreementsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SavedAgreementsWhereInputSchema),
          z.lazy(() => SavedAgreementsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      user_defined_name: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      agreement: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      user_id: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      agreement_variables: z.lazy(() => JsonFilterSchema).optional(),
      data_questions: z.lazy(() => JsonFilterSchema).optional(),
      data_clauses: z.lazy(() => JsonFilterSchema).optional(),
      data_clause_answers: z.lazy(() => JsonFilterSchema).optional(),
      data_clause_calculations: z.lazy(() => JsonFilterSchema).optional(),
      data_contract_edits: z.lazy(() => JsonFilterSchema).optional(),
      completedClauses: z.lazy(() => JsonFilterSchema).optional(),
      text: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      completed: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      archived: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
    })
    .strict();

export const SavedAgreementsOrderByWithRelationInputSchema: z.ZodType<Prisma.SavedAgreementsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      user_defined_name: z.lazy(() => SortOrderSchema).optional(),
      agreement: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
      agreement_variables: z.lazy(() => SortOrderSchema).optional(),
      data_questions: z.lazy(() => SortOrderSchema).optional(),
      data_clauses: z.lazy(() => SortOrderSchema).optional(),
      data_clause_answers: z.lazy(() => SortOrderSchema).optional(),
      data_clause_calculations: z.lazy(() => SortOrderSchema).optional(),
      data_contract_edits: z.lazy(() => SortOrderSchema).optional(),
      completedClauses: z.lazy(() => SortOrderSchema).optional(),
      text: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      completed: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SavedAgreementsWhereUniqueInputSchema: z.ZodType<Prisma.SavedAgreementsWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => SavedAgreementsWhereInputSchema),
              z.lazy(() => SavedAgreementsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SavedAgreementsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SavedAgreementsWhereInputSchema),
              z.lazy(() => SavedAgreementsWhereInputSchema).array(),
            ])
            .optional(),
          user_defined_name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          agreement: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          user_id: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          agreement_variables: z.lazy(() => JsonFilterSchema).optional(),
          data_questions: z.lazy(() => JsonFilterSchema).optional(),
          data_clauses: z.lazy(() => JsonFilterSchema).optional(),
          data_clause_answers: z.lazy(() => JsonFilterSchema).optional(),
          data_clause_calculations: z.lazy(() => JsonFilterSchema).optional(),
          data_contract_edits: z.lazy(() => JsonFilterSchema).optional(),
          completedClauses: z.lazy(() => JsonFilterSchema).optional(),
          text: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          completed: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          archived: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
        })
        .strict(),
    );

export const SavedAgreementsOrderByWithAggregationInputSchema: z.ZodType<Prisma.SavedAgreementsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      user_defined_name: z.lazy(() => SortOrderSchema).optional(),
      agreement: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
      agreement_variables: z.lazy(() => SortOrderSchema).optional(),
      data_questions: z.lazy(() => SortOrderSchema).optional(),
      data_clauses: z.lazy(() => SortOrderSchema).optional(),
      data_clause_answers: z.lazy(() => SortOrderSchema).optional(),
      data_clause_calculations: z.lazy(() => SortOrderSchema).optional(),
      data_contract_edits: z.lazy(() => SortOrderSchema).optional(),
      completedClauses: z.lazy(() => SortOrderSchema).optional(),
      text: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      completed: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => SavedAgreementsCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => SavedAgreementsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => SavedAgreementsMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const SavedAgreementsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SavedAgreementsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SavedAgreementsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => SavedAgreementsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SavedAgreementsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SavedAgreementsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => SavedAgreementsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      user_defined_name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      agreement: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      user_id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      agreement_variables: z
        .lazy(() => JsonWithAggregatesFilterSchema)
        .optional(),
      data_questions: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      data_clauses: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      data_clause_answers: z
        .lazy(() => JsonWithAggregatesFilterSchema)
        .optional(),
      data_clause_calculations: z
        .lazy(() => JsonWithAggregatesFilterSchema)
        .optional(),
      data_contract_edits: z
        .lazy(() => JsonWithAggregatesFilterSchema)
        .optional(),
      completedClauses: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      text: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      completed: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      archived: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
    })
    .strict();

export const UserMetaWhereInputSchema: z.ZodType<Prisma.UserMetaWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserMetaWhereInputSchema),
        z.lazy(() => UserMetaWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserMetaWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserMetaWhereInputSchema),
        z.lazy(() => UserMetaWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    key: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict();

export const UserMetaOrderByWithRelationInputSchema: z.ZodType<Prisma.UserMetaOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMetaWhereUniqueInputSchema: z.ZodType<Prisma.UserMetaWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        userId_key: z.lazy(() => UserMetaUserIdKeyCompoundUniqueInputSchema),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        userId_key: z.lazy(() => UserMetaUserIdKeyCompoundUniqueInputSchema),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          userId_key: z
            .lazy(() => UserMetaUserIdKeyCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => UserMetaWhereInputSchema),
              z.lazy(() => UserMetaWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserMetaWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserMetaWhereInputSchema),
              z.lazy(() => UserMetaWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          key: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          value: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        })
        .strict(),
    );

export const UserMetaOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserMetaOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UserMetaCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMetaMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMetaMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserMetaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserMetaScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserMetaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserMetaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserMetaScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserMetaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserMetaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      value: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const BusinessProfileWhereInputSchema: z.ZodType<Prisma.BusinessProfileWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => BusinessProfileWhereInputSchema),
          z.lazy(() => BusinessProfileWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => BusinessProfileWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => BusinessProfileWhereInputSchema),
          z.lazy(() => BusinessProfileWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      businessName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      ownerName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      signerName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      contactEmail: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      addressOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      addressTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      city: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      state: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      zip: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      website: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      choiceOfLaw: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      choiceOfForum: z
        .union([
          z.lazy(() => EnumBusinessForumFilterSchema),
          z.lazy(() => BusinessForumSchema),
        ])
        .optional(),
      disputeLocation: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      enableFee: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillBusinessName: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillOwnerName: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillSignerName: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillContactEmail: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillAddress: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillWebsite: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillChoiceOfLaw: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillChoiceOfForum: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillDisputeLocation: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      prefillEnableFee: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      disclaimersIncluded: z.lazy(() => JsonFilterSchema).optional(),
      disclaimerLegal: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      disclaimerMedical: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      disclaimerFitness: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      disclaimerFinancial: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      disclaimerTax: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const BusinessProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.BusinessProfileOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      businessName: z.lazy(() => SortOrderSchema).optional(),
      ownerName: z.lazy(() => SortOrderSchema).optional(),
      signerName: z.lazy(() => SortOrderSchema).optional(),
      contactEmail: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      addressOne: z.lazy(() => SortOrderSchema).optional(),
      addressTwo: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      zip: z.lazy(() => SortOrderSchema).optional(),
      website: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      choiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      choiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      disputeLocation: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      enableFee: z.lazy(() => SortOrderSchema).optional(),
      prefillBusinessName: z.lazy(() => SortOrderSchema).optional(),
      prefillOwnerName: z.lazy(() => SortOrderSchema).optional(),
      prefillSignerName: z.lazy(() => SortOrderSchema).optional(),
      prefillContactEmail: z.lazy(() => SortOrderSchema).optional(),
      prefillAddress: z.lazy(() => SortOrderSchema).optional(),
      prefillWebsite: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      prefillDisputeLocation: z.lazy(() => SortOrderSchema).optional(),
      prefillEnableFee: z.lazy(() => SortOrderSchema).optional(),
      disclaimersIncluded: z.lazy(() => SortOrderSchema).optional(),
      disclaimerLegal: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      disclaimerMedical: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      disclaimerFitness: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      disclaimerFinancial: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      disclaimerTax: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BusinessProfileWhereUniqueInputSchema: z.ZodType<Prisma.BusinessProfileWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => BusinessProfileWhereInputSchema),
              z.lazy(() => BusinessProfileWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => BusinessProfileWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => BusinessProfileWhereInputSchema),
              z.lazy(() => BusinessProfileWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          businessName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          ownerName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          signerName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          contactEmail: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          addressOne: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          addressTwo: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          city: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          state: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          zip: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          website: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          choiceOfLaw: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          choiceOfForum: z
            .union([
              z.lazy(() => EnumBusinessForumFilterSchema),
              z.lazy(() => BusinessForumSchema),
            ])
            .optional(),
          disputeLocation: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          enableFee: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillBusinessName: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillOwnerName: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillSignerName: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillContactEmail: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillAddress: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillWebsite: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillChoiceOfLaw: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillChoiceOfForum: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillDisputeLocation: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          prefillEnableFee: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          disclaimersIncluded: z.lazy(() => JsonFilterSchema).optional(),
          disclaimerLegal: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          disclaimerMedical: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          disclaimerFitness: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          disclaimerFinancial: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          disclaimerTax: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const BusinessProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.BusinessProfileOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      businessName: z.lazy(() => SortOrderSchema).optional(),
      ownerName: z.lazy(() => SortOrderSchema).optional(),
      signerName: z.lazy(() => SortOrderSchema).optional(),
      contactEmail: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      addressOne: z.lazy(() => SortOrderSchema).optional(),
      addressTwo: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      zip: z.lazy(() => SortOrderSchema).optional(),
      website: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      choiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      choiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      disputeLocation: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      enableFee: z.lazy(() => SortOrderSchema).optional(),
      prefillBusinessName: z.lazy(() => SortOrderSchema).optional(),
      prefillOwnerName: z.lazy(() => SortOrderSchema).optional(),
      prefillSignerName: z.lazy(() => SortOrderSchema).optional(),
      prefillContactEmail: z.lazy(() => SortOrderSchema).optional(),
      prefillAddress: z.lazy(() => SortOrderSchema).optional(),
      prefillWebsite: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      prefillDisputeLocation: z.lazy(() => SortOrderSchema).optional(),
      prefillEnableFee: z.lazy(() => SortOrderSchema).optional(),
      disclaimersIncluded: z.lazy(() => SortOrderSchema).optional(),
      disclaimerLegal: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      disclaimerMedical: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      disclaimerFitness: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      disclaimerFinancial: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      disclaimerTax: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => BusinessProfileCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => BusinessProfileMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => BusinessProfileMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const BusinessProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BusinessProfileScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => BusinessProfileScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => BusinessProfileScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => BusinessProfileScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => BusinessProfileScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => BusinessProfileScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      businessName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      ownerName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      signerName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      contactEmail: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      addressOne: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      addressTwo: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      city: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      state: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      zip: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      website: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      choiceOfLaw: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      choiceOfForum: z
        .union([
          z.lazy(() => EnumBusinessForumWithAggregatesFilterSchema),
          z.lazy(() => BusinessForumSchema),
        ])
        .optional(),
      disputeLocation: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      enableFee: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillBusinessName: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillOwnerName: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillSignerName: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillContactEmail: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillAddress: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillWebsite: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillChoiceOfLaw: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillChoiceOfForum: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillDisputeLocation: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      prefillEnableFee: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      disclaimersIncluded: z
        .lazy(() => JsonWithAggregatesFilterSchema)
        .optional(),
      disclaimerLegal: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      disclaimerMedical: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      disclaimerFitness: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      disclaimerFinancial: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      disclaimerTax: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProductWhereInputSchema),
        z.lazy(() => ProductWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProductWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProductWhereInputSchema),
        z.lazy(() => ProductWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    productId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    priceId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    active: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    price: z.lazy(() => PricesListRelationFilterSchema).optional(),
  })
  .strict();

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
      price: z.lazy(() => PricesOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        productId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        productId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          productId: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => ProductWhereInputSchema),
              z.lazy(() => ProductWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ProductWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ProductWhereInputSchema),
              z.lazy(() => ProductWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          priceId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          active: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          price: z.lazy(() => PricesListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ProductScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      productId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      priceId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      active: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
    })
    .strict();

export const PricesWhereInputSchema: z.ZodType<Prisma.PricesWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PricesWhereInputSchema),
        z.lazy(() => PricesWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PricesWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PricesWhereInputSchema),
        z.lazy(() => PricesWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    priceId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    active: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    currency: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    productId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    unitAmount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    interval: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  })
  .strict();

export const PricesOrderByWithRelationInputSchema: z.ZodType<Prisma.PricesOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      unitAmount: z.lazy(() => SortOrderSchema).optional(),
      interval: z.lazy(() => SortOrderSchema).optional(),
      products: z
        .lazy(() => ProductOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const PricesWhereUniqueInputSchema: z.ZodType<Prisma.PricesWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        priceId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        priceId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          priceId: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => PricesWhereInputSchema),
              z.lazy(() => PricesWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PricesWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => PricesWhereInputSchema),
              z.lazy(() => PricesWhereInputSchema).array(),
            ])
            .optional(),
          active: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          currency: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          productId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          unitAmount: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          interval: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          products: z.lazy(() => ProductListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const PricesOrderByWithAggregationInputSchema: z.ZodType<Prisma.PricesOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      unitAmount: z.lazy(() => SortOrderSchema).optional(),
      interval: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => PricesCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => PricesAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PricesMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PricesMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => PricesSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const PricesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PricesScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PricesScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PricesScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PricesScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PricesScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PricesScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      priceId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      active: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      currency: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      productId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      unitAmount: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      interval: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SubscriptionWhereInputSchema: z.ZodType<Prisma.SubscriptionWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SubscriptionWhereInputSchema),
          z.lazy(() => SubscriptionWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubscriptionWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubscriptionWhereInputSchema),
          z.lazy(() => SubscriptionWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      subscriptionId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      metaData: z.lazy(() => JsonFilterSchema).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      status: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      price: z.lazy(() => JsonFilterSchema).optional(),
      quantity: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      cancelAtPeriodEnd: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      cancelAt: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      canceledAt: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      currentPeriodStart: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      currentPeriodEnd: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      created: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      endedAt: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      trialStart: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      trialEnd: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const SubscriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      subscriptionId: z.lazy(() => SortOrderSchema).optional(),
      metaData: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      price: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
      cancelAtPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      cancelAt: z.lazy(() => SortOrderSchema).optional(),
      canceledAt: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodStart: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      created: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
      trialStart: z.lazy(() => SortOrderSchema).optional(),
      trialEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.SubscriptionWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => SubscriptionWhereInputSchema),
              z.lazy(() => SubscriptionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SubscriptionWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SubscriptionWhereInputSchema),
              z.lazy(() => SubscriptionWhereInputSchema).array(),
            ])
            .optional(),
          subscriptionId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          metaData: z.lazy(() => JsonFilterSchema).optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          status: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          price: z.lazy(() => JsonFilterSchema).optional(),
          quantity: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          cancelAtPeriodEnd: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          cancelAt: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          canceledAt: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          currentPeriodStart: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          currentPeriodEnd: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          created: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          endedAt: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          trialStart: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          trialEnd: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        })
        .strict(),
    );

export const SubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      subscriptionId: z.lazy(() => SortOrderSchema).optional(),
      metaData: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      price: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
      cancelAtPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      cancelAt: z.lazy(() => SortOrderSchema).optional(),
      canceledAt: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodStart: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      created: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
      trialStart: z.lazy(() => SortOrderSchema).optional(),
      trialEnd: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => SubscriptionCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => SubscriptionAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SubscriptionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SubscriptionMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => SubscriptionSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscriptionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      subscriptionId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      metaData: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      status: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      price: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      quantity: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      cancelAtPeriodEnd: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      cancelAt: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      canceledAt: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      currentPeriodStart: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      currentPeriodEnd: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      created: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      endedAt: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      trialStart: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      trialEnd: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const CustomerWhereInputSchema: z.ZodType<Prisma.CustomerWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CustomerWhereInputSchema),
        z.lazy(() => CustomerWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CustomerWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CustomerWhereInputSchema),
        z.lazy(() => CustomerWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    uuId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    stripeCustomerId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
  })
  .strict();

export const CustomerOrderByWithRelationInputSchema: z.ZodType<Prisma.CustomerOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uuId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CustomerWhereUniqueInputSchema: z.ZodType<Prisma.CustomerWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => CustomerWhereInputSchema),
              z.lazy(() => CustomerWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => CustomerWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => CustomerWhereInputSchema),
              z.lazy(() => CustomerWhereInputSchema).array(),
            ])
            .optional(),
          uuId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          email: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          stripeCustomerId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        })
        .strict(),
    );

export const CustomerOrderByWithAggregationInputSchema: z.ZodType<Prisma.CustomerOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uuId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => CustomerCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => CustomerMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => CustomerMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const CustomerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CustomerScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => CustomerScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CustomerScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      uuId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      email: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      stripeCustomerId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const OptionsWhereInputSchema: z.ZodType<Prisma.OptionsWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => OptionsWhereInputSchema),
        z.lazy(() => OptionsWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => OptionsWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => OptionsWhereInputSchema),
        z.lazy(() => OptionsWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    key: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict();

export const OptionsOrderByWithRelationInputSchema: z.ZodType<Prisma.OptionsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const OptionsWhereUniqueInputSchema: z.ZodType<Prisma.OptionsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => OptionsWhereInputSchema),
              z.lazy(() => OptionsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => OptionsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => OptionsWhereInputSchema),
              z.lazy(() => OptionsWhereInputSchema).array(),
            ])
            .optional(),
          value: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
        })
        .strict(),
    );

export const OptionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.OptionsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => OptionsCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => OptionsMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => OptionsMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const OptionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OptionsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => OptionsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => OptionsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => OptionsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => OptionsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => OptionsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      value: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const TermsOfServiceWhereInputSchema: z.ZodType<Prisma.TermsOfServiceWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TermsOfServiceWhereInputSchema),
          z.lazy(() => TermsOfServiceWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TermsOfServiceWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TermsOfServiceWhereInputSchema),
          z.lazy(() => TermsOfServiceWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      version: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userTermsOfServiceAcceptance: z
        .lazy(() => UserTermsOfServiceAcceptanceListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const TermsOfServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.TermsOfServiceOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      userTermsOfServiceAcceptance: z
        .lazy(
          () => UserTermsOfServiceAcceptanceOrderByRelationAggregateInputSchema,
        )
        .optional(),
    })
    .strict();

export const TermsOfServiceWhereUniqueInputSchema: z.ZodType<Prisma.TermsOfServiceWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        version: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        version: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          version: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => TermsOfServiceWhereInputSchema),
              z.lazy(() => TermsOfServiceWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TermsOfServiceWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TermsOfServiceWhereInputSchema),
              z.lazy(() => TermsOfServiceWhereInputSchema).array(),
            ])
            .optional(),
          text: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          userTermsOfServiceAcceptance: z
            .lazy(() => UserTermsOfServiceAcceptanceListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const TermsOfServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.TermsOfServiceOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => TermsOfServiceCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => TermsOfServiceAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => TermsOfServiceMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => TermsOfServiceMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => TermsOfServiceSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const TermsOfServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TermsOfServiceScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TermsOfServiceScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => TermsOfServiceScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TermsOfServiceScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TermsOfServiceScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => TermsOfServiceScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      version: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      text: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceWhereInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema),
          z.lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema),
          z.lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      termsOfService: z
        .lazy(() => TermsOfServiceListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      termsOfService: z
        .lazy(() => TermsOfServiceOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceWhereUniqueInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema),
              z
                .lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema)
                .array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema),
              z
                .lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema)
                .array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          termsOfService: z
            .lazy(() => TermsOfServiceListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const UserTermsOfServiceAcceptanceOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(
          () => UserTermsOfServiceAcceptanceCountOrderByAggregateInputSchema,
        )
        .optional(),
      _max: z
        .lazy(() => UserTermsOfServiceAcceptanceMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => UserTermsOfServiceAcceptanceMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(
          () =>
            UserTermsOfServiceAcceptanceScalarWhereWithAggregatesInputSchema,
        )
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsWhereInputSchema: z.ZodType<Prisma.AuditQuestionsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionsWhereInputSchema),
          z.lazy(() => AuditQuestionsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionsWhereInputSchema),
          z.lazy(() => AuditQuestionsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      group: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      variable: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      help: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      answerType: z
        .union([
          z.lazy(() => EnumauditAnswerFormatFilterSchema),
          z.lazy(() => auditAnswerFormatSchema),
        ])
        .optional(),
      answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
      conditionals: z
        .lazy(() => AuditQuestionConditionalsListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionsOrderByWithRelationInputSchema: z.ZodType<Prisma.AuditQuestionsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      conditionals: z
        .lazy(
          () => AuditQuestionConditionalsOrderByRelationAggregateInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionsWhereUniqueInputSchema: z.ZodType<Prisma.AuditQuestionsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => AuditQuestionsWhereInputSchema),
              z.lazy(() => AuditQuestionsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AuditQuestionsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AuditQuestionsWhereInputSchema),
              z.lazy(() => AuditQuestionsWhereInputSchema).array(),
            ])
            .optional(),
          group: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          variable: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          text: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          help: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          answerType: z
            .union([
              z.lazy(() => EnumauditAnswerFormatFilterSchema),
              z.lazy(() => auditAnswerFormatSchema),
            ])
            .optional(),
          answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
          conditionals: z
            .lazy(() => AuditQuestionConditionalsListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const AuditQuestionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuditQuestionsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => AuditQuestionsCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => AuditQuestionsAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => AuditQuestionsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => AuditQuestionsMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => AuditQuestionsSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuditQuestionsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => AuditQuestionsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => AuditQuestionsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      group: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      variable: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      text: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      help: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => EnumauditAnswerFormatWithAggregatesFilterSchema),
          z.lazy(() => auditAnswerFormatSchema),
        ])
        .optional(),
      answerOptions: z
        .lazy(() => JsonNullableWithAggregatesFilterSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsWhereInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionConditionalsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      question: z.lazy(() => AuditQuestionsListRelationFilterSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsOrderByWithRelationInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
      question: z
        .lazy(() => AuditQuestionsOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsWhereUniqueInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => AuditQuestionConditionalsWhereInputSchema),
              z.lazy(() => AuditQuestionConditionalsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AuditQuestionConditionalsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AuditQuestionConditionalsWhereInputSchema),
              z.lazy(() => AuditQuestionConditionalsWhereInputSchema).array(),
            ])
            .optional(),
          operand: z
            .union([
              z.lazy(() => EnumOperandFilterSchema),
              z.lazy(() => OperandSchema),
            ])
            .optional(),
          termOne: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          termTwo: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          question: z
            .lazy(() => AuditQuestionsListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const AuditQuestionConditionalsOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => AuditQuestionConditionalsCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => AuditQuestionConditionalsAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => AuditQuestionConditionalsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => AuditQuestionConditionalsMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => AuditQuestionConditionalsSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () => AuditQuestionConditionalsScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(
          () => AuditQuestionConditionalsScalarWhereWithAggregatesInputSchema,
        )
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () => AuditQuestionConditionalsScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandWithAggregatesFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsWhereInputSchema: z.ZodType<Prisma.AuditQuestionSetsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereInputSchema),
          z.lazy(() => AuditQuestionSetsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionSetsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereInputSchema),
          z.lazy(() => AuditQuestionSetsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      setCode: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      variable: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      help: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      answerType: z
        .union([
          z.lazy(() => EnumauditAnswerFormatFilterSchema),
          z.lazy(() => auditAnswerFormatSchema),
        ])
        .optional(),
      answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
      conditionals: z
        .lazy(() => AuditQuestionSetConditionalsListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionSetsOrderByWithRelationInputSchema: z.ZodType<Prisma.AuditQuestionSetsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      setCode: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      conditionals: z
        .lazy(
          () => AuditQuestionSetConditionalsOrderByRelationAggregateInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetsWhereUniqueInputSchema: z.ZodType<Prisma.AuditQuestionSetsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => AuditQuestionSetsWhereInputSchema),
              z.lazy(() => AuditQuestionSetsWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AuditQuestionSetsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AuditQuestionSetsWhereInputSchema),
              z.lazy(() => AuditQuestionSetsWhereInputSchema).array(),
            ])
            .optional(),
          setCode: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          variable: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          text: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          help: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          answerType: z
            .union([
              z.lazy(() => EnumauditAnswerFormatFilterSchema),
              z.lazy(() => auditAnswerFormatSchema),
            ])
            .optional(),
          answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
          conditionals: z
            .lazy(() => AuditQuestionSetConditionalsListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const AuditQuestionSetsOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuditQuestionSetsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      setCode: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => AuditQuestionSetsCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => AuditQuestionSetsAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => AuditQuestionSetsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => AuditQuestionSetsMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => AuditQuestionSetsSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionSetsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuditQuestionSetsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionSetsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => AuditQuestionSetsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionSetsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionSetsScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => AuditQuestionSetsScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      setCode: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      variable: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      text: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      help: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => EnumauditAnswerFormatWithAggregatesFilterSchema),
          z.lazy(() => auditAnswerFormatSchema),
        ])
        .optional(),
      answerOptions: z
        .lazy(() => JsonNullableWithAggregatesFilterSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsWhereInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereInputSchema),
          z.lazy(() => AuditQuestionSetConditionalsWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionSetConditionalsWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereInputSchema),
          z.lazy(() => AuditQuestionSetConditionalsWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      question: z
        .lazy(() => AuditQuestionSetsListRelationFilterSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsOrderByWithRelationInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
      question: z
        .lazy(() => AuditQuestionSetsOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsWhereUniqueInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        key: z.number().int(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        key: z.number().int(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          key: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => AuditQuestionSetConditionalsWhereInputSchema),
              z
                .lazy(() => AuditQuestionSetConditionalsWhereInputSchema)
                .array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AuditQuestionSetConditionalsWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AuditQuestionSetConditionalsWhereInputSchema),
              z
                .lazy(() => AuditQuestionSetConditionalsWhereInputSchema)
                .array(),
            ])
            .optional(),
          operand: z
            .union([
              z.lazy(() => EnumOperandFilterSchema),
              z.lazy(() => OperandSchema),
            ])
            .optional(),
          termOne: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          termTwo: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          question: z
            .lazy(() => AuditQuestionSetsListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const AuditQuestionSetConditionalsOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(
          () => AuditQuestionSetConditionalsCountOrderByAggregateInputSchema,
        )
        .optional(),
      _avg: z
        .lazy(() => AuditQuestionSetConditionalsAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => AuditQuestionSetConditionalsMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => AuditQuestionSetConditionalsMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => AuditQuestionSetConditionalsSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(
          () =>
            AuditQuestionSetConditionalsScalarWhereWithAggregatesInputSchema,
        )
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsScalarWhereWithAggregatesInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsScalarWhereWithAggregatesInputSchema,
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      key: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandWithAggregatesFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ContractsCreateInputSchema: z.ZodType<Prisma.ContractsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      slug: z.string(),
      userRole: z.string().optional(),
      name: z.string(),
      description: z.string(),
      agreementTitle: z.string(),
      variables: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      tags: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contractQuestions: z
        .lazy(() => ContractQuestionsCreateNestedManyWithoutContractInputSchema)
        .optional(),
      clauses: z
        .lazy(() => ClausesCreateNestedManyWithoutContractInputSchema)
        .optional(),
    })
    .strict();

export const ContractsUncheckedCreateInputSchema: z.ZodType<Prisma.ContractsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      slug: z.string(),
      userRole: z.string().optional(),
      name: z.string(),
      description: z.string(),
      agreementTitle: z.string(),
      variables: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      tags: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contractQuestions: z
        .lazy(
          () =>
            ContractQuestionsUncheckedCreateNestedManyWithoutContractInputSchema,
        )
        .optional(),
      clauses: z
        .lazy(() => ClausesUncheckedCreateNestedManyWithoutContractInputSchema)
        .optional(),
    })
    .strict();

export const ContractsUpdateInputSchema: z.ZodType<Prisma.ContractsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contractQuestions: z
        .lazy(() => ContractQuestionsUpdateManyWithoutContractNestedInputSchema)
        .optional(),
      clauses: z
        .lazy(() => ClausesUpdateManyWithoutContractNestedInputSchema)
        .optional(),
    })
    .strict();

export const ContractsUncheckedUpdateInputSchema: z.ZodType<Prisma.ContractsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contractQuestions: z
        .lazy(
          () =>
            ContractQuestionsUncheckedUpdateManyWithoutContractNestedInputSchema,
        )
        .optional(),
      clauses: z
        .lazy(() => ClausesUncheckedUpdateManyWithoutContractNestedInputSchema)
        .optional(),
    })
    .strict();

export const ContractsCreateManyInputSchema: z.ZodType<Prisma.ContractsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      slug: z.string(),
      userRole: z.string().optional(),
      name: z.string(),
      description: z.string(),
      agreementTitle: z.string(),
      variables: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      tags: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ContractsUpdateManyMutationInputSchema: z.ZodType<Prisma.ContractsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ContractsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContractsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsCreateInputSchema: z.ZodType<Prisma.ContractQuestionsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      inputType: z.lazy(() => InputTypeSchema),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contract: z
        .lazy(
          () => ContractsCreateNestedManyWithoutContractQuestionsInputSchema,
        )
        .optional(),
      conditionals: z
        .lazy(
          () =>
            ContractQuestionConditionalsCreateNestedManyWithoutContractQuestionInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedCreateInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      inputType: z.lazy(() => InputTypeSchema),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contract: z
        .lazy(
          () =>
            ContractsUncheckedCreateNestedManyWithoutContractQuestionsInputSchema,
        )
        .optional(),
      conditionals: z
        .lazy(
          () =>
            ContractQuestionConditionalsUncheckedCreateNestedManyWithoutContractQuestionInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUpdateInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contract: z
        .lazy(
          () => ContractsUpdateManyWithoutContractQuestionsNestedInputSchema,
        )
        .optional(),
      conditionals: z
        .lazy(
          () =>
            ContractQuestionConditionalsUpdateManyWithoutContractQuestionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedUpdateInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contract: z
        .lazy(
          () =>
            ContractsUncheckedUpdateManyWithoutContractQuestionsNestedInputSchema,
        )
        .optional(),
      conditionals: z
        .lazy(
          () =>
            ContractQuestionConditionalsUncheckedUpdateManyWithoutContractQuestionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsCreateManyInputSchema: z.ZodType<Prisma.ContractQuestionsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      inputType: z.lazy(() => InputTypeSchema),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsUpdateManyMutationInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsCreateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
      contractQuestion: z
        .lazy(
          () => ContractQuestionsCreateNestedManyWithoutConditionalsInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUncheckedCreateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
      contractQuestion: z
        .lazy(
          () =>
            ContractQuestionsUncheckedCreateNestedManyWithoutConditionalsInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUpdateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestion: z
        .lazy(
          () => ContractQuestionsUpdateManyWithoutConditionalsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUncheckedUpdateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestion: z
        .lazy(
          () =>
            ContractQuestionsUncheckedUpdateManyWithoutConditionalsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsCreateManyInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const ContractQuestionConditionalsUpdateManyMutationInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ClausesCreateInputSchema: z.ZodType<Prisma.ClausesCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    key: z.number().int(),
    group: z.string(),
    plainTextName: z.string(),
    version: z.string(),
    text: z.string(),
    help: z.string().optional().nullable(),
    deleteWarning: z.string(),
    formatting: z.string(),
    contract: z
      .lazy(() => ContractsCreateNestedManyWithoutClausesInputSchema)
      .optional(),
    questions: z
      .lazy(() => ClauseQuestionsCreateNestedManyWithoutClauseInputSchema)
      .optional(),
    clauseConditionals: z
      .lazy(() => ClauseConditionalsCreateNestedManyWithoutClauseInputSchema)
      .optional(),
  })
  .strict();

export const ClausesUncheckedCreateInputSchema: z.ZodType<Prisma.ClausesUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      plainTextName: z.string(),
      version: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      deleteWarning: z.string(),
      formatting: z.string(),
      contract: z
        .lazy(() => ContractsUncheckedCreateNestedManyWithoutClausesInputSchema)
        .optional(),
      questions: z
        .lazy(
          () =>
            ClauseQuestionsUncheckedCreateNestedManyWithoutClauseInputSchema,
        )
        .optional(),
      clauseConditionals: z
        .lazy(
          () =>
            ClauseConditionalsUncheckedCreateNestedManyWithoutClauseInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClausesUpdateInputSchema: z.ZodType<Prisma.ClausesUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    key: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    group: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    plainTextName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    version: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    text: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    help: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    deleteWarning: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    formatting: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    contract: z
      .lazy(() => ContractsUpdateManyWithoutClausesNestedInputSchema)
      .optional(),
    questions: z
      .lazy(() => ClauseQuestionsUpdateManyWithoutClauseNestedInputSchema)
      .optional(),
    clauseConditionals: z
      .lazy(() => ClauseConditionalsUpdateManyWithoutClauseNestedInputSchema)
      .optional(),
  })
  .strict();

export const ClausesUncheckedUpdateInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contract: z
        .lazy(() => ContractsUncheckedUpdateManyWithoutClausesNestedInputSchema)
        .optional(),
      questions: z
        .lazy(
          () =>
            ClauseQuestionsUncheckedUpdateManyWithoutClauseNestedInputSchema,
        )
        .optional(),
      clauseConditionals: z
        .lazy(
          () =>
            ClauseConditionalsUncheckedUpdateManyWithoutClauseNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClausesCreateManyInputSchema: z.ZodType<Prisma.ClausesCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      plainTextName: z.string(),
      version: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      deleteWarning: z.string(),
      formatting: z.string(),
    })
    .strict();

export const ClausesUpdateManyMutationInputSchema: z.ZodType<Prisma.ClausesUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsCreateInputSchema: z.ZodType<Prisma.ClauseQuestionsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      questionType: z.string(),
      variable: z.string(),
      prompt: z.string(),
      help: z.string(),
      answerFormat: z.lazy(() => answerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z.string().optional().nullable(),
      clause: z
        .lazy(() => ClausesCreateNestedManyWithoutQuestionsInputSchema)
        .optional(),
    })
    .strict();

export const ClauseQuestionsUncheckedCreateInputSchema: z.ZodType<Prisma.ClauseQuestionsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      questionType: z.string(),
      variable: z.string(),
      prompt: z.string(),
      help: z.string(),
      answerFormat: z.lazy(() => answerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z.string().optional().nullable(),
      clause: z
        .lazy(() => ClausesUncheckedCreateNestedManyWithoutQuestionsInputSchema)
        .optional(),
    })
    .strict();

export const ClauseQuestionsUpdateInputSchema: z.ZodType<Prisma.ClauseQuestionsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questionType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerFormat: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => EnumanswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      clause: z
        .lazy(() => ClausesUpdateManyWithoutQuestionsNestedInputSchema)
        .optional(),
    })
    .strict();

export const ClauseQuestionsUncheckedUpdateInputSchema: z.ZodType<Prisma.ClauseQuestionsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questionType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerFormat: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => EnumanswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      clause: z
        .lazy(() => ClausesUncheckedUpdateManyWithoutQuestionsNestedInputSchema)
        .optional(),
    })
    .strict();

export const ClauseQuestionsCreateManyInputSchema: z.ZodType<Prisma.ClauseQuestionsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      questionType: z.string(),
      variable: z.string(),
      prompt: z.string(),
      help: z.string(),
      answerFormat: z.lazy(() => answerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z.string().optional().nullable(),
    })
    .strict();

export const ClauseQuestionsUpdateManyMutationInputSchema: z.ZodType<Prisma.ClauseQuestionsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questionType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerFormat: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => EnumanswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ClauseQuestionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClauseQuestionsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questionType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerFormat: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => EnumanswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ClauseConditionalsCreateInputSchema: z.ZodType<Prisma.ClauseConditionalsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
      clause: z
        .lazy(() => ClausesCreateNestedManyWithoutClauseConditionalsInputSchema)
        .optional(),
    })
    .strict();

export const ClauseConditionalsUncheckedCreateInputSchema: z.ZodType<Prisma.ClauseConditionalsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
      clause: z
        .lazy(
          () =>
            ClausesUncheckedCreateNestedManyWithoutClauseConditionalsInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClauseConditionalsUpdateInputSchema: z.ZodType<Prisma.ClauseConditionalsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clause: z
        .lazy(() => ClausesUpdateManyWithoutClauseConditionalsNestedInputSchema)
        .optional(),
    })
    .strict();

export const ClauseConditionalsUncheckedUpdateInputSchema: z.ZodType<Prisma.ClauseConditionalsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      clause: z
        .lazy(
          () =>
            ClausesUncheckedUpdateManyWithoutClauseConditionalsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClauseConditionalsCreateManyInputSchema: z.ZodType<Prisma.ClauseConditionalsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const ClauseConditionalsUpdateManyMutationInputSchema: z.ZodType<Prisma.ClauseConditionalsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClauseConditionalsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SavedAgreementsCreateInputSchema: z.ZodType<Prisma.SavedAgreementsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      user_defined_name: z.string(),
      agreement: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user_id: z.string(),
      agreement_variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_questions: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_answers: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_calculations: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_contract_edits: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      completedClauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      text: z.string().optional().nullable(),
      completed: z.boolean().optional(),
      archived: z.boolean().optional(),
    })
    .strict();

export const SavedAgreementsUncheckedCreateInputSchema: z.ZodType<Prisma.SavedAgreementsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      user_defined_name: z.string(),
      agreement: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user_id: z.string(),
      agreement_variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_questions: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_answers: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_calculations: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_contract_edits: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      completedClauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      text: z.string().optional().nullable(),
      completed: z.boolean().optional(),
      archived: z.boolean().optional(),
    })
    .strict();

export const SavedAgreementsUpdateInputSchema: z.ZodType<Prisma.SavedAgreementsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_defined_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreement: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreement_variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_questions: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_answers: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_calculations: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_contract_edits: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      completedClauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      completed: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SavedAgreementsUncheckedUpdateInputSchema: z.ZodType<Prisma.SavedAgreementsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_defined_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreement: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreement_variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_questions: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_answers: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_calculations: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_contract_edits: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      completedClauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      completed: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SavedAgreementsCreateManyInputSchema: z.ZodType<Prisma.SavedAgreementsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      user_defined_name: z.string(),
      agreement: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user_id: z.string(),
      agreement_variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_questions: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_answers: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_calculations: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_contract_edits: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      completedClauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      text: z.string().optional().nullable(),
      completed: z.boolean().optional(),
      archived: z.boolean().optional(),
    })
    .strict();

export const SavedAgreementsUpdateManyMutationInputSchema: z.ZodType<Prisma.SavedAgreementsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_defined_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreement: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreement_variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_questions: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_answers: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_calculations: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_contract_edits: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      completedClauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      completed: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SavedAgreementsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SavedAgreementsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_defined_name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreement: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user_id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreement_variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_questions: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_answers: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_clause_calculations: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      data_contract_edits: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      completedClauses: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      completed: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archived: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserMetaCreateInputSchema: z.ZodType<Prisma.UserMetaCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      key: z.string(),
      value: z.string(),
    })
    .strict();

export const UserMetaUncheckedCreateInputSchema: z.ZodType<Prisma.UserMetaUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      key: z.string(),
      value: z.string(),
    })
    .strict();

export const UserMetaUpdateInputSchema: z.ZodType<Prisma.UserMetaUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserMetaUncheckedUpdateInputSchema: z.ZodType<Prisma.UserMetaUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserMetaCreateManyInputSchema: z.ZodType<Prisma.UserMetaCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      key: z.string(),
      value: z.string(),
    })
    .strict();

export const UserMetaUpdateManyMutationInputSchema: z.ZodType<Prisma.UserMetaUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserMetaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserMetaUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BusinessProfileCreateInputSchema: z.ZodType<Prisma.BusinessProfileCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      businessName: z.string(),
      ownerName: z.string(),
      signerName: z.string(),
      contactEmail: z.string().optional().nullable(),
      addressOne: z.string(),
      addressTwo: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      website: z.string().optional().nullable(),
      choiceOfLaw: z.string(),
      choiceOfForum: z.lazy(() => BusinessForumSchema),
      disputeLocation: z.string().optional().nullable(),
      enableFee: z.boolean(),
      prefillBusinessName: z.boolean().optional(),
      prefillOwnerName: z.boolean().optional(),
      prefillSignerName: z.boolean().optional(),
      prefillContactEmail: z.boolean().optional(),
      prefillAddress: z.boolean().optional(),
      prefillWebsite: z.boolean().optional(),
      prefillChoiceOfLaw: z.boolean().optional(),
      prefillChoiceOfForum: z.boolean().optional(),
      prefillDisputeLocation: z.boolean().optional(),
      prefillEnableFee: z.boolean().optional(),
      disclaimersIncluded: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      disclaimerLegal: z.string().optional().nullable(),
      disclaimerMedical: z.string().optional().nullable(),
      disclaimerFitness: z.string().optional().nullable(),
      disclaimerFinancial: z.string().optional().nullable(),
      disclaimerTax: z.string().optional().nullable(),
    })
    .strict();

export const BusinessProfileUncheckedCreateInputSchema: z.ZodType<Prisma.BusinessProfileUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      businessName: z.string(),
      ownerName: z.string(),
      signerName: z.string(),
      contactEmail: z.string().optional().nullable(),
      addressOne: z.string(),
      addressTwo: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      website: z.string().optional().nullable(),
      choiceOfLaw: z.string(),
      choiceOfForum: z.lazy(() => BusinessForumSchema),
      disputeLocation: z.string().optional().nullable(),
      enableFee: z.boolean(),
      prefillBusinessName: z.boolean().optional(),
      prefillOwnerName: z.boolean().optional(),
      prefillSignerName: z.boolean().optional(),
      prefillContactEmail: z.boolean().optional(),
      prefillAddress: z.boolean().optional(),
      prefillWebsite: z.boolean().optional(),
      prefillChoiceOfLaw: z.boolean().optional(),
      prefillChoiceOfForum: z.boolean().optional(),
      prefillDisputeLocation: z.boolean().optional(),
      prefillEnableFee: z.boolean().optional(),
      disclaimersIncluded: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      disclaimerLegal: z.string().optional().nullable(),
      disclaimerMedical: z.string().optional().nullable(),
      disclaimerFitness: z.string().optional().nullable(),
      disclaimerFinancial: z.string().optional().nullable(),
      disclaimerTax: z.string().optional().nullable(),
    })
    .strict();

export const BusinessProfileUpdateInputSchema: z.ZodType<Prisma.BusinessProfileUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      businessName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      signerName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contactEmail: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      addressOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      addressTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      zip: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      website: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      choiceOfLaw: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      choiceOfForum: z
        .union([
          z.lazy(() => BusinessForumSchema),
          z.lazy(() => EnumBusinessForumFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      disputeLocation: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      enableFee: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillBusinessName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillOwnerName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillSignerName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillContactEmail: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillAddress: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillWebsite: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillChoiceOfLaw: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillChoiceOfForum: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillDisputeLocation: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillEnableFee: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      disclaimersIncluded: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      disclaimerLegal: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerMedical: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerFitness: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerFinancial: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerTax: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const BusinessProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.BusinessProfileUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      businessName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      signerName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contactEmail: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      addressOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      addressTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      zip: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      website: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      choiceOfLaw: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      choiceOfForum: z
        .union([
          z.lazy(() => BusinessForumSchema),
          z.lazy(() => EnumBusinessForumFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      disputeLocation: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      enableFee: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillBusinessName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillOwnerName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillSignerName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillContactEmail: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillAddress: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillWebsite: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillChoiceOfLaw: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillChoiceOfForum: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillDisputeLocation: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillEnableFee: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      disclaimersIncluded: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      disclaimerLegal: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerMedical: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerFitness: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerFinancial: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerTax: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const BusinessProfileCreateManyInputSchema: z.ZodType<Prisma.BusinessProfileCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      businessName: z.string(),
      ownerName: z.string(),
      signerName: z.string(),
      contactEmail: z.string().optional().nullable(),
      addressOne: z.string(),
      addressTwo: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      website: z.string().optional().nullable(),
      choiceOfLaw: z.string(),
      choiceOfForum: z.lazy(() => BusinessForumSchema),
      disputeLocation: z.string().optional().nullable(),
      enableFee: z.boolean(),
      prefillBusinessName: z.boolean().optional(),
      prefillOwnerName: z.boolean().optional(),
      prefillSignerName: z.boolean().optional(),
      prefillContactEmail: z.boolean().optional(),
      prefillAddress: z.boolean().optional(),
      prefillWebsite: z.boolean().optional(),
      prefillChoiceOfLaw: z.boolean().optional(),
      prefillChoiceOfForum: z.boolean().optional(),
      prefillDisputeLocation: z.boolean().optional(),
      prefillEnableFee: z.boolean().optional(),
      disclaimersIncluded: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      disclaimerLegal: z.string().optional().nullable(),
      disclaimerMedical: z.string().optional().nullable(),
      disclaimerFitness: z.string().optional().nullable(),
      disclaimerFinancial: z.string().optional().nullable(),
      disclaimerTax: z.string().optional().nullable(),
    })
    .strict();

export const BusinessProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.BusinessProfileUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      businessName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      signerName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contactEmail: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      addressOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      addressTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      zip: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      website: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      choiceOfLaw: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      choiceOfForum: z
        .union([
          z.lazy(() => BusinessForumSchema),
          z.lazy(() => EnumBusinessForumFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      disputeLocation: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      enableFee: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillBusinessName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillOwnerName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillSignerName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillContactEmail: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillAddress: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillWebsite: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillChoiceOfLaw: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillChoiceOfForum: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillDisputeLocation: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillEnableFee: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      disclaimersIncluded: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      disclaimerLegal: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerMedical: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerFitness: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerFinancial: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerTax: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const BusinessProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BusinessProfileUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      businessName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      signerName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contactEmail: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      addressOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      addressTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      city: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      state: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      zip: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      website: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      choiceOfLaw: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      choiceOfForum: z
        .union([
          z.lazy(() => BusinessForumSchema),
          z.lazy(() => EnumBusinessForumFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      disputeLocation: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      enableFee: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillBusinessName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillOwnerName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillSignerName: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillContactEmail: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillAddress: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillWebsite: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillChoiceOfLaw: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillChoiceOfForum: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillDisputeLocation: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prefillEnableFee: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      disclaimersIncluded: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      disclaimerLegal: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerMedical: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerFitness: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerFinancial: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      disclaimerTax: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    productId: z.string(),
    name: z.string(),
    description: z.string(),
    priceId: z.string(),
    active: z.boolean(),
    price: z
      .lazy(() => PricesCreateNestedManyWithoutProductsInputSchema)
      .optional(),
  })
  .strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      productId: z.string(),
      name: z.string(),
      description: z.string(),
      priceId: z.string(),
      active: z.boolean(),
      price: z
        .lazy(() => PricesUncheckedCreateNestedManyWithoutProductsInputSchema)
        .optional(),
    })
    .strict();

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    productId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    priceId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    price: z
      .lazy(() => PricesUpdateManyWithoutProductsNestedInputSchema)
      .optional(),
  })
  .strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      price: z
        .lazy(() => PricesUncheckedUpdateManyWithoutProductsNestedInputSchema)
        .optional(),
    })
    .strict();

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      productId: z.string(),
      name: z.string(),
      description: z.string(),
      priceId: z.string(),
      active: z.boolean(),
    })
    .strict();

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PricesCreateInputSchema: z.ZodType<Prisma.PricesCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    priceId: z.string(),
    active: z.boolean().optional(),
    currency: z.string(),
    productId: z.string().optional(),
    unitAmount: z.number().int(),
    interval: z.string(),
    products: z
      .lazy(() => ProductCreateNestedManyWithoutPriceInputSchema)
      .optional(),
  })
  .strict();

export const PricesUncheckedCreateInputSchema: z.ZodType<Prisma.PricesUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      priceId: z.string(),
      active: z.boolean().optional(),
      currency: z.string(),
      productId: z.string().optional(),
      unitAmount: z.number().int(),
      interval: z.string(),
      products: z
        .lazy(() => ProductUncheckedCreateNestedManyWithoutPriceInputSchema)
        .optional(),
    })
    .strict();

export const PricesUpdateInputSchema: z.ZodType<Prisma.PricesUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    priceId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    active: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    currency: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    productId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    unitAmount: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    interval: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    products: z
      .lazy(() => ProductUpdateManyWithoutPriceNestedInputSchema)
      .optional(),
  })
  .strict();

export const PricesUncheckedUpdateInputSchema: z.ZodType<Prisma.PricesUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      unitAmount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      interval: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      products: z
        .lazy(() => ProductUncheckedUpdateManyWithoutPriceNestedInputSchema)
        .optional(),
    })
    .strict();

export const PricesCreateManyInputSchema: z.ZodType<Prisma.PricesCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      priceId: z.string(),
      active: z.boolean().optional(),
      currency: z.string(),
      productId: z.string().optional(),
      unitAmount: z.number().int(),
      interval: z.string(),
    })
    .strict();

export const PricesUpdateManyMutationInputSchema: z.ZodType<Prisma.PricesUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      unitAmount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      interval: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PricesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PricesUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      unitAmount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      interval: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubscriptionCreateInputSchema: z.ZodType<Prisma.SubscriptionCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      subscriptionId: z.string(),
      metaData: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z.string(),
      status: z.string(),
      price: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      quantity: z.number().int(),
      cancelAtPeriodEnd: z.boolean(),
      cancelAt: z.string(),
      canceledAt: z.string(),
      currentPeriodStart: z.string(),
      currentPeriodEnd: z.string(),
      created: z.string(),
      endedAt: z.string(),
      trialStart: z.string(),
      trialEnd: z.string(),
    })
    .strict();

export const SubscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      subscriptionId: z.string(),
      metaData: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z.string(),
      status: z.string(),
      price: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      quantity: z.number().int(),
      cancelAtPeriodEnd: z.boolean(),
      cancelAt: z.string(),
      canceledAt: z.string(),
      currentPeriodStart: z.string(),
      currentPeriodEnd: z.string(),
      created: z.string(),
      endedAt: z.string(),
      trialStart: z.string(),
      trialEnd: z.string(),
    })
    .strict();

export const SubscriptionUpdateInputSchema: z.ZodType<Prisma.SubscriptionUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subscriptionId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      metaData: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      price: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      quantity: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cancelAtPeriodEnd: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cancelAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      canceledAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currentPeriodStart: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currentPeriodEnd: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      trialStart: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      trialEnd: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubscriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subscriptionId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      metaData: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      price: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      quantity: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cancelAtPeriodEnd: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cancelAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      canceledAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currentPeriodStart: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currentPeriodEnd: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      trialStart: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      trialEnd: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubscriptionCreateManyInputSchema: z.ZodType<Prisma.SubscriptionCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      subscriptionId: z.string(),
      metaData: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z.string(),
      status: z.string(),
      price: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      quantity: z.number().int(),
      cancelAtPeriodEnd: z.boolean(),
      cancelAt: z.string(),
      canceledAt: z.string(),
      currentPeriodStart: z.string(),
      currentPeriodEnd: z.string(),
      created: z.string(),
      endedAt: z.string(),
      trialStart: z.string(),
      trialEnd: z.string(),
    })
    .strict();

export const SubscriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subscriptionId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      metaData: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      price: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      quantity: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cancelAtPeriodEnd: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cancelAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      canceledAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currentPeriodStart: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currentPeriodEnd: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      trialStart: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      trialEnd: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubscriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subscriptionId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      metaData: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      price: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      quantity: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cancelAtPeriodEnd: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      cancelAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      canceledAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currentPeriodStart: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currentPeriodEnd: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      created: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      trialStart: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      trialEnd: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CustomerCreateInputSchema: z.ZodType<Prisma.CustomerCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      uuId: z.string(),
      email: z.string(),
      stripeCustomerId: z.string(),
    })
    .strict();

export const CustomerUncheckedCreateInputSchema: z.ZodType<Prisma.CustomerUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      uuId: z.string(),
      email: z.string(),
      stripeCustomerId: z.string(),
    })
    .strict();

export const CustomerUpdateInputSchema: z.ZodType<Prisma.CustomerUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CustomerUncheckedUpdateInputSchema: z.ZodType<Prisma.CustomerUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CustomerCreateManyInputSchema: z.ZodType<Prisma.CustomerCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      uuId: z.string(),
      email: z.string(),
      stripeCustomerId: z.string(),
    })
    .strict();

export const CustomerUpdateManyMutationInputSchema: z.ZodType<Prisma.CustomerUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const CustomerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CustomerUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OptionsCreateInputSchema: z.ZodType<Prisma.OptionsCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    key: z.string(),
    value: z.string(),
  })
  .strict();

export const OptionsUncheckedCreateInputSchema: z.ZodType<Prisma.OptionsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.string(),
      value: z.string(),
    })
    .strict();

export const OptionsUpdateInputSchema: z.ZodType<Prisma.OptionsUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    key: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })
  .strict();

export const OptionsUncheckedUpdateInputSchema: z.ZodType<Prisma.OptionsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OptionsCreateManyInputSchema: z.ZodType<Prisma.OptionsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.string(),
      value: z.string(),
    })
    .strict();

export const OptionsUpdateManyMutationInputSchema: z.ZodType<Prisma.OptionsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const OptionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OptionsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      value: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceCreateInputSchema: z.ZodType<Prisma.TermsOfServiceCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      version: z.number().int(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      userTermsOfServiceAcceptance: z
        .lazy(
          () =>
            UserTermsOfServiceAcceptanceCreateNestedManyWithoutTermsOfServiceInputSchema,
        )
        .optional(),
    })
    .strict();

export const TermsOfServiceUncheckedCreateInputSchema: z.ZodType<Prisma.TermsOfServiceUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      version: z.number().int(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
      userTermsOfServiceAcceptance: z
        .lazy(
          () =>
            UserTermsOfServiceAcceptanceUncheckedCreateNestedManyWithoutTermsOfServiceInputSchema,
        )
        .optional(),
    })
    .strict();

export const TermsOfServiceUpdateInputSchema: z.ZodType<Prisma.TermsOfServiceUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userTermsOfServiceAcceptance: z
        .lazy(
          () =>
            UserTermsOfServiceAcceptanceUpdateManyWithoutTermsOfServiceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TermsOfServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.TermsOfServiceUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userTermsOfServiceAcceptance: z
        .lazy(
          () =>
            UserTermsOfServiceAcceptanceUncheckedUpdateManyWithoutTermsOfServiceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TermsOfServiceCreateManyInputSchema: z.ZodType<Prisma.TermsOfServiceCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      version: z.number().int(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const TermsOfServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.TermsOfServiceUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TermsOfServiceUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCreateInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      createdAt: z.coerce.date().optional(),
      termsOfService: z
        .lazy(
          () =>
            TermsOfServiceCreateNestedManyWithoutUserTermsOfServiceAcceptanceInputSchema,
        )
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUncheckedCreateInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      createdAt: z.coerce.date().optional(),
      termsOfService: z
        .lazy(
          () =>
            TermsOfServiceUncheckedCreateNestedManyWithoutUserTermsOfServiceAcceptanceInputSchema,
        )
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpdateInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termsOfService: z
        .lazy(
          () =>
            TermsOfServiceUpdateManyWithoutUserTermsOfServiceAcceptanceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUncheckedUpdateInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termsOfService: z
        .lazy(
          () =>
            TermsOfServiceUncheckedUpdateManyWithoutUserTermsOfServiceAcceptanceNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCreateManyInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpdateManyMutationInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsCreateInputSchema: z.ZodType<Prisma.AuditQuestionsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            AuditQuestionConditionalsCreateNestedManyWithoutQuestionInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionsUncheckedCreateInputSchema: z.ZodType<Prisma.AuditQuestionsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            AuditQuestionConditionalsUncheckedCreateNestedManyWithoutQuestionInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionsUpdateInputSchema: z.ZodType<Prisma.AuditQuestionsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            AuditQuestionConditionalsUpdateManyWithoutQuestionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionsUncheckedUpdateInputSchema: z.ZodType<Prisma.AuditQuestionsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            AuditQuestionConditionalsUncheckedUpdateManyWithoutQuestionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionsCreateManyInputSchema: z.ZodType<Prisma.AuditQuestionsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUpdateManyMutationInputSchema: z.ZodType<Prisma.AuditQuestionsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuditQuestionsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsCreateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
      question: z
        .lazy(
          () => AuditQuestionsCreateNestedManyWithoutConditionalsInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUncheckedCreateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
      question: z
        .lazy(
          () =>
            AuditQuestionsUncheckedCreateNestedManyWithoutConditionalsInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUpdateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      question: z
        .lazy(
          () => AuditQuestionsUpdateManyWithoutConditionalsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUncheckedUpdateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      question: z
        .lazy(
          () =>
            AuditQuestionsUncheckedUpdateManyWithoutConditionalsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsCreateManyInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const AuditQuestionConditionalsUpdateManyMutationInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsCreateInputSchema: z.ZodType<Prisma.AuditQuestionSetsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      setCode: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            AuditQuestionSetConditionalsCreateNestedManyWithoutQuestionInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUncheckedCreateInputSchema: z.ZodType<Prisma.AuditQuestionSetsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      setCode: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            AuditQuestionSetConditionalsUncheckedCreateNestedManyWithoutQuestionInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUpdateInputSchema: z.ZodType<Prisma.AuditQuestionSetsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      setCode: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            AuditQuestionSetConditionalsUpdateManyWithoutQuestionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUncheckedUpdateInputSchema: z.ZodType<Prisma.AuditQuestionSetsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      setCode: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            AuditQuestionSetConditionalsUncheckedUpdateManyWithoutQuestionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetsCreateManyInputSchema: z.ZodType<Prisma.AuditQuestionSetsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      setCode: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUpdateManyMutationInputSchema: z.ZodType<Prisma.AuditQuestionSetsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      setCode: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuditQuestionSetsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      setCode: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsCreateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
      question: z
        .lazy(
          () => AuditQuestionSetsCreateNestedManyWithoutConditionalsInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUncheckedCreateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
      question: z
        .lazy(
          () =>
            AuditQuestionSetsUncheckedCreateNestedManyWithoutConditionalsInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUpdateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      question: z
        .lazy(
          () => AuditQuestionSetsUpdateManyWithoutConditionalsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUncheckedUpdateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      question: z
        .lazy(
          () =>
            AuditQuestionSetsUncheckedUpdateManyWithoutConditionalsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsCreateManyInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const AuditQuestionSetConditionalsUpdateManyMutationInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z
  .object({
    equals: InputJsonValueSchema.optional(),
    path: z.string().optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_contains: InputJsonValueSchema.optional().nullable(),
    array_starts_with: InputJsonValueSchema.optional().nullable(),
    array_ends_with: InputJsonValueSchema.optional().nullable(),
    lt: InputJsonValueSchema.optional(),
    lte: InputJsonValueSchema.optional(),
    gt: InputJsonValueSchema.optional(),
    gte: InputJsonValueSchema.optional(),
    not: InputJsonValueSchema.optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z
  .object({
    equals: InputJsonValueSchema.optional(),
    path: z.string().optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_contains: InputJsonValueSchema.optional().nullable(),
    array_starts_with: InputJsonValueSchema.optional().nullable(),
    array_ends_with: InputJsonValueSchema.optional().nullable(),
    lt: InputJsonValueSchema.optional(),
    lte: InputJsonValueSchema.optional(),
    gt: InputJsonValueSchema.optional(),
    gte: InputJsonValueSchema.optional(),
    not: InputJsonValueSchema.optional(),
  })
  .strict();

export const ContractQuestionsListRelationFilterSchema: z.ZodType<Prisma.ContractQuestionsListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ContractQuestionsWhereInputSchema).optional(),
      some: z.lazy(() => ContractQuestionsWhereInputSchema).optional(),
      none: z.lazy(() => ContractQuestionsWhereInputSchema).optional(),
    })
    .strict();

export const ClausesListRelationFilterSchema: z.ZodType<Prisma.ClausesListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ClausesWhereInputSchema).optional(),
      some: z.lazy(() => ClausesWhereInputSchema).optional(),
      none: z.lazy(() => ClausesWhereInputSchema).optional(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const ContractQuestionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContractQuestionsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClausesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClausesOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContractsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
      userRole: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      agreementTitle: z.lazy(() => SortOrderSchema).optional(),
      variables: z.lazy(() => SortOrderSchema).optional(),
      tags: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      contractQuestionOrder: z.lazy(() => SortOrderSchema).optional(),
      clauseOrder: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ContractsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContractsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
      userRole: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      agreementTitle: z.lazy(() => SortOrderSchema).optional(),
      tags: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContractsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      slug: z.lazy(() => SortOrderSchema).optional(),
      userRole: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      agreementTitle: z.lazy(() => SortOrderSchema).optional(),
      tags: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContractsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> =
  z
    .object({
      equals: InputJsonValueSchema.optional(),
      path: z.string().optional(),
      string_contains: z.string().optional(),
      string_starts_with: z.string().optional(),
      string_ends_with: z.string().optional(),
      array_contains: InputJsonValueSchema.optional().nullable(),
      array_starts_with: InputJsonValueSchema.optional().nullable(),
      array_ends_with: InputJsonValueSchema.optional().nullable(),
      lt: InputJsonValueSchema.optional(),
      lte: InputJsonValueSchema.optional(),
      gt: InputJsonValueSchema.optional(),
      gte: InputJsonValueSchema.optional(),
      not: InputJsonValueSchema.optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedJsonFilterSchema).optional(),
      _max: z.lazy(() => NestedJsonFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> =
  z
    .object({
      equals: InputJsonValueSchema.optional(),
      path: z.string().optional(),
      string_contains: z.string().optional(),
      string_starts_with: z.string().optional(),
      string_ends_with: z.string().optional(),
      array_contains: InputJsonValueSchema.optional().nullable(),
      array_starts_with: InputJsonValueSchema.optional().nullable(),
      array_ends_with: InputJsonValueSchema.optional().nullable(),
      lt: InputJsonValueSchema.optional(),
      lte: InputJsonValueSchema.optional(),
      gt: InputJsonValueSchema.optional(),
      gte: InputJsonValueSchema.optional(),
      not: InputJsonValueSchema.optional(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
    })
    .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const EnumInputTypeFilterSchema: z.ZodType<Prisma.EnumInputTypeFilter> =
  z
    .object({
      equals: z.lazy(() => InputTypeSchema).optional(),
      in: z
        .lazy(() => InputTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => InputTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => NestedEnumInputTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const ContractsListRelationFilterSchema: z.ZodType<Prisma.ContractsListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ContractsWhereInputSchema).optional(),
      some: z.lazy(() => ContractsWhereInputSchema).optional(),
      none: z.lazy(() => ContractsWhereInputSchema).optional(),
    })
    .strict();

export const ContractQuestionConditionalsListRelationFilterSchema: z.ZodType<Prisma.ContractQuestionConditionalsListRelationFilter> =
  z
    .object({
      every: z
        .lazy(() => ContractQuestionConditionalsWhereInputSchema)
        .optional(),
      some: z
        .lazy(() => ContractQuestionConditionalsWhereInputSchema)
        .optional(),
      none: z
        .lazy(() => ContractQuestionConditionalsWhereInputSchema)
        .optional(),
    })
    .strict();

export const ContractsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContractsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionConditionalsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      inputType: z.lazy(() => SortOrderSchema).optional(),
      inputOptions: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      inputType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      inputType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const EnumInputTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumInputTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => InputTypeSchema).optional(),
      in: z
        .lazy(() => InputTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => InputTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => NestedEnumInputTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumInputTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumInputTypeFilterSchema).optional(),
    })
    .strict();

export const EnumOperandFilterSchema: z.ZodType<Prisma.EnumOperandFilter> = z
  .object({
    equals: z.lazy(() => OperandSchema).optional(),
    in: z
      .lazy(() => OperandSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => OperandSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => OperandSchema),
        z.lazy(() => NestedEnumOperandFilterSchema),
      ])
      .optional(),
  })
  .strict();

export const ContractQuestionConditionalsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionConditionalsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionConditionalsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionConditionalsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionConditionalsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumOperandWithAggregatesFilterSchema: z.ZodType<Prisma.EnumOperandWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => OperandSchema).optional(),
      in: z
        .lazy(() => OperandSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => OperandSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => NestedEnumOperandWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumOperandFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumOperandFilterSchema).optional(),
    })
    .strict();

export const ClauseQuestionsListRelationFilterSchema: z.ZodType<Prisma.ClauseQuestionsListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ClauseQuestionsWhereInputSchema).optional(),
      some: z.lazy(() => ClauseQuestionsWhereInputSchema).optional(),
      none: z.lazy(() => ClauseQuestionsWhereInputSchema).optional(),
    })
    .strict();

export const ClauseConditionalsListRelationFilterSchema: z.ZodType<Prisma.ClauseConditionalsListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ClauseConditionalsWhereInputSchema).optional(),
      some: z.lazy(() => ClauseConditionalsWhereInputSchema).optional(),
      none: z.lazy(() => ClauseConditionalsWhereInputSchema).optional(),
    })
    .strict();

export const ClauseQuestionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClauseQuestionsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseConditionalsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClauseConditionalsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClausesCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClausesCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      plainTextName: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      deleteWarning: z.lazy(() => SortOrderSchema).optional(),
      formatting: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClausesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ClausesAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClausesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClausesMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      plainTextName: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      deleteWarning: z.lazy(() => SortOrderSchema).optional(),
      formatting: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClausesMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClausesMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      plainTextName: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      deleteWarning: z.lazy(() => SortOrderSchema).optional(),
      formatting: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClausesSumOrderByAggregateInputSchema: z.ZodType<Prisma.ClausesSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumanswerFormatFilterSchema: z.ZodType<Prisma.EnumanswerFormatFilter> =
  z
    .object({
      equals: z.lazy(() => answerFormatSchema).optional(),
      in: z
        .lazy(() => answerFormatSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => answerFormatSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => NestedEnumanswerFormatFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseQuestionsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      questionType: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerFormat: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z.lazy(() => SortOrderSchema).optional(),
      function: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseQuestionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseQuestionsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseQuestionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseQuestionsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      questionType: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerFormat: z.lazy(() => SortOrderSchema).optional(),
      function: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseQuestionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseQuestionsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      questionType: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerFormat: z.lazy(() => SortOrderSchema).optional(),
      function: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseQuestionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseQuestionsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumanswerFormatWithAggregatesFilterSchema: z.ZodType<Prisma.EnumanswerFormatWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => answerFormatSchema).optional(),
      in: z
        .lazy(() => answerFormatSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => answerFormatSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => NestedEnumanswerFormatWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumanswerFormatFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumanswerFormatFilterSchema).optional(),
    })
    .strict();

export const ClauseConditionalsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseConditionalsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseConditionalsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseConditionalsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseConditionalsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseConditionalsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseConditionalsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseConditionalsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ClauseConditionalsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseConditionalsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const SavedAgreementsCountOrderByAggregateInputSchema: z.ZodType<Prisma.SavedAgreementsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      user_defined_name: z.lazy(() => SortOrderSchema).optional(),
      agreement: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
      agreement_variables: z.lazy(() => SortOrderSchema).optional(),
      data_questions: z.lazy(() => SortOrderSchema).optional(),
      data_clauses: z.lazy(() => SortOrderSchema).optional(),
      data_clause_answers: z.lazy(() => SortOrderSchema).optional(),
      data_clause_calculations: z.lazy(() => SortOrderSchema).optional(),
      data_contract_edits: z.lazy(() => SortOrderSchema).optional(),
      completedClauses: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      completed: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SavedAgreementsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SavedAgreementsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      user_defined_name: z.lazy(() => SortOrderSchema).optional(),
      agreement: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      completed: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SavedAgreementsMinOrderByAggregateInputSchema: z.ZodType<Prisma.SavedAgreementsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      user_defined_name: z.lazy(() => SortOrderSchema).optional(),
      agreement: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      completed: z.lazy(() => SortOrderSchema).optional(),
      archived: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const UserMetaUserIdKeyCompoundUniqueInputSchema: z.ZodType<Prisma.UserMetaUserIdKeyCompoundUniqueInput> =
  z
    .object({
      userId: z.string(),
      key: z.string(),
    })
    .strict();

export const UserMetaCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserMetaCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMetaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMetaMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMetaMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMetaMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumBusinessForumFilterSchema: z.ZodType<Prisma.EnumBusinessForumFilter> =
  z
    .object({
      equals: z.lazy(() => BusinessForumSchema).optional(),
      in: z
        .lazy(() => BusinessForumSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => BusinessForumSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => BusinessForumSchema),
          z.lazy(() => NestedEnumBusinessForumFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const BusinessProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessProfileCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      businessName: z.lazy(() => SortOrderSchema).optional(),
      ownerName: z.lazy(() => SortOrderSchema).optional(),
      signerName: z.lazy(() => SortOrderSchema).optional(),
      contactEmail: z.lazy(() => SortOrderSchema).optional(),
      addressOne: z.lazy(() => SortOrderSchema).optional(),
      addressTwo: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      zip: z.lazy(() => SortOrderSchema).optional(),
      website: z.lazy(() => SortOrderSchema).optional(),
      choiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      choiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      disputeLocation: z.lazy(() => SortOrderSchema).optional(),
      enableFee: z.lazy(() => SortOrderSchema).optional(),
      prefillBusinessName: z.lazy(() => SortOrderSchema).optional(),
      prefillOwnerName: z.lazy(() => SortOrderSchema).optional(),
      prefillSignerName: z.lazy(() => SortOrderSchema).optional(),
      prefillContactEmail: z.lazy(() => SortOrderSchema).optional(),
      prefillAddress: z.lazy(() => SortOrderSchema).optional(),
      prefillWebsite: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      prefillDisputeLocation: z.lazy(() => SortOrderSchema).optional(),
      prefillEnableFee: z.lazy(() => SortOrderSchema).optional(),
      disclaimersIncluded: z.lazy(() => SortOrderSchema).optional(),
      disclaimerLegal: z.lazy(() => SortOrderSchema).optional(),
      disclaimerMedical: z.lazy(() => SortOrderSchema).optional(),
      disclaimerFitness: z.lazy(() => SortOrderSchema).optional(),
      disclaimerFinancial: z.lazy(() => SortOrderSchema).optional(),
      disclaimerTax: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BusinessProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessProfileMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      businessName: z.lazy(() => SortOrderSchema).optional(),
      ownerName: z.lazy(() => SortOrderSchema).optional(),
      signerName: z.lazy(() => SortOrderSchema).optional(),
      contactEmail: z.lazy(() => SortOrderSchema).optional(),
      addressOne: z.lazy(() => SortOrderSchema).optional(),
      addressTwo: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      zip: z.lazy(() => SortOrderSchema).optional(),
      website: z.lazy(() => SortOrderSchema).optional(),
      choiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      choiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      disputeLocation: z.lazy(() => SortOrderSchema).optional(),
      enableFee: z.lazy(() => SortOrderSchema).optional(),
      prefillBusinessName: z.lazy(() => SortOrderSchema).optional(),
      prefillOwnerName: z.lazy(() => SortOrderSchema).optional(),
      prefillSignerName: z.lazy(() => SortOrderSchema).optional(),
      prefillContactEmail: z.lazy(() => SortOrderSchema).optional(),
      prefillAddress: z.lazy(() => SortOrderSchema).optional(),
      prefillWebsite: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      prefillDisputeLocation: z.lazy(() => SortOrderSchema).optional(),
      prefillEnableFee: z.lazy(() => SortOrderSchema).optional(),
      disclaimerLegal: z.lazy(() => SortOrderSchema).optional(),
      disclaimerMedical: z.lazy(() => SortOrderSchema).optional(),
      disclaimerFitness: z.lazy(() => SortOrderSchema).optional(),
      disclaimerFinancial: z.lazy(() => SortOrderSchema).optional(),
      disclaimerTax: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BusinessProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.BusinessProfileMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      businessName: z.lazy(() => SortOrderSchema).optional(),
      ownerName: z.lazy(() => SortOrderSchema).optional(),
      signerName: z.lazy(() => SortOrderSchema).optional(),
      contactEmail: z.lazy(() => SortOrderSchema).optional(),
      addressOne: z.lazy(() => SortOrderSchema).optional(),
      addressTwo: z.lazy(() => SortOrderSchema).optional(),
      city: z.lazy(() => SortOrderSchema).optional(),
      state: z.lazy(() => SortOrderSchema).optional(),
      zip: z.lazy(() => SortOrderSchema).optional(),
      website: z.lazy(() => SortOrderSchema).optional(),
      choiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      choiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      disputeLocation: z.lazy(() => SortOrderSchema).optional(),
      enableFee: z.lazy(() => SortOrderSchema).optional(),
      prefillBusinessName: z.lazy(() => SortOrderSchema).optional(),
      prefillOwnerName: z.lazy(() => SortOrderSchema).optional(),
      prefillSignerName: z.lazy(() => SortOrderSchema).optional(),
      prefillContactEmail: z.lazy(() => SortOrderSchema).optional(),
      prefillAddress: z.lazy(() => SortOrderSchema).optional(),
      prefillWebsite: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfLaw: z.lazy(() => SortOrderSchema).optional(),
      prefillChoiceOfForum: z.lazy(() => SortOrderSchema).optional(),
      prefillDisputeLocation: z.lazy(() => SortOrderSchema).optional(),
      prefillEnableFee: z.lazy(() => SortOrderSchema).optional(),
      disclaimerLegal: z.lazy(() => SortOrderSchema).optional(),
      disclaimerMedical: z.lazy(() => SortOrderSchema).optional(),
      disclaimerFitness: z.lazy(() => SortOrderSchema).optional(),
      disclaimerFinancial: z.lazy(() => SortOrderSchema).optional(),
      disclaimerTax: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumBusinessForumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBusinessForumWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => BusinessForumSchema).optional(),
      in: z
        .lazy(() => BusinessForumSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => BusinessForumSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => BusinessForumSchema),
          z.lazy(() => NestedEnumBusinessForumWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumBusinessForumFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumBusinessForumFilterSchema).optional(),
    })
    .strict();

export const PricesListRelationFilterSchema: z.ZodType<Prisma.PricesListRelationFilter> =
  z
    .object({
      every: z.lazy(() => PricesWhereInputSchema).optional(),
      some: z.lazy(() => PricesWhereInputSchema).optional(),
      none: z.lazy(() => PricesWhereInputSchema).optional(),
    })
    .strict();

export const PricesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PricesOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ProductWhereInputSchema).optional(),
      some: z.lazy(() => ProductWhereInputSchema).optional(),
      none: z.lazy(() => ProductWhereInputSchema).optional(),
    })
    .strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PricesCountOrderByAggregateInputSchema: z.ZodType<Prisma.PricesCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      unitAmount: z.lazy(() => SortOrderSchema).optional(),
      interval: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PricesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PricesAvgOrderByAggregateInput> =
  z
    .object({
      unitAmount: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PricesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PricesMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      unitAmount: z.lazy(() => SortOrderSchema).optional(),
      interval: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PricesMinOrderByAggregateInputSchema: z.ZodType<Prisma.PricesMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      priceId: z.lazy(() => SortOrderSchema).optional(),
      active: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      productId: z.lazy(() => SortOrderSchema).optional(),
      unitAmount: z.lazy(() => SortOrderSchema).optional(),
      interval: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PricesSumOrderByAggregateInputSchema: z.ZodType<Prisma.PricesSumOrderByAggregateInput> =
  z
    .object({
      unitAmount: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      subscriptionId: z.lazy(() => SortOrderSchema).optional(),
      metaData: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      price: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
      cancelAtPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      cancelAt: z.lazy(() => SortOrderSchema).optional(),
      canceledAt: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodStart: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      created: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
      trialStart: z.lazy(() => SortOrderSchema).optional(),
      trialEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubscriptionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionAvgOrderByAggregateInput> =
  z
    .object({
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubscriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      subscriptionId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
      cancelAtPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      cancelAt: z.lazy(() => SortOrderSchema).optional(),
      canceledAt: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodStart: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      created: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
      trialStart: z.lazy(() => SortOrderSchema).optional(),
      trialEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubscriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      subscriptionId: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      quantity: z.lazy(() => SortOrderSchema).optional(),
      cancelAtPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      cancelAt: z.lazy(() => SortOrderSchema).optional(),
      canceledAt: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodStart: z.lazy(() => SortOrderSchema).optional(),
      currentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
      created: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
      trialStart: z.lazy(() => SortOrderSchema).optional(),
      trialEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubscriptionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionSumOrderByAggregateInput> =
  z
    .object({
      quantity: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CustomerCountOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uuId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CustomerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uuId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const CustomerMinOrderByAggregateInputSchema: z.ZodType<Prisma.CustomerMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uuId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const OptionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.OptionsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const OptionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OptionsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const OptionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.OptionsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceListRelationFilterSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceListRelationFilter> =
  z
    .object({
      every: z
        .lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema)
        .optional(),
      some: z
        .lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema)
        .optional(),
      none: z
        .lazy(() => UserTermsOfServiceAcceptanceWhereInputSchema)
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TermsOfServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.TermsOfServiceCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TermsOfServiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TermsOfServiceAvgOrderByAggregateInput> =
  z
    .object({
      version: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TermsOfServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TermsOfServiceMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TermsOfServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.TermsOfServiceMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      version: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TermsOfServiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.TermsOfServiceSumOrderByAggregateInput> =
  z
    .object({
      version: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TermsOfServiceListRelationFilterSchema: z.ZodType<Prisma.TermsOfServiceListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TermsOfServiceWhereInputSchema).optional(),
      some: z.lazy(() => TermsOfServiceWhereInputSchema).optional(),
      none: z.lazy(() => TermsOfServiceWhereInputSchema).optional(),
    })
    .strict();

export const TermsOfServiceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TermsOfServiceOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumauditAnswerFormatFilterSchema: z.ZodType<Prisma.EnumauditAnswerFormatFilter> =
  z
    .object({
      equals: z.lazy(() => auditAnswerFormatSchema).optional(),
      in: z
        .lazy(() => auditAnswerFormatSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => auditAnswerFormatSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => NestedEnumauditAnswerFormatFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsListRelationFilterSchema: z.ZodType<Prisma.AuditQuestionConditionalsListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AuditQuestionConditionalsWhereInputSchema).optional(),
      some: z.lazy(() => AuditQuestionConditionalsWhereInputSchema).optional(),
      none: z.lazy(() => AuditQuestionConditionalsWhereInputSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      group: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumauditAnswerFormatWithAggregatesFilterSchema: z.ZodType<Prisma.EnumauditAnswerFormatWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => auditAnswerFormatSchema).optional(),
      in: z
        .lazy(() => auditAnswerFormatSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => auditAnswerFormatSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => NestedEnumauditAnswerFormatWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumauditAnswerFormatFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumauditAnswerFormatFilterSchema).optional(),
    })
    .strict();

export const AuditQuestionsListRelationFilterSchema: z.ZodType<Prisma.AuditQuestionsListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AuditQuestionsWhereInputSchema).optional(),
      some: z.lazy(() => AuditQuestionsWhereInputSchema).optional(),
      none: z.lazy(() => AuditQuestionsWhereInputSchema).optional(),
    })
    .strict();

export const AuditQuestionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuditQuestionsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsListRelationFilterSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsListRelationFilter> =
  z
    .object({
      every: z
        .lazy(() => AuditQuestionSetConditionalsWhereInputSchema)
        .optional(),
      some: z
        .lazy(() => AuditQuestionSetConditionalsWhereInputSchema)
        .optional(),
      none: z
        .lazy(() => AuditQuestionSetConditionalsWhereInputSchema)
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetsCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      setCode: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
      answerOptions: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      setCode: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetsMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      setCode: z.lazy(() => SortOrderSchema).optional(),
      variable: z.lazy(() => SortOrderSchema).optional(),
      text: z.lazy(() => SortOrderSchema).optional(),
      help: z.lazy(() => SortOrderSchema).optional(),
      answerType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetsSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetsListRelationFilterSchema: z.ZodType<Prisma.AuditQuestionSetsListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AuditQuestionSetsWhereInputSchema).optional(),
      some: z.lazy(() => AuditQuestionSetsWhereInputSchema).optional(),
      none: z.lazy(() => AuditQuestionSetsWhereInputSchema).optional(),
    })
    .strict();

export const AuditQuestionSetsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetsOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsAvgOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      key: z.lazy(() => SortOrderSchema).optional(),
      operand: z.lazy(() => SortOrderSchema).optional(),
      termOne: z.lazy(() => SortOrderSchema).optional(),
      termTwo: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsSumOrderByAggregateInput> =
  z
    .object({
      key: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ContractQuestionsCreateNestedManyWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsCreateNestedManyWithoutContractInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractQuestionsCreateWithoutContractInputSchema),
          z
            .lazy(() => ContractQuestionsCreateWithoutContractInputSchema)
            .array(),
          z.lazy(
            () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
          ),
          z
            .lazy(
              () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ContractQuestionsCreateOrConnectWithoutContractInputSchema,
          ),
          z
            .lazy(
              () => ContractQuestionsCreateOrConnectWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesCreateNestedManyWithoutContractInputSchema: z.ZodType<Prisma.ClausesCreateNestedManyWithoutContractInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutContractInputSchema),
          z.lazy(() => ClausesCreateWithoutContractInputSchema).array(),
          z.lazy(() => ClausesUncheckedCreateWithoutContractInputSchema),
          z
            .lazy(() => ClausesUncheckedCreateWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClausesCreateOrConnectWithoutContractInputSchema),
          z
            .lazy(() => ClausesCreateOrConnectWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedCreateNestedManyWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedCreateNestedManyWithoutContractInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractQuestionsCreateWithoutContractInputSchema),
          z
            .lazy(() => ContractQuestionsCreateWithoutContractInputSchema)
            .array(),
          z.lazy(
            () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
          ),
          z
            .lazy(
              () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ContractQuestionsCreateOrConnectWithoutContractInputSchema,
          ),
          z
            .lazy(
              () => ContractQuestionsCreateOrConnectWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesUncheckedCreateNestedManyWithoutContractInputSchema: z.ZodType<Prisma.ClausesUncheckedCreateNestedManyWithoutContractInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutContractInputSchema),
          z.lazy(() => ClausesCreateWithoutContractInputSchema).array(),
          z.lazy(() => ClausesUncheckedCreateWithoutContractInputSchema),
          z
            .lazy(() => ClausesUncheckedCreateWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClausesCreateOrConnectWithoutContractInputSchema),
          z
            .lazy(() => ClausesCreateOrConnectWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const ContractQuestionsUpdateManyWithoutContractNestedInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateManyWithoutContractNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractQuestionsCreateWithoutContractInputSchema),
          z
            .lazy(() => ContractQuestionsCreateWithoutContractInputSchema)
            .array(),
          z.lazy(
            () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
          ),
          z
            .lazy(
              () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ContractQuestionsCreateOrConnectWithoutContractInputSchema,
          ),
          z
            .lazy(
              () => ContractQuestionsCreateOrConnectWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpsertWithWhereUniqueWithoutContractInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpsertWithWhereUniqueWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpdateWithWhereUniqueWithoutContractInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpdateWithWhereUniqueWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpdateManyWithWhereWithoutContractInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpdateManyWithWhereWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractQuestionsScalarWhereInputSchema),
          z.lazy(() => ContractQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesUpdateManyWithoutContractNestedInputSchema: z.ZodType<Prisma.ClausesUpdateManyWithoutContractNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutContractInputSchema),
          z.lazy(() => ClausesCreateWithoutContractInputSchema).array(),
          z.lazy(() => ClausesUncheckedCreateWithoutContractInputSchema),
          z
            .lazy(() => ClausesUncheckedCreateWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClausesCreateOrConnectWithoutContractInputSchema),
          z
            .lazy(() => ClausesCreateOrConnectWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ClausesUpsertWithWhereUniqueWithoutContractInputSchema),
          z
            .lazy(() => ClausesUpsertWithWhereUniqueWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ClausesUpdateWithWhereUniqueWithoutContractInputSchema),
          z
            .lazy(() => ClausesUpdateWithWhereUniqueWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ClausesUpdateManyWithWhereWithoutContractInputSchema),
          z
            .lazy(() => ClausesUpdateManyWithWhereWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClausesScalarWhereInputSchema),
          z.lazy(() => ClausesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedUpdateManyWithoutContractNestedInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedUpdateManyWithoutContractNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractQuestionsCreateWithoutContractInputSchema),
          z
            .lazy(() => ContractQuestionsCreateWithoutContractInputSchema)
            .array(),
          z.lazy(
            () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
          ),
          z
            .lazy(
              () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ContractQuestionsCreateOrConnectWithoutContractInputSchema,
          ),
          z
            .lazy(
              () => ContractQuestionsCreateOrConnectWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpsertWithWhereUniqueWithoutContractInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpsertWithWhereUniqueWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpdateWithWhereUniqueWithoutContractInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpdateWithWhereUniqueWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpdateManyWithWhereWithoutContractInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpdateManyWithWhereWithoutContractInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractQuestionsScalarWhereInputSchema),
          z.lazy(() => ContractQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateManyWithoutContractNestedInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateManyWithoutContractNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutContractInputSchema),
          z.lazy(() => ClausesCreateWithoutContractInputSchema).array(),
          z.lazy(() => ClausesUncheckedCreateWithoutContractInputSchema),
          z
            .lazy(() => ClausesUncheckedCreateWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClausesCreateOrConnectWithoutContractInputSchema),
          z
            .lazy(() => ClausesCreateOrConnectWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ClausesUpsertWithWhereUniqueWithoutContractInputSchema),
          z
            .lazy(() => ClausesUpsertWithWhereUniqueWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ClausesUpdateWithWhereUniqueWithoutContractInputSchema),
          z
            .lazy(() => ClausesUpdateWithWhereUniqueWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ClausesUpdateManyWithWhereWithoutContractInputSchema),
          z
            .lazy(() => ClausesUpdateManyWithWhereWithoutContractInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClausesScalarWhereInputSchema),
          z.lazy(() => ClausesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsCreateNestedManyWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsCreateNestedManyWithoutContractQuestionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractsCreateWithoutContractQuestionsInputSchema),
          z
            .lazy(() => ContractsCreateWithoutContractQuestionsInputSchema)
            .array(),
          z.lazy(
            () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ContractsCreateOrConnectWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () => ContractsCreateOrConnectWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsCreateNestedManyWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsCreateNestedManyWithoutContractQuestionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsUncheckedCreateNestedManyWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsUncheckedCreateNestedManyWithoutContractQuestionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractsCreateWithoutContractQuestionsInputSchema),
          z
            .lazy(() => ContractsCreateWithoutContractQuestionsInputSchema)
            .array(),
          z.lazy(
            () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ContractsCreateOrConnectWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () => ContractsCreateOrConnectWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUncheckedCreateNestedManyWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUncheckedCreateNestedManyWithoutContractQuestionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const EnumInputTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumInputTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => InputTypeSchema).optional(),
    })
    .strict();

export const ContractsUpdateManyWithoutContractQuestionsNestedInputSchema: z.ZodType<Prisma.ContractsUpdateManyWithoutContractQuestionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractsCreateWithoutContractQuestionsInputSchema),
          z
            .lazy(() => ContractsCreateWithoutContractQuestionsInputSchema)
            .array(),
          z.lazy(
            () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ContractsCreateOrConnectWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () => ContractsCreateOrConnectWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ContractsUpsertWithWhereUniqueWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractsUpsertWithWhereUniqueWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ContractsUpdateWithWhereUniqueWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractsUpdateWithWhereUniqueWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ContractsUpdateManyWithWhereWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractsUpdateManyWithWhereWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractsScalarWhereInputSchema),
          z.lazy(() => ContractsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUpdateManyWithoutContractQuestionNestedInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpdateManyWithoutContractQuestionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsUpsertWithWhereUniqueWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUpsertWithWhereUniqueWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsUpdateWithWhereUniqueWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUpdateWithWhereUniqueWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsUpdateManyWithWhereWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUpdateManyWithWhereWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractQuestionConditionalsScalarWhereInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsUncheckedUpdateManyWithoutContractQuestionsNestedInputSchema: z.ZodType<Prisma.ContractsUncheckedUpdateManyWithoutContractQuestionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractsCreateWithoutContractQuestionsInputSchema),
          z
            .lazy(() => ContractsCreateWithoutContractQuestionsInputSchema)
            .array(),
          z.lazy(
            () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ContractsCreateOrConnectWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () => ContractsCreateOrConnectWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ContractsUpsertWithWhereUniqueWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractsUpsertWithWhereUniqueWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ContractsUpdateWithWhereUniqueWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractsUpdateWithWhereUniqueWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ContractsUpdateManyWithWhereWithoutContractQuestionsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractsUpdateManyWithWhereWithoutContractQuestionsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractsScalarWhereInputSchema),
          z.lazy(() => ContractsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUncheckedUpdateManyWithoutContractQuestionNestedInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUncheckedUpdateManyWithoutContractQuestionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsUpsertWithWhereUniqueWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUpsertWithWhereUniqueWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsUpdateWithWhereUniqueWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUpdateWithWhereUniqueWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ContractQuestionConditionalsUpdateManyWithWhereWithoutContractQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionConditionalsUpdateManyWithWhereWithoutContractQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractQuestionConditionalsScalarWhereInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsCreateNestedManyWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsCreateNestedManyWithoutConditionalsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () =>
              ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedCreateNestedManyWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedCreateNestedManyWithoutConditionalsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () =>
              ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumOperandFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumOperandFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => OperandSchema).optional(),
    })
    .strict();

export const ContractQuestionsUpdateManyWithoutConditionalsNestedInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateManyWithoutConditionalsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () =>
              ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractQuestionsScalarWhereInputSchema),
          z.lazy(() => ContractQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedUpdateManyWithoutConditionalsNestedInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedUpdateManyWithoutConditionalsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () =>
              ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
          z.lazy(() => ContractQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ContractQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ContractQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractQuestionsScalarWhereInputSchema),
          z.lazy(() => ContractQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsCreateNestedManyWithoutClausesInputSchema: z.ZodType<Prisma.ContractsCreateNestedManyWithoutClausesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractsCreateWithoutClausesInputSchema),
          z.lazy(() => ContractsCreateWithoutClausesInputSchema).array(),
          z.lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContractsCreateOrConnectWithoutClausesInputSchema),
          z
            .lazy(() => ContractsCreateOrConnectWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsCreateNestedManyWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsCreateNestedManyWithoutClauseInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema),
          z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema).array(),
          z.lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema),
          z
            .lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClauseQuestionsCreateOrConnectWithoutClauseInputSchema),
          z
            .lazy(() => ClauseQuestionsCreateOrConnectWithoutClauseInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsCreateNestedManyWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsCreateNestedManyWithoutClauseInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema),
          z
            .lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema)
            .array(),
          z.lazy(
            () => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ClauseConditionalsCreateOrConnectWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseConditionalsCreateOrConnectWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsUncheckedCreateNestedManyWithoutClausesInputSchema: z.ZodType<Prisma.ContractsUncheckedCreateNestedManyWithoutClausesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractsCreateWithoutClausesInputSchema),
          z.lazy(() => ContractsCreateWithoutClausesInputSchema).array(),
          z.lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContractsCreateOrConnectWithoutClausesInputSchema),
          z
            .lazy(() => ContractsCreateOrConnectWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsUncheckedCreateNestedManyWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsUncheckedCreateNestedManyWithoutClauseInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema),
          z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema).array(),
          z.lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema),
          z
            .lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClauseQuestionsCreateOrConnectWithoutClauseInputSchema),
          z
            .lazy(() => ClauseQuestionsCreateOrConnectWithoutClauseInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsUncheckedCreateNestedManyWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsUncheckedCreateNestedManyWithoutClauseInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema),
          z
            .lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema)
            .array(),
          z.lazy(
            () => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ClauseConditionalsCreateOrConnectWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseConditionalsCreateOrConnectWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsUpdateManyWithoutClausesNestedInputSchema: z.ZodType<Prisma.ContractsUpdateManyWithoutClausesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractsCreateWithoutClausesInputSchema),
          z.lazy(() => ContractsCreateWithoutClausesInputSchema).array(),
          z.lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContractsCreateOrConnectWithoutClausesInputSchema),
          z
            .lazy(() => ContractsCreateOrConnectWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ContractsUpsertWithWhereUniqueWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUpsertWithWhereUniqueWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ContractsUpdateWithWhereUniqueWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUpdateWithWhereUniqueWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ContractsUpdateManyWithWhereWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUpdateManyWithWhereWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractsScalarWhereInputSchema),
          z.lazy(() => ContractsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsUpdateManyWithoutClauseNestedInputSchema: z.ZodType<Prisma.ClauseQuestionsUpdateManyWithoutClauseNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema),
          z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema).array(),
          z.lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema),
          z
            .lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClauseQuestionsCreateOrConnectWithoutClauseInputSchema),
          z
            .lazy(() => ClauseQuestionsCreateOrConnectWithoutClauseInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ClauseQuestionsUpsertWithWhereUniqueWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseQuestionsUpsertWithWhereUniqueWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ClauseQuestionsUpdateWithWhereUniqueWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseQuestionsUpdateWithWhereUniqueWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ClauseQuestionsUpdateManyWithWhereWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseQuestionsUpdateManyWithWhereWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClauseQuestionsScalarWhereInputSchema),
          z.lazy(() => ClauseQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsUpdateManyWithoutClauseNestedInputSchema: z.ZodType<Prisma.ClauseConditionalsUpdateManyWithoutClauseNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema),
          z
            .lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema)
            .array(),
          z.lazy(
            () => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ClauseConditionalsCreateOrConnectWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseConditionalsCreateOrConnectWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ClauseConditionalsUpsertWithWhereUniqueWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseConditionalsUpsertWithWhereUniqueWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ClauseConditionalsUpdateWithWhereUniqueWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseConditionalsUpdateWithWhereUniqueWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ClauseConditionalsUpdateManyWithWhereWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseConditionalsUpdateManyWithWhereWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClauseConditionalsScalarWhereInputSchema),
          z.lazy(() => ClauseConditionalsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsUncheckedUpdateManyWithoutClausesNestedInputSchema: z.ZodType<Prisma.ContractsUncheckedUpdateManyWithoutClausesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ContractsCreateWithoutClausesInputSchema),
          z.lazy(() => ContractsCreateWithoutClausesInputSchema).array(),
          z.lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ContractsCreateOrConnectWithoutClausesInputSchema),
          z
            .lazy(() => ContractsCreateOrConnectWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ContractsUpsertWithWhereUniqueWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUpsertWithWhereUniqueWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ContractsWhereUniqueInputSchema),
          z.lazy(() => ContractsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ContractsUpdateWithWhereUniqueWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUpdateWithWhereUniqueWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ContractsUpdateManyWithWhereWithoutClausesInputSchema),
          z
            .lazy(() => ContractsUpdateManyWithWhereWithoutClausesInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ContractsScalarWhereInputSchema),
          z.lazy(() => ContractsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsUncheckedUpdateManyWithoutClauseNestedInputSchema: z.ZodType<Prisma.ClauseQuestionsUncheckedUpdateManyWithoutClauseNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema),
          z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema).array(),
          z.lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema),
          z
            .lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClauseQuestionsCreateOrConnectWithoutClauseInputSchema),
          z
            .lazy(() => ClauseQuestionsCreateOrConnectWithoutClauseInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ClauseQuestionsUpsertWithWhereUniqueWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseQuestionsUpsertWithWhereUniqueWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
          z.lazy(() => ClauseQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ClauseQuestionsUpdateWithWhereUniqueWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseQuestionsUpdateWithWhereUniqueWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ClauseQuestionsUpdateManyWithWhereWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseQuestionsUpdateManyWithWhereWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClauseQuestionsScalarWhereInputSchema),
          z.lazy(() => ClauseQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsUncheckedUpdateManyWithoutClauseNestedInputSchema: z.ZodType<Prisma.ClauseConditionalsUncheckedUpdateManyWithoutClauseNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema),
          z
            .lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema)
            .array(),
          z.lazy(
            () => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ClauseConditionalsCreateOrConnectWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () => ClauseConditionalsCreateOrConnectWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ClauseConditionalsUpsertWithWhereUniqueWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseConditionalsUpsertWithWhereUniqueWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
          z.lazy(() => ClauseConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ClauseConditionalsUpdateWithWhereUniqueWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseConditionalsUpdateWithWhereUniqueWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ClauseConditionalsUpdateManyWithWhereWithoutClauseInputSchema,
          ),
          z
            .lazy(
              () =>
                ClauseConditionalsUpdateManyWithWhereWithoutClauseInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClauseConditionalsScalarWhereInputSchema),
          z.lazy(() => ClauseConditionalsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesCreateNestedManyWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesCreateNestedManyWithoutQuestionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutQuestionsInputSchema),
          z.lazy(() => ClausesCreateWithoutQuestionsInputSchema).array(),
          z.lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClausesCreateOrConnectWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesCreateOrConnectWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesUncheckedCreateNestedManyWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesUncheckedCreateNestedManyWithoutQuestionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutQuestionsInputSchema),
          z.lazy(() => ClausesCreateWithoutQuestionsInputSchema).array(),
          z.lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClausesCreateOrConnectWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesCreateOrConnectWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumanswerFormatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumanswerFormatFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => answerFormatSchema).optional(),
    })
    .strict();

export const ClausesUpdateManyWithoutQuestionsNestedInputSchema: z.ZodType<Prisma.ClausesUpdateManyWithoutQuestionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutQuestionsInputSchema),
          z.lazy(() => ClausesCreateWithoutQuestionsInputSchema).array(),
          z.lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClausesCreateOrConnectWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesCreateOrConnectWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ClausesUpsertWithWhereUniqueWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUpsertWithWhereUniqueWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ClausesUpdateWithWhereUniqueWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUpdateWithWhereUniqueWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ClausesUpdateManyWithWhereWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUpdateManyWithWhereWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClausesScalarWhereInputSchema),
          z.lazy(() => ClausesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateManyWithoutQuestionsNestedInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateManyWithoutQuestionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutQuestionsInputSchema),
          z.lazy(() => ClausesCreateWithoutQuestionsInputSchema).array(),
          z.lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ClausesCreateOrConnectWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesCreateOrConnectWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ClausesUpsertWithWhereUniqueWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUpsertWithWhereUniqueWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ClausesUpdateWithWhereUniqueWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUpdateWithWhereUniqueWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ClausesUpdateManyWithWhereWithoutQuestionsInputSchema),
          z
            .lazy(() => ClausesUpdateManyWithWhereWithoutQuestionsInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClausesScalarWhereInputSchema),
          z.lazy(() => ClausesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesCreateNestedManyWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesCreateNestedManyWithoutClauseConditionalsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema),
          z
            .lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema)
            .array(),
          z.lazy(
            () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ClausesCreateOrConnectWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () => ClausesCreateOrConnectWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesUncheckedCreateNestedManyWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesUncheckedCreateNestedManyWithoutClauseConditionalsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema),
          z
            .lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema)
            .array(),
          z.lazy(
            () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ClausesCreateOrConnectWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () => ClausesCreateOrConnectWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesUpdateManyWithoutClauseConditionalsNestedInputSchema: z.ZodType<Prisma.ClausesUpdateManyWithoutClauseConditionalsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema),
          z
            .lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema)
            .array(),
          z.lazy(
            () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ClausesCreateOrConnectWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () => ClausesCreateOrConnectWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ClausesUpsertWithWhereUniqueWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ClausesUpsertWithWhereUniqueWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ClausesUpdateWithWhereUniqueWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ClausesUpdateWithWhereUniqueWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ClausesUpdateManyWithWhereWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ClausesUpdateManyWithWhereWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClausesScalarWhereInputSchema),
          z.lazy(() => ClausesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateManyWithoutClauseConditionalsNestedInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateManyWithoutClauseConditionalsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema),
          z
            .lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema)
            .array(),
          z.lazy(
            () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ClausesCreateOrConnectWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () => ClausesCreateOrConnectWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ClausesUpsertWithWhereUniqueWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ClausesUpsertWithWhereUniqueWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ClausesWhereUniqueInputSchema),
          z.lazy(() => ClausesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ClausesUpdateWithWhereUniqueWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ClausesUpdateWithWhereUniqueWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ClausesUpdateManyWithWhereWithoutClauseConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                ClausesUpdateManyWithWhereWithoutClauseConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ClausesScalarWhereInputSchema),
          z.lazy(() => ClausesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();

export const EnumBusinessForumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBusinessForumFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => BusinessForumSchema).optional(),
    })
    .strict();

export const PricesCreateNestedManyWithoutProductsInputSchema: z.ZodType<Prisma.PricesCreateNestedManyWithoutProductsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PricesCreateWithoutProductsInputSchema),
          z.lazy(() => PricesCreateWithoutProductsInputSchema).array(),
          z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema),
          z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PricesCreateOrConnectWithoutProductsInputSchema),
          z.lazy(() => PricesCreateOrConnectWithoutProductsInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PricesUncheckedCreateNestedManyWithoutProductsInputSchema: z.ZodType<Prisma.PricesUncheckedCreateNestedManyWithoutProductsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PricesCreateWithoutProductsInputSchema),
          z.lazy(() => PricesCreateWithoutProductsInputSchema).array(),
          z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema),
          z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PricesCreateOrConnectWithoutProductsInputSchema),
          z.lazy(() => PricesCreateOrConnectWithoutProductsInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PricesUpdateManyWithoutProductsNestedInputSchema: z.ZodType<Prisma.PricesUpdateManyWithoutProductsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PricesCreateWithoutProductsInputSchema),
          z.lazy(() => PricesCreateWithoutProductsInputSchema).array(),
          z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema),
          z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PricesCreateOrConnectWithoutProductsInputSchema),
          z.lazy(() => PricesCreateOrConnectWithoutProductsInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PricesUpsertWithWhereUniqueWithoutProductsInputSchema),
          z
            .lazy(() => PricesUpsertWithWhereUniqueWithoutProductsInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PricesUpdateWithWhereUniqueWithoutProductsInputSchema),
          z
            .lazy(() => PricesUpdateWithWhereUniqueWithoutProductsInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PricesUpdateManyWithWhereWithoutProductsInputSchema),
          z
            .lazy(() => PricesUpdateManyWithWhereWithoutProductsInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PricesScalarWhereInputSchema),
          z.lazy(() => PricesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PricesUncheckedUpdateManyWithoutProductsNestedInputSchema: z.ZodType<Prisma.PricesUncheckedUpdateManyWithoutProductsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PricesCreateWithoutProductsInputSchema),
          z.lazy(() => PricesCreateWithoutProductsInputSchema).array(),
          z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema),
          z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PricesCreateOrConnectWithoutProductsInputSchema),
          z.lazy(() => PricesCreateOrConnectWithoutProductsInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PricesUpsertWithWhereUniqueWithoutProductsInputSchema),
          z
            .lazy(() => PricesUpsertWithWhereUniqueWithoutProductsInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PricesWhereUniqueInputSchema),
          z.lazy(() => PricesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PricesUpdateWithWhereUniqueWithoutProductsInputSchema),
          z
            .lazy(() => PricesUpdateWithWhereUniqueWithoutProductsInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PricesUpdateManyWithWhereWithoutProductsInputSchema),
          z
            .lazy(() => PricesUpdateManyWithWhereWithoutProductsInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PricesScalarWhereInputSchema),
          z.lazy(() => PricesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ProductCreateNestedManyWithoutPriceInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutPriceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductCreateWithoutPriceInputSchema),
          z.lazy(() => ProductCreateWithoutPriceInputSchema).array(),
          z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema),
          z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProductCreateOrConnectWithoutPriceInputSchema),
          z.lazy(() => ProductCreateOrConnectWithoutPriceInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ProductUncheckedCreateNestedManyWithoutPriceInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutPriceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductCreateWithoutPriceInputSchema),
          z.lazy(() => ProductCreateWithoutPriceInputSchema).array(),
          z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema),
          z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProductCreateOrConnectWithoutPriceInputSchema),
          z.lazy(() => ProductCreateOrConnectWithoutPriceInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ProductUpdateManyWithoutPriceNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutPriceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductCreateWithoutPriceInputSchema),
          z.lazy(() => ProductCreateWithoutPriceInputSchema).array(),
          z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema),
          z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProductCreateOrConnectWithoutPriceInputSchema),
          z.lazy(() => ProductCreateOrConnectWithoutPriceInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ProductUpsertWithWhereUniqueWithoutPriceInputSchema),
          z
            .lazy(() => ProductUpsertWithWhereUniqueWithoutPriceInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ProductUpdateWithWhereUniqueWithoutPriceInputSchema),
          z
            .lazy(() => ProductUpdateWithWhereUniqueWithoutPriceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ProductUpdateManyWithWhereWithoutPriceInputSchema),
          z
            .lazy(() => ProductUpdateManyWithWhereWithoutPriceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ProductScalarWhereInputSchema),
          z.lazy(() => ProductScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ProductUncheckedUpdateManyWithoutPriceNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutPriceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductCreateWithoutPriceInputSchema),
          z.lazy(() => ProductCreateWithoutPriceInputSchema).array(),
          z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema),
          z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProductCreateOrConnectWithoutPriceInputSchema),
          z.lazy(() => ProductCreateOrConnectWithoutPriceInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ProductUpsertWithWhereUniqueWithoutPriceInputSchema),
          z
            .lazy(() => ProductUpsertWithWhereUniqueWithoutPriceInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProductWhereUniqueInputSchema),
          z.lazy(() => ProductWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ProductUpdateWithWhereUniqueWithoutPriceInputSchema),
          z
            .lazy(() => ProductUpdateWithWhereUniqueWithoutPriceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ProductUpdateManyWithWhereWithoutPriceInputSchema),
          z
            .lazy(() => ProductUpdateManyWithWhereWithoutPriceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ProductScalarWhereInputSchema),
          z.lazy(() => ProductScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCreateNestedManyWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCreateNestedManyWithoutTermsOfServiceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUncheckedCreateNestedManyWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUncheckedCreateNestedManyWithoutTermsOfServiceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpdateManyWithoutTermsOfServiceNestedInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpdateManyWithoutTermsOfServiceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUpsertWithWhereUniqueWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUpsertWithWhereUniqueWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUpdateWithWhereUniqueWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUpdateWithWhereUniqueWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUpdateManyWithWhereWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUpdateManyWithWhereWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUncheckedUpdateManyWithoutTermsOfServiceNestedInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUncheckedUpdateManyWithoutTermsOfServiceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUpsertWithWhereUniqueWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUpsertWithWhereUniqueWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUpdateWithWhereUniqueWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUpdateWithWhereUniqueWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              UserTermsOfServiceAcceptanceUpdateManyWithWhereWithoutTermsOfServiceInputSchema,
          ),
          z
            .lazy(
              () =>
                UserTermsOfServiceAcceptanceUpdateManyWithWhereWithoutTermsOfServiceInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceCreateNestedManyWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceCreateNestedManyWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceUncheckedCreateNestedManyWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceUncheckedCreateNestedManyWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceUpdateManyWithoutUserTermsOfServiceAcceptanceNestedInputSchema: z.ZodType<Prisma.TermsOfServiceUpdateManyWithoutUserTermsOfServiceAcceptanceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceUpsertWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUpsertWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceUpdateWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUpdateWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceUpdateManyWithWhereWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUpdateManyWithWhereWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TermsOfServiceScalarWhereInputSchema),
          z.lazy(() => TermsOfServiceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceUncheckedUpdateManyWithoutUserTermsOfServiceAcceptanceNestedInputSchema: z.ZodType<Prisma.TermsOfServiceUncheckedUpdateManyWithoutUserTermsOfServiceAcceptanceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceUpsertWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUpsertWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
          z.lazy(() => TermsOfServiceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceUpdateWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUpdateWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              TermsOfServiceUpdateManyWithWhereWithoutUserTermsOfServiceAcceptanceInputSchema,
          ),
          z
            .lazy(
              () =>
                TermsOfServiceUpdateManyWithWhereWithoutUserTermsOfServiceAcceptanceInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TermsOfServiceScalarWhereInputSchema),
          z.lazy(() => TermsOfServiceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsCreateNestedManyWithoutQuestionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => AuditQuestionConditionalsCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionConditionalsCreateWithoutQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUncheckedCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUncheckedCreateNestedManyWithoutQuestionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => AuditQuestionConditionalsCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionConditionalsCreateWithoutQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnumauditAnswerFormatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumauditAnswerFormatFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => auditAnswerFormatSchema).optional(),
    })
    .strict();

export const AuditQuestionConditionalsUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpdateManyWithoutQuestionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => AuditQuestionConditionalsCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionConditionalsCreateWithoutQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsUpdateManyWithWhereWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUpdateManyWithWhereWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUncheckedUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUncheckedUpdateManyWithoutQuestionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => AuditQuestionConditionalsCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionConditionalsCreateWithoutQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              AuditQuestionConditionalsUpdateManyWithWhereWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionConditionalsUpdateManyWithWhereWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsCreateNestedManyWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsCreateNestedManyWithoutConditionalsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUncheckedCreateNestedManyWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsUncheckedCreateNestedManyWithoutConditionalsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUpdateManyWithoutConditionalsNestedInputSchema: z.ZodType<Prisma.AuditQuestionsUpdateManyWithoutConditionalsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              AuditQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              AuditQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              AuditQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AuditQuestionsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUncheckedUpdateManyWithoutConditionalsNestedInputSchema: z.ZodType<Prisma.AuditQuestionsUncheckedUpdateManyWithoutConditionalsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () => AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              AuditQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              AuditQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              AuditQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AuditQuestionsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCreateNestedManyWithoutQuestionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUncheckedCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUncheckedCreateNestedManyWithoutQuestionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpdateManyWithoutQuestionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUpdateManyWithWhereWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUpdateManyWithWhereWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUncheckedUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUncheckedUpdateManyWithoutQuestionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
            )
            .array(),
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetConditionalsUpdateManyWithWhereWithoutQuestionInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetConditionalsUpdateManyWithWhereWithoutQuestionInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsCreateNestedManyWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsCreateNestedManyWithoutConditionalsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () =>
              AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUncheckedCreateNestedManyWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsUncheckedCreateNestedManyWithoutConditionalsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () =>
              AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUpdateManyWithoutConditionalsNestedInputSchema: z.ZodType<Prisma.AuditQuestionSetsUpdateManyWithoutConditionalsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () =>
              AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsUpdateManyWithWhereWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUpdateManyWithWhereWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AuditQuestionSetsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionSetsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUncheckedUpdateManyWithoutConditionalsNestedInputSchema: z.ZodType<Prisma.AuditQuestionSetsUncheckedUpdateManyWithoutConditionalsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema),
          z
            .lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema)
            .array(),
          z.lazy(
            () =>
              AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUpsertWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
          z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUpdateWithWhereUniqueWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              AuditQuestionSetsUpdateManyWithWhereWithoutConditionalsInputSchema,
          ),
          z
            .lazy(
              () =>
                AuditQuestionSetsUpdateManyWithWhereWithoutConditionalsInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AuditQuestionSetsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionSetsScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z
  .object({
    equals: InputJsonValueSchema.optional(),
    path: z.string().optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_contains: InputJsonValueSchema.optional().nullable(),
    array_starts_with: InputJsonValueSchema.optional().nullable(),
    array_ends_with: InputJsonValueSchema.optional().nullable(),
    lt: InputJsonValueSchema.optional(),
    lte: InputJsonValueSchema.optional(),
    gt: InputJsonValueSchema.optional(),
    gte: InputJsonValueSchema.optional(),
    not: InputJsonValueSchema.optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> =
  z
    .object({
      equals: InputJsonValueSchema.optional(),
      path: z.string().optional(),
      string_contains: z.string().optional(),
      string_starts_with: z.string().optional(),
      string_ends_with: z.string().optional(),
      array_contains: InputJsonValueSchema.optional().nullable(),
      array_starts_with: InputJsonValueSchema.optional().nullable(),
      array_ends_with: InputJsonValueSchema.optional().nullable(),
      lt: InputJsonValueSchema.optional(),
      lte: InputJsonValueSchema.optional(),
      gt: InputJsonValueSchema.optional(),
      gte: InputJsonValueSchema.optional(),
      not: InputJsonValueSchema.optional(),
    })
    .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumInputTypeFilterSchema: z.ZodType<Prisma.NestedEnumInputTypeFilter> =
  z
    .object({
      equals: z.lazy(() => InputTypeSchema).optional(),
      in: z
        .lazy(() => InputTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => InputTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => NestedEnumInputTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedEnumInputTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumInputTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => InputTypeSchema).optional(),
      in: z
        .lazy(() => InputTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => InputTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => NestedEnumInputTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumInputTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumInputTypeFilterSchema).optional(),
    })
    .strict();

export const NestedEnumOperandFilterSchema: z.ZodType<Prisma.NestedEnumOperandFilter> =
  z
    .object({
      equals: z.lazy(() => OperandSchema).optional(),
      in: z
        .lazy(() => OperandSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => OperandSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => NestedEnumOperandFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumOperandWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumOperandWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => OperandSchema).optional(),
      in: z
        .lazy(() => OperandSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => OperandSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => NestedEnumOperandWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumOperandFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumOperandFilterSchema).optional(),
    })
    .strict();

export const NestedEnumanswerFormatFilterSchema: z.ZodType<Prisma.NestedEnumanswerFormatFilter> =
  z
    .object({
      equals: z.lazy(() => answerFormatSchema).optional(),
      in: z
        .lazy(() => answerFormatSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => answerFormatSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => NestedEnumanswerFormatFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumanswerFormatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumanswerFormatWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => answerFormatSchema).optional(),
      in: z
        .lazy(() => answerFormatSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => answerFormatSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => NestedEnumanswerFormatWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumanswerFormatFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumanswerFormatFilterSchema).optional(),
    })
    .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const NestedEnumBusinessForumFilterSchema: z.ZodType<Prisma.NestedEnumBusinessForumFilter> =
  z
    .object({
      equals: z.lazy(() => BusinessForumSchema).optional(),
      in: z
        .lazy(() => BusinessForumSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => BusinessForumSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => BusinessForumSchema),
          z.lazy(() => NestedEnumBusinessForumFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumBusinessForumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBusinessForumWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => BusinessForumSchema).optional(),
      in: z
        .lazy(() => BusinessForumSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => BusinessForumSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => BusinessForumSchema),
          z.lazy(() => NestedEnumBusinessForumWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumBusinessForumFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumBusinessForumFilterSchema).optional(),
    })
    .strict();

export const NestedEnumauditAnswerFormatFilterSchema: z.ZodType<Prisma.NestedEnumauditAnswerFormatFilter> =
  z
    .object({
      equals: z.lazy(() => auditAnswerFormatSchema).optional(),
      in: z
        .lazy(() => auditAnswerFormatSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => auditAnswerFormatSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => NestedEnumauditAnswerFormatFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumauditAnswerFormatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumauditAnswerFormatWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => auditAnswerFormatSchema).optional(),
      in: z
        .lazy(() => auditAnswerFormatSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => auditAnswerFormatSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => NestedEnumauditAnswerFormatWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumauditAnswerFormatFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumauditAnswerFormatFilterSchema).optional(),
    })
    .strict();

export const ContractQuestionsCreateWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsCreateWithoutContractInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      inputType: z.lazy(() => InputTypeSchema),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            ContractQuestionConditionalsCreateNestedManyWithoutContractQuestionInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedCreateWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedCreateWithoutContractInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      inputType: z.lazy(() => InputTypeSchema),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            ContractQuestionConditionalsUncheckedCreateNestedManyWithoutContractQuestionInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsCreateOrConnectWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsCreateOrConnectWithoutContractInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ContractQuestionsCreateWithoutContractInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
        ),
      ]),
    })
    .strict();

export const ClausesCreateWithoutContractInputSchema: z.ZodType<Prisma.ClausesCreateWithoutContractInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      plainTextName: z.string(),
      version: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      deleteWarning: z.string(),
      formatting: z.string(),
      questions: z
        .lazy(() => ClauseQuestionsCreateNestedManyWithoutClauseInputSchema)
        .optional(),
      clauseConditionals: z
        .lazy(() => ClauseConditionalsCreateNestedManyWithoutClauseInputSchema)
        .optional(),
    })
    .strict();

export const ClausesUncheckedCreateWithoutContractInputSchema: z.ZodType<Prisma.ClausesUncheckedCreateWithoutContractInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      plainTextName: z.string(),
      version: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      deleteWarning: z.string(),
      formatting: z.string(),
      questions: z
        .lazy(
          () =>
            ClauseQuestionsUncheckedCreateNestedManyWithoutClauseInputSchema,
        )
        .optional(),
      clauseConditionals: z
        .lazy(
          () =>
            ClauseConditionalsUncheckedCreateNestedManyWithoutClauseInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClausesCreateOrConnectWithoutContractInputSchema: z.ZodType<Prisma.ClausesCreateOrConnectWithoutContractInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ClausesCreateWithoutContractInputSchema),
        z.lazy(() => ClausesUncheckedCreateWithoutContractInputSchema),
      ]),
    })
    .strict();

export const ContractQuestionsUpsertWithWhereUniqueWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsUpsertWithWhereUniqueWithoutContractInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ContractQuestionsUpdateWithoutContractInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedUpdateWithoutContractInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => ContractQuestionsCreateWithoutContractInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedCreateWithoutContractInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionsUpdateWithWhereUniqueWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateWithWhereUniqueWithoutContractInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ContractQuestionsUpdateWithoutContractInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedUpdateWithoutContractInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionsUpdateManyWithWhereWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateManyWithWhereWithoutContractInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ContractQuestionsUpdateManyMutationInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedUpdateManyWithoutContractInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionsScalarWhereInputSchema: z.ZodType<Prisma.ContractQuestionsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContractQuestionsScalarWhereInputSchema),
          z.lazy(() => ContractQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContractQuestionsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContractQuestionsScalarWhereInputSchema),
          z.lazy(() => ContractQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      group: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      variable: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      help: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => EnumInputTypeFilterSchema),
          z.lazy(() => InputTypeSchema),
        ])
        .optional(),
      inputOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
    })
    .strict();

export const ClausesUpsertWithWhereUniqueWithoutContractInputSchema: z.ZodType<Prisma.ClausesUpsertWithWhereUniqueWithoutContractInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ClausesUpdateWithoutContractInputSchema),
        z.lazy(() => ClausesUncheckedUpdateWithoutContractInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ClausesCreateWithoutContractInputSchema),
        z.lazy(() => ClausesUncheckedCreateWithoutContractInputSchema),
      ]),
    })
    .strict();

export const ClausesUpdateWithWhereUniqueWithoutContractInputSchema: z.ZodType<Prisma.ClausesUpdateWithWhereUniqueWithoutContractInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ClausesUpdateWithoutContractInputSchema),
        z.lazy(() => ClausesUncheckedUpdateWithoutContractInputSchema),
      ]),
    })
    .strict();

export const ClausesUpdateManyWithWhereWithoutContractInputSchema: z.ZodType<Prisma.ClausesUpdateManyWithWhereWithoutContractInput> =
  z
    .object({
      where: z.lazy(() => ClausesScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ClausesUpdateManyMutationInputSchema),
        z.lazy(() => ClausesUncheckedUpdateManyWithoutContractInputSchema),
      ]),
    })
    .strict();

export const ClausesScalarWhereInputSchema: z.ZodType<Prisma.ClausesScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ClausesScalarWhereInputSchema),
          z.lazy(() => ClausesScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ClausesScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ClausesScalarWhereInputSchema),
          z.lazy(() => ClausesScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      group: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      plainTextName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      version: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      help: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      formatting: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ContractsCreateWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsCreateWithoutContractQuestionsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      slug: z.string(),
      userRole: z.string().optional(),
      name: z.string(),
      description: z.string(),
      agreementTitle: z.string(),
      variables: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      tags: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauses: z
        .lazy(() => ClausesCreateNestedManyWithoutContractInputSchema)
        .optional(),
    })
    .strict();

export const ContractsUncheckedCreateWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsUncheckedCreateWithoutContractQuestionsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      slug: z.string(),
      userRole: z.string().optional(),
      name: z.string(),
      description: z.string(),
      agreementTitle: z.string(),
      variables: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      tags: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauses: z
        .lazy(() => ClausesUncheckedCreateNestedManyWithoutContractInputSchema)
        .optional(),
    })
    .strict();

export const ContractsCreateOrConnectWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsCreateOrConnectWithoutContractQuestionsInput> =
  z
    .object({
      where: z.lazy(() => ContractsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ContractsCreateWithoutContractQuestionsInputSchema),
        z.lazy(
          () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsCreateWithoutContractQuestionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsCreateOrConnectWithoutContractQuestionInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
        ),
        z.lazy(
          () =>
            ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractsUpsertWithWhereUniqueWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsUpsertWithWhereUniqueWithoutContractQuestionsInput> =
  z
    .object({
      where: z.lazy(() => ContractsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ContractsUpdateWithoutContractQuestionsInputSchema),
        z.lazy(
          () => ContractsUncheckedUpdateWithoutContractQuestionsInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => ContractsCreateWithoutContractQuestionsInputSchema),
        z.lazy(
          () => ContractsUncheckedCreateWithoutContractQuestionsInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractsUpdateWithWhereUniqueWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsUpdateWithWhereUniqueWithoutContractQuestionsInput> =
  z
    .object({
      where: z.lazy(() => ContractsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ContractsUpdateWithoutContractQuestionsInputSchema),
        z.lazy(
          () => ContractsUncheckedUpdateWithoutContractQuestionsInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractsUpdateManyWithWhereWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsUpdateManyWithWhereWithoutContractQuestionsInput> =
  z
    .object({
      where: z.lazy(() => ContractsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ContractsUpdateManyMutationInputSchema),
        z.lazy(
          () => ContractsUncheckedUpdateManyWithoutContractQuestionsInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractsScalarWhereInputSchema: z.ZodType<Prisma.ContractsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContractsScalarWhereInputSchema),
          z.lazy(() => ContractsScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContractsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContractsScalarWhereInputSchema),
          z.lazy(() => ContractsScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      slug: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userRole: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      agreementTitle: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      variables: z.lazy(() => JsonFilterSchema).optional(),
      tags: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      contractQuestionOrder: z.lazy(() => JsonNullableFilterSchema).optional(),
      clauseOrder: z.lazy(() => JsonNullableFilterSchema).optional(),
    })
    .strict();

export const ContractQuestionConditionalsUpsertWithWhereUniqueWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpsertWithWhereUniqueWithoutContractQuestionInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () =>
            ContractQuestionConditionalsUpdateWithoutContractQuestionInputSchema,
        ),
        z.lazy(
          () =>
            ContractQuestionConditionalsUncheckedUpdateWithoutContractQuestionInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            ContractQuestionConditionalsCreateWithoutContractQuestionInputSchema,
        ),
        z.lazy(
          () =>
            ContractQuestionConditionalsUncheckedCreateWithoutContractQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionConditionalsUpdateWithWhereUniqueWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpdateWithWhereUniqueWithoutContractQuestionInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionConditionalsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () =>
            ContractQuestionConditionalsUpdateWithoutContractQuestionInputSchema,
        ),
        z.lazy(
          () =>
            ContractQuestionConditionalsUncheckedUpdateWithoutContractQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionConditionalsUpdateManyWithWhereWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpdateManyWithWhereWithoutContractQuestionInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionConditionalsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ContractQuestionConditionalsUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            ContractQuestionConditionalsUncheckedUpdateManyWithoutContractQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionConditionalsScalarWhereInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ContractQuestionConditionalsScalarWhereInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ContractQuestionConditionalsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ContractQuestionConditionalsScalarWhereInputSchema),
          z
            .lazy(() => ContractQuestionConditionalsScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ContractQuestionsCreateWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsCreateWithoutConditionalsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      inputType: z.lazy(() => InputTypeSchema),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contract: z
        .lazy(
          () => ContractsCreateNestedManyWithoutContractQuestionsInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedCreateWithoutConditionalsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      inputType: z.lazy(() => InputTypeSchema),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contract: z
        .lazy(
          () =>
            ContractsUncheckedCreateNestedManyWithoutContractQuestionsInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsCreateOrConnectWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsCreateOrConnectWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsUpsertWithWhereUniqueWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ContractQuestionsUpdateWithoutConditionalsInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedUpdateWithoutConditionalsInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => ContractQuestionsCreateWithoutConditionalsInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedCreateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateWithWhereUniqueWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ContractQuestionsUpdateWithoutConditionalsInputSchema),
        z.lazy(
          () => ContractQuestionsUncheckedUpdateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateManyWithWhereWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => ContractQuestionsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ContractQuestionsUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            ContractQuestionsUncheckedUpdateManyWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const ContractsCreateWithoutClausesInputSchema: z.ZodType<Prisma.ContractsCreateWithoutClausesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      slug: z.string(),
      userRole: z.string().optional(),
      name: z.string(),
      description: z.string(),
      agreementTitle: z.string(),
      variables: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      tags: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contractQuestions: z
        .lazy(() => ContractQuestionsCreateNestedManyWithoutContractInputSchema)
        .optional(),
    })
    .strict();

export const ContractsUncheckedCreateWithoutClausesInputSchema: z.ZodType<Prisma.ContractsUncheckedCreateWithoutClausesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      slug: z.string(),
      userRole: z.string().optional(),
      name: z.string(),
      description: z.string(),
      agreementTitle: z.string(),
      variables: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      tags: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contractQuestions: z
        .lazy(
          () =>
            ContractQuestionsUncheckedCreateNestedManyWithoutContractInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractsCreateOrConnectWithoutClausesInputSchema: z.ZodType<Prisma.ContractsCreateOrConnectWithoutClausesInput> =
  z
    .object({
      where: z.lazy(() => ContractsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ContractsCreateWithoutClausesInputSchema),
        z.lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema),
      ]),
    })
    .strict();

export const ClauseQuestionsCreateWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsCreateWithoutClauseInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      questionType: z.string(),
      variable: z.string(),
      prompt: z.string(),
      help: z.string(),
      answerFormat: z.lazy(() => answerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z.string().optional().nullable(),
    })
    .strict();

export const ClauseQuestionsUncheckedCreateWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsUncheckedCreateWithoutClauseInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      questionType: z.string(),
      variable: z.string(),
      prompt: z.string(),
      help: z.string(),
      answerFormat: z.lazy(() => answerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z.string().optional().nullable(),
    })
    .strict();

export const ClauseQuestionsCreateOrConnectWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsCreateOrConnectWithoutClauseInput> =
  z
    .object({
      where: z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema),
        z.lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema),
      ]),
    })
    .strict();

export const ClauseConditionalsCreateWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsCreateWithoutClauseInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const ClauseConditionalsUncheckedCreateWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsUncheckedCreateWithoutClauseInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const ClauseConditionalsCreateOrConnectWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsCreateOrConnectWithoutClauseInput> =
  z
    .object({
      where: z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema),
        z.lazy(() => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema),
      ]),
    })
    .strict();

export const ContractsUpsertWithWhereUniqueWithoutClausesInputSchema: z.ZodType<Prisma.ContractsUpsertWithWhereUniqueWithoutClausesInput> =
  z
    .object({
      where: z.lazy(() => ContractsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ContractsUpdateWithoutClausesInputSchema),
        z.lazy(() => ContractsUncheckedUpdateWithoutClausesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ContractsCreateWithoutClausesInputSchema),
        z.lazy(() => ContractsUncheckedCreateWithoutClausesInputSchema),
      ]),
    })
    .strict();

export const ContractsUpdateWithWhereUniqueWithoutClausesInputSchema: z.ZodType<Prisma.ContractsUpdateWithWhereUniqueWithoutClausesInput> =
  z
    .object({
      where: z.lazy(() => ContractsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ContractsUpdateWithoutClausesInputSchema),
        z.lazy(() => ContractsUncheckedUpdateWithoutClausesInputSchema),
      ]),
    })
    .strict();

export const ContractsUpdateManyWithWhereWithoutClausesInputSchema: z.ZodType<Prisma.ContractsUpdateManyWithWhereWithoutClausesInput> =
  z
    .object({
      where: z.lazy(() => ContractsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ContractsUpdateManyMutationInputSchema),
        z.lazy(() => ContractsUncheckedUpdateManyWithoutClausesInputSchema),
      ]),
    })
    .strict();

export const ClauseQuestionsUpsertWithWhereUniqueWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsUpsertWithWhereUniqueWithoutClauseInput> =
  z
    .object({
      where: z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ClauseQuestionsUpdateWithoutClauseInputSchema),
        z.lazy(() => ClauseQuestionsUncheckedUpdateWithoutClauseInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ClauseQuestionsCreateWithoutClauseInputSchema),
        z.lazy(() => ClauseQuestionsUncheckedCreateWithoutClauseInputSchema),
      ]),
    })
    .strict();

export const ClauseQuestionsUpdateWithWhereUniqueWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsUpdateWithWhereUniqueWithoutClauseInput> =
  z
    .object({
      where: z.lazy(() => ClauseQuestionsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ClauseQuestionsUpdateWithoutClauseInputSchema),
        z.lazy(() => ClauseQuestionsUncheckedUpdateWithoutClauseInputSchema),
      ]),
    })
    .strict();

export const ClauseQuestionsUpdateManyWithWhereWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsUpdateManyWithWhereWithoutClauseInput> =
  z
    .object({
      where: z.lazy(() => ClauseQuestionsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ClauseQuestionsUpdateManyMutationInputSchema),
        z.lazy(
          () => ClauseQuestionsUncheckedUpdateManyWithoutClauseInputSchema,
        ),
      ]),
    })
    .strict();

export const ClauseQuestionsScalarWhereInputSchema: z.ZodType<Prisma.ClauseQuestionsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ClauseQuestionsScalarWhereInputSchema),
          z.lazy(() => ClauseQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ClauseQuestionsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ClauseQuestionsScalarWhereInputSchema),
          z.lazy(() => ClauseQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      questionType: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      variable: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      prompt: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      help: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      answerFormat: z
        .union([
          z.lazy(() => EnumanswerFormatFilterSchema),
          z.lazy(() => answerFormatSchema),
        ])
        .optional(),
      answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
      function: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const ClauseConditionalsUpsertWithWhereUniqueWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsUpsertWithWhereUniqueWithoutClauseInput> =
  z
    .object({
      where: z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ClauseConditionalsUpdateWithoutClauseInputSchema),
        z.lazy(() => ClauseConditionalsUncheckedUpdateWithoutClauseInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ClauseConditionalsCreateWithoutClauseInputSchema),
        z.lazy(() => ClauseConditionalsUncheckedCreateWithoutClauseInputSchema),
      ]),
    })
    .strict();

export const ClauseConditionalsUpdateWithWhereUniqueWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsUpdateWithWhereUniqueWithoutClauseInput> =
  z
    .object({
      where: z.lazy(() => ClauseConditionalsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ClauseConditionalsUpdateWithoutClauseInputSchema),
        z.lazy(() => ClauseConditionalsUncheckedUpdateWithoutClauseInputSchema),
      ]),
    })
    .strict();

export const ClauseConditionalsUpdateManyWithWhereWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsUpdateManyWithWhereWithoutClauseInput> =
  z
    .object({
      where: z.lazy(() => ClauseConditionalsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ClauseConditionalsUpdateManyMutationInputSchema),
        z.lazy(
          () => ClauseConditionalsUncheckedUpdateManyWithoutClauseInputSchema,
        ),
      ]),
    })
    .strict();

export const ClauseConditionalsScalarWhereInputSchema: z.ZodType<Prisma.ClauseConditionalsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ClauseConditionalsScalarWhereInputSchema),
          z.lazy(() => ClauseConditionalsScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ClauseConditionalsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ClauseConditionalsScalarWhereInputSchema),
          z.lazy(() => ClauseConditionalsScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ClausesCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesCreateWithoutQuestionsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      plainTextName: z.string(),
      version: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      deleteWarning: z.string(),
      formatting: z.string(),
      contract: z
        .lazy(() => ContractsCreateNestedManyWithoutClausesInputSchema)
        .optional(),
      clauseConditionals: z
        .lazy(() => ClauseConditionalsCreateNestedManyWithoutClauseInputSchema)
        .optional(),
    })
    .strict();

export const ClausesUncheckedCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesUncheckedCreateWithoutQuestionsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      plainTextName: z.string(),
      version: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      deleteWarning: z.string(),
      formatting: z.string(),
      contract: z
        .lazy(() => ContractsUncheckedCreateNestedManyWithoutClausesInputSchema)
        .optional(),
      clauseConditionals: z
        .lazy(
          () =>
            ClauseConditionalsUncheckedCreateNestedManyWithoutClauseInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClausesCreateOrConnectWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesCreateOrConnectWithoutQuestionsInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ClausesCreateWithoutQuestionsInputSchema),
        z.lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema),
      ]),
    })
    .strict();

export const ClausesUpsertWithWhereUniqueWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesUpsertWithWhereUniqueWithoutQuestionsInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ClausesUpdateWithoutQuestionsInputSchema),
        z.lazy(() => ClausesUncheckedUpdateWithoutQuestionsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ClausesCreateWithoutQuestionsInputSchema),
        z.lazy(() => ClausesUncheckedCreateWithoutQuestionsInputSchema),
      ]),
    })
    .strict();

export const ClausesUpdateWithWhereUniqueWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesUpdateWithWhereUniqueWithoutQuestionsInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ClausesUpdateWithoutQuestionsInputSchema),
        z.lazy(() => ClausesUncheckedUpdateWithoutQuestionsInputSchema),
      ]),
    })
    .strict();

export const ClausesUpdateManyWithWhereWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesUpdateManyWithWhereWithoutQuestionsInput> =
  z
    .object({
      where: z.lazy(() => ClausesScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ClausesUpdateManyMutationInputSchema),
        z.lazy(() => ClausesUncheckedUpdateManyWithoutQuestionsInputSchema),
      ]),
    })
    .strict();

export const ClausesCreateWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesCreateWithoutClauseConditionalsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      plainTextName: z.string(),
      version: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      deleteWarning: z.string(),
      formatting: z.string(),
      contract: z
        .lazy(() => ContractsCreateNestedManyWithoutClausesInputSchema)
        .optional(),
      questions: z
        .lazy(() => ClauseQuestionsCreateNestedManyWithoutClauseInputSchema)
        .optional(),
    })
    .strict();

export const ClausesUncheckedCreateWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesUncheckedCreateWithoutClauseConditionalsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      plainTextName: z.string(),
      version: z.string(),
      text: z.string(),
      help: z.string().optional().nullable(),
      deleteWarning: z.string(),
      formatting: z.string(),
      contract: z
        .lazy(() => ContractsUncheckedCreateNestedManyWithoutClausesInputSchema)
        .optional(),
      questions: z
        .lazy(
          () =>
            ClauseQuestionsUncheckedCreateNestedManyWithoutClauseInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClausesCreateOrConnectWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesCreateOrConnectWithoutClauseConditionalsInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema),
        z.lazy(
          () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const ClausesUpsertWithWhereUniqueWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesUpsertWithWhereUniqueWithoutClauseConditionalsInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ClausesUpdateWithoutClauseConditionalsInputSchema),
        z.lazy(
          () => ClausesUncheckedUpdateWithoutClauseConditionalsInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => ClausesCreateWithoutClauseConditionalsInputSchema),
        z.lazy(
          () => ClausesUncheckedCreateWithoutClauseConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const ClausesUpdateWithWhereUniqueWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesUpdateWithWhereUniqueWithoutClauseConditionalsInput> =
  z
    .object({
      where: z.lazy(() => ClausesWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ClausesUpdateWithoutClauseConditionalsInputSchema),
        z.lazy(
          () => ClausesUncheckedUpdateWithoutClauseConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const ClausesUpdateManyWithWhereWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesUpdateManyWithWhereWithoutClauseConditionalsInput> =
  z
    .object({
      where: z.lazy(() => ClausesScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ClausesUpdateManyMutationInputSchema),
        z.lazy(
          () => ClausesUncheckedUpdateManyWithoutClauseConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const PricesCreateWithoutProductsInputSchema: z.ZodType<Prisma.PricesCreateWithoutProductsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      priceId: z.string(),
      active: z.boolean().optional(),
      currency: z.string(),
      productId: z.string().optional(),
      unitAmount: z.number().int(),
      interval: z.string(),
    })
    .strict();

export const PricesUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.PricesUncheckedCreateWithoutProductsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      priceId: z.string(),
      active: z.boolean().optional(),
      currency: z.string(),
      productId: z.string().optional(),
      unitAmount: z.number().int(),
      interval: z.string(),
    })
    .strict();

export const PricesCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.PricesCreateOrConnectWithoutProductsInput> =
  z
    .object({
      where: z.lazy(() => PricesWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PricesCreateWithoutProductsInputSchema),
        z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema),
      ]),
    })
    .strict();

export const PricesUpsertWithWhereUniqueWithoutProductsInputSchema: z.ZodType<Prisma.PricesUpsertWithWhereUniqueWithoutProductsInput> =
  z
    .object({
      where: z.lazy(() => PricesWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PricesUpdateWithoutProductsInputSchema),
        z.lazy(() => PricesUncheckedUpdateWithoutProductsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PricesCreateWithoutProductsInputSchema),
        z.lazy(() => PricesUncheckedCreateWithoutProductsInputSchema),
      ]),
    })
    .strict();

export const PricesUpdateWithWhereUniqueWithoutProductsInputSchema: z.ZodType<Prisma.PricesUpdateWithWhereUniqueWithoutProductsInput> =
  z
    .object({
      where: z.lazy(() => PricesWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PricesUpdateWithoutProductsInputSchema),
        z.lazy(() => PricesUncheckedUpdateWithoutProductsInputSchema),
      ]),
    })
    .strict();

export const PricesUpdateManyWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.PricesUpdateManyWithWhereWithoutProductsInput> =
  z
    .object({
      where: z.lazy(() => PricesScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PricesUpdateManyMutationInputSchema),
        z.lazy(() => PricesUncheckedUpdateManyWithoutProductsInputSchema),
      ]),
    })
    .strict();

export const PricesScalarWhereInputSchema: z.ZodType<Prisma.PricesScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PricesScalarWhereInputSchema),
          z.lazy(() => PricesScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PricesScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PricesScalarWhereInputSchema),
          z.lazy(() => PricesScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      priceId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      active: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
      currency: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      productId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      unitAmount: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      interval: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const ProductCreateWithoutPriceInputSchema: z.ZodType<Prisma.ProductCreateWithoutPriceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      productId: z.string(),
      name: z.string(),
      description: z.string(),
      priceId: z.string(),
      active: z.boolean(),
    })
    .strict();

export const ProductUncheckedCreateWithoutPriceInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutPriceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      productId: z.string(),
      name: z.string(),
      description: z.string(),
      priceId: z.string(),
      active: z.boolean(),
    })
    .strict();

export const ProductCreateOrConnectWithoutPriceInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutPriceInput> =
  z
    .object({
      where: z.lazy(() => ProductWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProductCreateWithoutPriceInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema),
      ]),
    })
    .strict();

export const ProductUpsertWithWhereUniqueWithoutPriceInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutPriceInput> =
  z
    .object({
      where: z.lazy(() => ProductWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ProductUpdateWithoutPriceInputSchema),
        z.lazy(() => ProductUncheckedUpdateWithoutPriceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ProductCreateWithoutPriceInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutPriceInputSchema),
      ]),
    })
    .strict();

export const ProductUpdateWithWhereUniqueWithoutPriceInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutPriceInput> =
  z
    .object({
      where: z.lazy(() => ProductWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ProductUpdateWithoutPriceInputSchema),
        z.lazy(() => ProductUncheckedUpdateWithoutPriceInputSchema),
      ]),
    })
    .strict();

export const ProductUpdateManyWithWhereWithoutPriceInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutPriceInput> =
  z
    .object({
      where: z.lazy(() => ProductScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ProductUpdateManyMutationInputSchema),
        z.lazy(() => ProductUncheckedUpdateManyWithoutPriceInputSchema),
      ]),
    })
    .strict();

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ProductScalarWhereInputSchema),
          z.lazy(() => ProductScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ProductScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ProductScalarWhereInputSchema),
          z.lazy(() => ProductScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      productId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      priceId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      active: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCreateOrConnectWithoutTermsOfServiceInput> =
  z
    .object({
      where: z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
        ),
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
        ),
      ]),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpsertWithWhereUniqueWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpsertWithWhereUniqueWithoutTermsOfServiceInput> =
  z
    .object({
      where: z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceUpdateWithoutTermsOfServiceInputSchema,
        ),
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceUncheckedUpdateWithoutTermsOfServiceInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceCreateWithoutTermsOfServiceInputSchema,
        ),
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceUncheckedCreateWithoutTermsOfServiceInputSchema,
        ),
      ]),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpdateWithWhereUniqueWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpdateWithWhereUniqueWithoutTermsOfServiceInput> =
  z
    .object({
      where: z.lazy(() => UserTermsOfServiceAcceptanceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceUpdateWithoutTermsOfServiceInputSchema,
        ),
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceUncheckedUpdateWithoutTermsOfServiceInputSchema,
        ),
      ]),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpdateManyWithWhereWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpdateManyWithWhereWithoutTermsOfServiceInput> =
  z
    .object({
      where: z.lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserTermsOfServiceAcceptanceUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            UserTermsOfServiceAcceptanceUncheckedUpdateManyWithoutTermsOfServiceInputSchema,
        ),
      ]),
    })
    .strict();

export const UserTermsOfServiceAcceptanceScalarWhereInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema),
          z
            .lazy(() => UserTermsOfServiceAcceptanceScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      version: z.number().int(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      version: z.number().int(),
      text: z.string(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceCreateOrConnectWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      where: z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () =>
            TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
        z.lazy(
          () =>
            TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
      ]),
    })
    .strict();

export const TermsOfServiceUpsertWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceUpsertWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      where: z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () =>
            TermsOfServiceUpdateWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
        z.lazy(
          () =>
            TermsOfServiceUncheckedUpdateWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () =>
            TermsOfServiceCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
        z.lazy(
          () =>
            TermsOfServiceUncheckedCreateWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
      ]),
    })
    .strict();

export const TermsOfServiceUpdateWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceUpdateWithWhereUniqueWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      where: z.lazy(() => TermsOfServiceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () =>
            TermsOfServiceUpdateWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
        z.lazy(
          () =>
            TermsOfServiceUncheckedUpdateWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
      ]),
    })
    .strict();

export const TermsOfServiceUpdateManyWithWhereWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceUpdateManyWithWhereWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      where: z.lazy(() => TermsOfServiceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TermsOfServiceUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            TermsOfServiceUncheckedUpdateManyWithoutUserTermsOfServiceAcceptanceInputSchema,
        ),
      ]),
    })
    .strict();

export const TermsOfServiceScalarWhereInputSchema: z.ZodType<Prisma.TermsOfServiceScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TermsOfServiceScalarWhereInputSchema),
          z.lazy(() => TermsOfServiceScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TermsOfServiceScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TermsOfServiceScalarWhereInputSchema),
          z.lazy(() => TermsOfServiceScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      version: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsCreateWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsCreateWithoutQuestionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUncheckedCreateWithoutQuestionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const AuditQuestionConditionalsCreateOrConnectWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsCreateOrConnectWithoutQuestionInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AuditQuestionConditionalsCreateWithoutQuestionInputSchema),
        z.lazy(
          () =>
            AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpsertWithWhereUniqueWithoutQuestionInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AuditQuestionConditionalsUpdateWithoutQuestionInputSchema),
        z.lazy(
          () =>
            AuditQuestionConditionalsUncheckedUpdateWithoutQuestionInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => AuditQuestionConditionalsCreateWithoutQuestionInputSchema),
        z.lazy(
          () =>
            AuditQuestionConditionalsUncheckedCreateWithoutQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpdateWithWhereUniqueWithoutQuestionInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionConditionalsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AuditQuestionConditionalsUpdateWithoutQuestionInputSchema),
        z.lazy(
          () =>
            AuditQuestionConditionalsUncheckedUpdateWithoutQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionConditionalsUpdateManyWithWhereWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpdateManyWithWhereWithoutQuestionInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AuditQuestionConditionalsUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            AuditQuestionConditionalsUncheckedUpdateManyWithoutQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionConditionalsScalarWhereInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionConditionalsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionConditionalsScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const AuditQuestionsCreateWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsCreateWithoutConditionalsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsUncheckedCreateWithoutConditionalsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      group: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsCreateOrConnectWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsCreateOrConnectWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema),
        z.lazy(
          () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionsUpsertWithWhereUniqueWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsUpsertWithWhereUniqueWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AuditQuestionsUpdateWithoutConditionalsInputSchema),
        z.lazy(
          () => AuditQuestionsUncheckedUpdateWithoutConditionalsInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => AuditQuestionsCreateWithoutConditionalsInputSchema),
        z.lazy(
          () => AuditQuestionsUncheckedCreateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionsUpdateWithWhereUniqueWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsUpdateWithWhereUniqueWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AuditQuestionsUpdateWithoutConditionalsInputSchema),
        z.lazy(
          () => AuditQuestionsUncheckedUpdateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionsUpdateManyWithWhereWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsUpdateManyWithWhereWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AuditQuestionsUpdateManyMutationInputSchema),
        z.lazy(
          () => AuditQuestionsUncheckedUpdateManyWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionsScalarWhereInputSchema: z.ZodType<Prisma.AuditQuestionsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionsScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      group: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      variable: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      help: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      answerType: z
        .union([
          z.lazy(() => EnumauditAnswerFormatFilterSchema),
          z.lazy(() => auditAnswerFormatSchema),
        ])
        .optional(),
      answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCreateWithoutQuestionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      operand: z.lazy(() => OperandSchema),
      termOne: z.string(),
      termTwo: z.string(),
    })
    .strict();

export const AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCreateOrConnectWithoutQuestionInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () => AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
        ),
        z.lazy(
          () =>
            AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionSetConditionalsUpsertWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpsertWithWhereUniqueWithoutQuestionInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(
          () => AuditQuestionSetConditionalsUpdateWithoutQuestionInputSchema,
        ),
        z.lazy(
          () =>
            AuditQuestionSetConditionalsUncheckedUpdateWithoutQuestionInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => AuditQuestionSetConditionalsCreateWithoutQuestionInputSchema,
        ),
        z.lazy(
          () =>
            AuditQuestionSetConditionalsUncheckedCreateWithoutQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionSetConditionalsUpdateWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpdateWithWhereUniqueWithoutQuestionInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionSetConditionalsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(
          () => AuditQuestionSetConditionalsUpdateWithoutQuestionInputSchema,
        ),
        z.lazy(
          () =>
            AuditQuestionSetConditionalsUncheckedUpdateWithoutQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionSetConditionalsUpdateManyWithWhereWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpdateManyWithWhereWithoutQuestionInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AuditQuestionSetConditionalsUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            AuditQuestionSetConditionalsUncheckedUpdateManyWithoutQuestionInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionSetConditionalsScalarWhereInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema),
          z
            .lazy(() => AuditQuestionSetConditionalsScalarWhereInputSchema)
            .array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      operand: z
        .union([
          z.lazy(() => EnumOperandFilterSchema),
          z.lazy(() => OperandSchema),
        ])
        .optional(),
      termOne: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      termTwo: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsCreateWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsCreateWithoutConditionalsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      setCode: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsUncheckedCreateWithoutConditionalsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      key: z.number().int(),
      setCode: z.string(),
      variable: z.string(),
      text: z.string(),
      help: z.string(),
      answerType: z.lazy(() => auditAnswerFormatSchema),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsCreateOrConnectWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsCreateOrConnectWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema),
        z.lazy(
          () => AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionSetsUpsertWithWhereUniqueWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsUpsertWithWhereUniqueWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AuditQuestionSetsUpdateWithoutConditionalsInputSchema),
        z.lazy(
          () => AuditQuestionSetsUncheckedUpdateWithoutConditionalsInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => AuditQuestionSetsCreateWithoutConditionalsInputSchema),
        z.lazy(
          () => AuditQuestionSetsUncheckedCreateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionSetsUpdateWithWhereUniqueWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsUpdateWithWhereUniqueWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionSetsWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AuditQuestionSetsUpdateWithoutConditionalsInputSchema),
        z.lazy(
          () => AuditQuestionSetsUncheckedUpdateWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionSetsUpdateManyWithWhereWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsUpdateManyWithWhereWithoutConditionalsInput> =
  z
    .object({
      where: z.lazy(() => AuditQuestionSetsScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AuditQuestionSetsUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            AuditQuestionSetsUncheckedUpdateManyWithoutConditionalsInputSchema,
        ),
      ]),
    })
    .strict();

export const AuditQuestionSetsScalarWhereInputSchema: z.ZodType<Prisma.AuditQuestionSetsScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AuditQuestionSetsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionSetsScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AuditQuestionSetsScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AuditQuestionSetsScalarWhereInputSchema),
          z.lazy(() => AuditQuestionSetsScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      key: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      setCode: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      variable: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      text: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      help: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      answerType: z
        .union([
          z.lazy(() => EnumauditAnswerFormatFilterSchema),
          z.lazy(() => auditAnswerFormatSchema),
        ])
        .optional(),
      answerOptions: z.lazy(() => JsonNullableFilterSchema).optional(),
    })
    .strict();

export const ContractQuestionsUpdateWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateWithoutContractInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            ContractQuestionConditionalsUpdateManyWithoutContractQuestionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedUpdateWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedUpdateWithoutContractInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      conditionals: z
        .lazy(
          () =>
            ContractQuestionConditionalsUncheckedUpdateManyWithoutContractQuestionNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedUpdateManyWithoutContractInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedUpdateManyWithoutContractInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ClausesUpdateWithoutContractInputSchema: z.ZodType<Prisma.ClausesUpdateWithoutContractInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questions: z
        .lazy(() => ClauseQuestionsUpdateManyWithoutClauseNestedInputSchema)
        .optional(),
      clauseConditionals: z
        .lazy(() => ClauseConditionalsUpdateManyWithoutClauseNestedInputSchema)
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateWithoutContractInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateWithoutContractInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questions: z
        .lazy(
          () =>
            ClauseQuestionsUncheckedUpdateManyWithoutClauseNestedInputSchema,
        )
        .optional(),
      clauseConditionals: z
        .lazy(
          () =>
            ClauseConditionalsUncheckedUpdateManyWithoutClauseNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateManyWithoutContractInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateManyWithoutContractInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ContractsUpdateWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsUpdateWithoutContractQuestionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauses: z
        .lazy(() => ClausesUpdateManyWithoutContractNestedInputSchema)
        .optional(),
    })
    .strict();

export const ContractsUncheckedUpdateWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsUncheckedUpdateWithoutContractQuestionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauses: z
        .lazy(() => ClausesUncheckedUpdateManyWithoutContractNestedInputSchema)
        .optional(),
    })
    .strict();

export const ContractsUncheckedUpdateManyWithoutContractQuestionsInputSchema: z.ZodType<Prisma.ContractsUncheckedUpdateManyWithoutContractQuestionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUpdateWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpdateWithoutContractQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUncheckedUpdateWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUncheckedUpdateWithoutContractQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsUncheckedUpdateManyWithoutContractQuestionInputSchema: z.ZodType<Prisma.ContractQuestionConditionalsUncheckedUpdateManyWithoutContractQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsUpdateWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsUpdateWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contract: z
        .lazy(
          () => ContractsUpdateManyWithoutContractQuestionsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedUpdateWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedUpdateWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contract: z
        .lazy(
          () =>
            ContractsUncheckedUpdateManyWithoutContractQuestionsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractQuestionsUncheckedUpdateManyWithoutConditionalsInputSchema: z.ZodType<Prisma.ContractQuestionsUncheckedUpdateManyWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      inputType: z
        .union([
          z.lazy(() => InputTypeSchema),
          z.lazy(() => EnumInputTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      inputOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ContractsUpdateWithoutClausesInputSchema: z.ZodType<Prisma.ContractsUpdateWithoutClausesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contractQuestions: z
        .lazy(() => ContractQuestionsUpdateManyWithoutContractNestedInputSchema)
        .optional(),
    })
    .strict();

export const ContractsUncheckedUpdateWithoutClausesInputSchema: z.ZodType<Prisma.ContractsUncheckedUpdateWithoutClausesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      contractQuestions: z
        .lazy(
          () =>
            ContractQuestionsUncheckedUpdateManyWithoutContractNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ContractsUncheckedUpdateManyWithoutClausesInputSchema: z.ZodType<Prisma.ContractsUncheckedUpdateManyWithoutClausesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      slug: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userRole: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      agreementTitle: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variables: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      tags: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contractQuestionOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      clauseOrder: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsUpdateWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsUpdateWithoutClauseInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questionType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerFormat: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => EnumanswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ClauseQuestionsUncheckedUpdateWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsUncheckedUpdateWithoutClauseInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questionType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerFormat: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => EnumanswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ClauseQuestionsUncheckedUpdateManyWithoutClauseInputSchema: z.ZodType<Prisma.ClauseQuestionsUncheckedUpdateManyWithoutClauseInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      questionType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerFormat: z
        .union([
          z.lazy(() => answerFormatSchema),
          z.lazy(() => EnumanswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
      function: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ClauseConditionalsUpdateWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsUpdateWithoutClauseInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsUncheckedUpdateWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsUncheckedUpdateWithoutClauseInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsUncheckedUpdateManyWithoutClauseInputSchema: z.ZodType<Prisma.ClauseConditionalsUncheckedUpdateManyWithoutClauseInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ClausesUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesUpdateWithoutQuestionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contract: z
        .lazy(() => ContractsUpdateManyWithoutClausesNestedInputSchema)
        .optional(),
      clauseConditionals: z
        .lazy(() => ClauseConditionalsUpdateManyWithoutClauseNestedInputSchema)
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateWithoutQuestionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contract: z
        .lazy(() => ContractsUncheckedUpdateManyWithoutClausesNestedInputSchema)
        .optional(),
      clauseConditionals: z
        .lazy(
          () =>
            ClauseConditionalsUncheckedUpdateManyWithoutClauseNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateManyWithoutQuestionsInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateManyWithoutQuestionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ClausesUpdateWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesUpdateWithoutClauseConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contract: z
        .lazy(() => ContractsUpdateManyWithoutClausesNestedInputSchema)
        .optional(),
      questions: z
        .lazy(() => ClauseQuestionsUpdateManyWithoutClauseNestedInputSchema)
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateWithoutClauseConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      contract: z
        .lazy(() => ContractsUncheckedUpdateManyWithoutClausesNestedInputSchema)
        .optional(),
      questions: z
        .lazy(
          () =>
            ClauseQuestionsUncheckedUpdateManyWithoutClauseNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const ClausesUncheckedUpdateManyWithoutClauseConditionalsInputSchema: z.ZodType<Prisma.ClausesUncheckedUpdateManyWithoutClauseConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      plainTextName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      deleteWarning: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      formatting: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PricesUpdateWithoutProductsInputSchema: z.ZodType<Prisma.PricesUpdateWithoutProductsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      unitAmount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      interval: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PricesUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.PricesUncheckedUpdateWithoutProductsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      unitAmount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      interval: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PricesUncheckedUpdateManyWithoutProductsInputSchema: z.ZodType<Prisma.PricesUncheckedUpdateManyWithoutProductsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      unitAmount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      interval: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductUpdateWithoutPriceInputSchema: z.ZodType<Prisma.ProductUpdateWithoutPriceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductUncheckedUpdateWithoutPriceInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutPriceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductUncheckedUpdateManyWithoutPriceInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutPriceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      productId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      priceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      active: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpdateWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpdateWithoutTermsOfServiceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUncheckedUpdateWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUncheckedUpdateWithoutTermsOfServiceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUncheckedUpdateManyWithoutTermsOfServiceInputSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUncheckedUpdateManyWithoutTermsOfServiceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceUpdateWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceUpdateWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceUncheckedUpdateWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceUncheckedUpdateWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceUncheckedUpdateManyWithoutUserTermsOfServiceAcceptanceInputSchema: z.ZodType<Prisma.TermsOfServiceUncheckedUpdateManyWithoutUserTermsOfServiceAcceptanceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      version: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpdateWithoutQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUncheckedUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUncheckedUpdateWithoutQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsUncheckedUpdateManyWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionConditionalsUncheckedUpdateManyWithoutQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUpdateWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsUpdateWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUncheckedUpdateWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsUncheckedUpdateWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsUncheckedUpdateManyWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionsUncheckedUpdateManyWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      group: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpdateWithoutQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUncheckedUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUncheckedUpdateWithoutQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsUncheckedUpdateManyWithoutQuestionInputSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUncheckedUpdateManyWithoutQuestionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      operand: z
        .union([
          z.lazy(() => OperandSchema),
          z.lazy(() => EnumOperandFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termOne: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      termTwo: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUpdateWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsUpdateWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      setCode: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUncheckedUpdateWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsUncheckedUpdateWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      setCode: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsUncheckedUpdateManyWithoutConditionalsInputSchema: z.ZodType<Prisma.AuditQuestionSetsUncheckedUpdateManyWithoutConditionalsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      key: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      setCode: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      variable: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      text: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      help: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerType: z
        .union([
          z.lazy(() => auditAnswerFormatSchema),
          z.lazy(() => EnumauditAnswerFormatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      answerOptions: z
        .union([
          z.lazy(() => NullableJsonNullValueInputSchema),
          InputJsonValueSchema,
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ContractsFindFirstArgsSchema: z.ZodType<Prisma.ContractsFindFirstArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      where: ContractsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractsOrderByWithRelationInputSchema.array(),
          ContractsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractsScalarFieldEnumSchema,
          ContractsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContractsFindFirstOrThrowArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      where: ContractsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractsOrderByWithRelationInputSchema.array(),
          ContractsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractsScalarFieldEnumSchema,
          ContractsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsFindManyArgsSchema: z.ZodType<Prisma.ContractsFindManyArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      where: ContractsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractsOrderByWithRelationInputSchema.array(),
          ContractsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractsScalarFieldEnumSchema,
          ContractsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractsAggregateArgsSchema: z.ZodType<Prisma.ContractsAggregateArgs> =
  z
    .object({
      where: ContractsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractsOrderByWithRelationInputSchema.array(),
          ContractsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ContractsGroupByArgsSchema: z.ZodType<Prisma.ContractsGroupByArgs> =
  z
    .object({
      where: ContractsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractsOrderByWithAggregationInputSchema.array(),
          ContractsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ContractsScalarFieldEnumSchema.array(),
      having: ContractsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ContractsFindUniqueArgsSchema: z.ZodType<Prisma.ContractsFindUniqueArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      where: ContractsWhereUniqueInputSchema,
    })
    .strict();

export const ContractsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContractsFindUniqueOrThrowArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      where: ContractsWhereUniqueInputSchema,
    })
    .strict();

export const ContractQuestionsFindFirstArgsSchema: z.ZodType<Prisma.ContractQuestionsFindFirstArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      where: ContractQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionsOrderByWithRelationInputSchema.array(),
          ContractQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractQuestionsScalarFieldEnumSchema,
          ContractQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContractQuestionsFindFirstOrThrowArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      where: ContractQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionsOrderByWithRelationInputSchema.array(),
          ContractQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractQuestionsScalarFieldEnumSchema,
          ContractQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsFindManyArgsSchema: z.ZodType<Prisma.ContractQuestionsFindManyArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      where: ContractQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionsOrderByWithRelationInputSchema.array(),
          ContractQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractQuestionsScalarFieldEnumSchema,
          ContractQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionsAggregateArgsSchema: z.ZodType<Prisma.ContractQuestionsAggregateArgs> =
  z
    .object({
      where: ContractQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionsOrderByWithRelationInputSchema.array(),
          ContractQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ContractQuestionsGroupByArgsSchema: z.ZodType<Prisma.ContractQuestionsGroupByArgs> =
  z
    .object({
      where: ContractQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionsOrderByWithAggregationInputSchema.array(),
          ContractQuestionsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ContractQuestionsScalarFieldEnumSchema.array(),
      having: ContractQuestionsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ContractQuestionsFindUniqueArgsSchema: z.ZodType<Prisma.ContractQuestionsFindUniqueArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      where: ContractQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const ContractQuestionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContractQuestionsFindUniqueOrThrowArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      where: ContractQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const ContractQuestionConditionalsFindFirstArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsFindFirstArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      where: ContractQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionConditionalsOrderByWithRelationInputSchema.array(),
          ContractQuestionConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractQuestionConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractQuestionConditionalsScalarFieldEnumSchema,
          ContractQuestionConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsFindFirstOrThrowArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      where: ContractQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionConditionalsOrderByWithRelationInputSchema.array(),
          ContractQuestionConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractQuestionConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractQuestionConditionalsScalarFieldEnumSchema,
          ContractQuestionConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsFindManyArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsFindManyArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      where: ContractQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionConditionalsOrderByWithRelationInputSchema.array(),
          ContractQuestionConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractQuestionConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ContractQuestionConditionalsScalarFieldEnumSchema,
          ContractQuestionConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ContractQuestionConditionalsAggregateArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsAggregateArgs> =
  z
    .object({
      where: ContractQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionConditionalsOrderByWithRelationInputSchema.array(),
          ContractQuestionConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ContractQuestionConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ContractQuestionConditionalsGroupByArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsGroupByArgs> =
  z
    .object({
      where: ContractQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ContractQuestionConditionalsOrderByWithAggregationInputSchema.array(),
          ContractQuestionConditionalsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ContractQuestionConditionalsScalarFieldEnumSchema.array(),
      having:
        ContractQuestionConditionalsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ContractQuestionConditionalsFindUniqueArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsFindUniqueArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      where: ContractQuestionConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const ContractQuestionConditionalsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsFindUniqueOrThrowArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      where: ContractQuestionConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const ClausesFindFirstArgsSchema: z.ZodType<Prisma.ClausesFindFirstArgs> =
  z
    .object({
      select: ClausesSelectSchema.optional(),
      include: ClausesIncludeSchema.optional(),
      where: ClausesWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClausesOrderByWithRelationInputSchema.array(),
          ClausesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClausesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClausesScalarFieldEnumSchema,
          ClausesScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClausesFindFirstOrThrowArgs> =
  z
    .object({
      select: ClausesSelectSchema.optional(),
      include: ClausesIncludeSchema.optional(),
      where: ClausesWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClausesOrderByWithRelationInputSchema.array(),
          ClausesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClausesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClausesScalarFieldEnumSchema,
          ClausesScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesFindManyArgsSchema: z.ZodType<Prisma.ClausesFindManyArgs> =
  z
    .object({
      select: ClausesSelectSchema.optional(),
      include: ClausesIncludeSchema.optional(),
      where: ClausesWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClausesOrderByWithRelationInputSchema.array(),
          ClausesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClausesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClausesScalarFieldEnumSchema,
          ClausesScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClausesAggregateArgsSchema: z.ZodType<Prisma.ClausesAggregateArgs> =
  z
    .object({
      where: ClausesWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClausesOrderByWithRelationInputSchema.array(),
          ClausesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClausesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ClausesGroupByArgsSchema: z.ZodType<Prisma.ClausesGroupByArgs> = z
  .object({
    where: ClausesWhereInputSchema.optional(),
    orderBy: z
      .union([
        ClausesOrderByWithAggregationInputSchema.array(),
        ClausesOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ClausesScalarFieldEnumSchema.array(),
    having: ClausesScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ClausesFindUniqueArgsSchema: z.ZodType<Prisma.ClausesFindUniqueArgs> =
  z
    .object({
      select: ClausesSelectSchema.optional(),
      include: ClausesIncludeSchema.optional(),
      where: ClausesWhereUniqueInputSchema,
    })
    .strict();

export const ClausesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClausesFindUniqueOrThrowArgs> =
  z
    .object({
      select: ClausesSelectSchema.optional(),
      include: ClausesIncludeSchema.optional(),
      where: ClausesWhereUniqueInputSchema,
    })
    .strict();

export const ClauseQuestionsFindFirstArgsSchema: z.ZodType<Prisma.ClauseQuestionsFindFirstArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      where: ClauseQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseQuestionsOrderByWithRelationInputSchema.array(),
          ClauseQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClauseQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClauseQuestionsScalarFieldEnumSchema,
          ClauseQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClauseQuestionsFindFirstOrThrowArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      where: ClauseQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseQuestionsOrderByWithRelationInputSchema.array(),
          ClauseQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClauseQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClauseQuestionsScalarFieldEnumSchema,
          ClauseQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsFindManyArgsSchema: z.ZodType<Prisma.ClauseQuestionsFindManyArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      where: ClauseQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseQuestionsOrderByWithRelationInputSchema.array(),
          ClauseQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClauseQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClauseQuestionsScalarFieldEnumSchema,
          ClauseQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseQuestionsAggregateArgsSchema: z.ZodType<Prisma.ClauseQuestionsAggregateArgs> =
  z
    .object({
      where: ClauseQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseQuestionsOrderByWithRelationInputSchema.array(),
          ClauseQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClauseQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ClauseQuestionsGroupByArgsSchema: z.ZodType<Prisma.ClauseQuestionsGroupByArgs> =
  z
    .object({
      where: ClauseQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseQuestionsOrderByWithAggregationInputSchema.array(),
          ClauseQuestionsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ClauseQuestionsScalarFieldEnumSchema.array(),
      having: ClauseQuestionsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ClauseQuestionsFindUniqueArgsSchema: z.ZodType<Prisma.ClauseQuestionsFindUniqueArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      where: ClauseQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const ClauseQuestionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClauseQuestionsFindUniqueOrThrowArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      where: ClauseQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const ClauseConditionalsFindFirstArgsSchema: z.ZodType<Prisma.ClauseConditionalsFindFirstArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      where: ClauseConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseConditionalsOrderByWithRelationInputSchema.array(),
          ClauseConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClauseConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClauseConditionalsScalarFieldEnumSchema,
          ClauseConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClauseConditionalsFindFirstOrThrowArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      where: ClauseConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseConditionalsOrderByWithRelationInputSchema.array(),
          ClauseConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClauseConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClauseConditionalsScalarFieldEnumSchema,
          ClauseConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsFindManyArgsSchema: z.ZodType<Prisma.ClauseConditionalsFindManyArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      where: ClauseConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseConditionalsOrderByWithRelationInputSchema.array(),
          ClauseConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClauseConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ClauseConditionalsScalarFieldEnumSchema,
          ClauseConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ClauseConditionalsAggregateArgsSchema: z.ZodType<Prisma.ClauseConditionalsAggregateArgs> =
  z
    .object({
      where: ClauseConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseConditionalsOrderByWithRelationInputSchema.array(),
          ClauseConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ClauseConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ClauseConditionalsGroupByArgsSchema: z.ZodType<Prisma.ClauseConditionalsGroupByArgs> =
  z
    .object({
      where: ClauseConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          ClauseConditionalsOrderByWithAggregationInputSchema.array(),
          ClauseConditionalsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ClauseConditionalsScalarFieldEnumSchema.array(),
      having: ClauseConditionalsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ClauseConditionalsFindUniqueArgsSchema: z.ZodType<Prisma.ClauseConditionalsFindUniqueArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      where: ClauseConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const ClauseConditionalsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClauseConditionalsFindUniqueOrThrowArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      where: ClauseConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const SavedAgreementsFindFirstArgsSchema: z.ZodType<Prisma.SavedAgreementsFindFirstArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      where: SavedAgreementsWhereInputSchema.optional(),
      orderBy: z
        .union([
          SavedAgreementsOrderByWithRelationInputSchema.array(),
          SavedAgreementsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SavedAgreementsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SavedAgreementsScalarFieldEnumSchema,
          SavedAgreementsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SavedAgreementsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SavedAgreementsFindFirstOrThrowArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      where: SavedAgreementsWhereInputSchema.optional(),
      orderBy: z
        .union([
          SavedAgreementsOrderByWithRelationInputSchema.array(),
          SavedAgreementsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SavedAgreementsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SavedAgreementsScalarFieldEnumSchema,
          SavedAgreementsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SavedAgreementsFindManyArgsSchema: z.ZodType<Prisma.SavedAgreementsFindManyArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      where: SavedAgreementsWhereInputSchema.optional(),
      orderBy: z
        .union([
          SavedAgreementsOrderByWithRelationInputSchema.array(),
          SavedAgreementsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SavedAgreementsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SavedAgreementsScalarFieldEnumSchema,
          SavedAgreementsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SavedAgreementsAggregateArgsSchema: z.ZodType<Prisma.SavedAgreementsAggregateArgs> =
  z
    .object({
      where: SavedAgreementsWhereInputSchema.optional(),
      orderBy: z
        .union([
          SavedAgreementsOrderByWithRelationInputSchema.array(),
          SavedAgreementsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SavedAgreementsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SavedAgreementsGroupByArgsSchema: z.ZodType<Prisma.SavedAgreementsGroupByArgs> =
  z
    .object({
      where: SavedAgreementsWhereInputSchema.optional(),
      orderBy: z
        .union([
          SavedAgreementsOrderByWithAggregationInputSchema.array(),
          SavedAgreementsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: SavedAgreementsScalarFieldEnumSchema.array(),
      having: SavedAgreementsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SavedAgreementsFindUniqueArgsSchema: z.ZodType<Prisma.SavedAgreementsFindUniqueArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      where: SavedAgreementsWhereUniqueInputSchema,
    })
    .strict();

export const SavedAgreementsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SavedAgreementsFindUniqueOrThrowArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      where: SavedAgreementsWhereUniqueInputSchema,
    })
    .strict();

export const UserMetaFindFirstArgsSchema: z.ZodType<Prisma.UserMetaFindFirstArgs> =
  z
    .object({
      select: UserMetaSelectSchema.optional(),
      where: UserMetaWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserMetaOrderByWithRelationInputSchema.array(),
          UserMetaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserMetaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserMetaScalarFieldEnumSchema,
          UserMetaScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserMetaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserMetaFindFirstOrThrowArgs> =
  z
    .object({
      select: UserMetaSelectSchema.optional(),
      where: UserMetaWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserMetaOrderByWithRelationInputSchema.array(),
          UserMetaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserMetaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserMetaScalarFieldEnumSchema,
          UserMetaScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserMetaFindManyArgsSchema: z.ZodType<Prisma.UserMetaFindManyArgs> =
  z
    .object({
      select: UserMetaSelectSchema.optional(),
      where: UserMetaWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserMetaOrderByWithRelationInputSchema.array(),
          UserMetaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserMetaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserMetaScalarFieldEnumSchema,
          UserMetaScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserMetaAggregateArgsSchema: z.ZodType<Prisma.UserMetaAggregateArgs> =
  z
    .object({
      where: UserMetaWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserMetaOrderByWithRelationInputSchema.array(),
          UserMetaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserMetaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserMetaGroupByArgsSchema: z.ZodType<Prisma.UserMetaGroupByArgs> =
  z
    .object({
      where: UserMetaWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserMetaOrderByWithAggregationInputSchema.array(),
          UserMetaOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: UserMetaScalarFieldEnumSchema.array(),
      having: UserMetaScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserMetaFindUniqueArgsSchema: z.ZodType<Prisma.UserMetaFindUniqueArgs> =
  z
    .object({
      select: UserMetaSelectSchema.optional(),
      where: UserMetaWhereUniqueInputSchema,
    })
    .strict();

export const UserMetaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserMetaFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserMetaSelectSchema.optional(),
      where: UserMetaWhereUniqueInputSchema,
    })
    .strict();

export const BusinessProfileFindFirstArgsSchema: z.ZodType<Prisma.BusinessProfileFindFirstArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      where: BusinessProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          BusinessProfileOrderByWithRelationInputSchema.array(),
          BusinessProfileOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BusinessProfileWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          BusinessProfileScalarFieldEnumSchema,
          BusinessProfileScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const BusinessProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BusinessProfileFindFirstOrThrowArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      where: BusinessProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          BusinessProfileOrderByWithRelationInputSchema.array(),
          BusinessProfileOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BusinessProfileWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          BusinessProfileScalarFieldEnumSchema,
          BusinessProfileScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const BusinessProfileFindManyArgsSchema: z.ZodType<Prisma.BusinessProfileFindManyArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      where: BusinessProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          BusinessProfileOrderByWithRelationInputSchema.array(),
          BusinessProfileOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BusinessProfileWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          BusinessProfileScalarFieldEnumSchema,
          BusinessProfileScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const BusinessProfileAggregateArgsSchema: z.ZodType<Prisma.BusinessProfileAggregateArgs> =
  z
    .object({
      where: BusinessProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          BusinessProfileOrderByWithRelationInputSchema.array(),
          BusinessProfileOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BusinessProfileWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const BusinessProfileGroupByArgsSchema: z.ZodType<Prisma.BusinessProfileGroupByArgs> =
  z
    .object({
      where: BusinessProfileWhereInputSchema.optional(),
      orderBy: z
        .union([
          BusinessProfileOrderByWithAggregationInputSchema.array(),
          BusinessProfileOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: BusinessProfileScalarFieldEnumSchema.array(),
      having: BusinessProfileScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const BusinessProfileFindUniqueArgsSchema: z.ZodType<Prisma.BusinessProfileFindUniqueArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      where: BusinessProfileWhereUniqueInputSchema,
    })
    .strict();

export const BusinessProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BusinessProfileFindUniqueOrThrowArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      where: BusinessProfileWhereUniqueInputSchema,
    })
    .strict();

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProductOrderByWithRelationInputSchema.array(),
          ProductOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProductWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProductScalarFieldEnumSchema,
          ProductScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProductOrderByWithRelationInputSchema.array(),
          ProductOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProductWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProductScalarFieldEnumSchema,
          ProductScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProductOrderByWithRelationInputSchema.array(),
          ProductOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProductWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ProductScalarFieldEnumSchema,
          ProductScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> =
  z
    .object({
      where: ProductWhereInputSchema.optional(),
      orderBy: z
        .union([
          ProductOrderByWithRelationInputSchema.array(),
          ProductOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ProductWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z
  .object({
    where: ProductWhereInputSchema.optional(),
    orderBy: z
      .union([
        ProductOrderByWithAggregationInputSchema.array(),
        ProductOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ProductScalarFieldEnumSchema.array(),
    having: ProductScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereUniqueInputSchema,
    })
    .strict();

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> =
  z
    .object({
      select: ProductSelectSchema.optional(),
      include: ProductIncludeSchema.optional(),
      where: ProductWhereUniqueInputSchema,
    })
    .strict();

export const PricesFindFirstArgsSchema: z.ZodType<Prisma.PricesFindFirstArgs> =
  z
    .object({
      select: PricesSelectSchema.optional(),
      include: PricesIncludeSchema.optional(),
      where: PricesWhereInputSchema.optional(),
      orderBy: z
        .union([
          PricesOrderByWithRelationInputSchema.array(),
          PricesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PricesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PricesScalarFieldEnumSchema,
          PricesScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PricesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PricesFindFirstOrThrowArgs> =
  z
    .object({
      select: PricesSelectSchema.optional(),
      include: PricesIncludeSchema.optional(),
      where: PricesWhereInputSchema.optional(),
      orderBy: z
        .union([
          PricesOrderByWithRelationInputSchema.array(),
          PricesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PricesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          PricesScalarFieldEnumSchema,
          PricesScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const PricesFindManyArgsSchema: z.ZodType<Prisma.PricesFindManyArgs> = z
  .object({
    select: PricesSelectSchema.optional(),
    include: PricesIncludeSchema.optional(),
    where: PricesWhereInputSchema.optional(),
    orderBy: z
      .union([
        PricesOrderByWithRelationInputSchema.array(),
        PricesOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PricesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([PricesScalarFieldEnumSchema, PricesScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const PricesAggregateArgsSchema: z.ZodType<Prisma.PricesAggregateArgs> =
  z
    .object({
      where: PricesWhereInputSchema.optional(),
      orderBy: z
        .union([
          PricesOrderByWithRelationInputSchema.array(),
          PricesOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PricesWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const PricesGroupByArgsSchema: z.ZodType<Prisma.PricesGroupByArgs> = z
  .object({
    where: PricesWhereInputSchema.optional(),
    orderBy: z
      .union([
        PricesOrderByWithAggregationInputSchema.array(),
        PricesOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: PricesScalarFieldEnumSchema.array(),
    having: PricesScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PricesFindUniqueArgsSchema: z.ZodType<Prisma.PricesFindUniqueArgs> =
  z
    .object({
      select: PricesSelectSchema.optional(),
      include: PricesIncludeSchema.optional(),
      where: PricesWhereUniqueInputSchema,
    })
    .strict();

export const PricesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PricesFindUniqueOrThrowArgs> =
  z
    .object({
      select: PricesSelectSchema.optional(),
      include: PricesIncludeSchema.optional(),
      where: PricesWhereUniqueInputSchema,
    })
    .strict();

export const SubscriptionFindFirstArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithRelationInputSchema.array(),
          SubscriptionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubscriptionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubscriptionScalarFieldEnumSchema,
          SubscriptionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SubscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstOrThrowArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithRelationInputSchema.array(),
          SubscriptionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubscriptionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubscriptionScalarFieldEnumSchema,
          SubscriptionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SubscriptionFindManyArgsSchema: z.ZodType<Prisma.SubscriptionFindManyArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithRelationInputSchema.array(),
          SubscriptionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubscriptionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubscriptionScalarFieldEnumSchema,
          SubscriptionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SubscriptionAggregateArgsSchema: z.ZodType<Prisma.SubscriptionAggregateArgs> =
  z
    .object({
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithRelationInputSchema.array(),
          SubscriptionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubscriptionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SubscriptionGroupByArgsSchema: z.ZodType<Prisma.SubscriptionGroupByArgs> =
  z
    .object({
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithAggregationInputSchema.array(),
          SubscriptionOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: SubscriptionScalarFieldEnumSchema.array(),
      having: SubscriptionScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SubscriptionFindUniqueArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      where: SubscriptionWhereUniqueInputSchema,
    })
    .strict();

export const SubscriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueOrThrowArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      where: SubscriptionWhereUniqueInputSchema,
    })
    .strict();

export const CustomerFindFirstArgsSchema: z.ZodType<Prisma.CustomerFindFirstArgs> =
  z
    .object({
      select: CustomerSelectSchema.optional(),
      where: CustomerWhereInputSchema.optional(),
      orderBy: z
        .union([
          CustomerOrderByWithRelationInputSchema.array(),
          CustomerOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CustomerWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CustomerScalarFieldEnumSchema,
          CustomerScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const CustomerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CustomerFindFirstOrThrowArgs> =
  z
    .object({
      select: CustomerSelectSchema.optional(),
      where: CustomerWhereInputSchema.optional(),
      orderBy: z
        .union([
          CustomerOrderByWithRelationInputSchema.array(),
          CustomerOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CustomerWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CustomerScalarFieldEnumSchema,
          CustomerScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const CustomerFindManyArgsSchema: z.ZodType<Prisma.CustomerFindManyArgs> =
  z
    .object({
      select: CustomerSelectSchema.optional(),
      where: CustomerWhereInputSchema.optional(),
      orderBy: z
        .union([
          CustomerOrderByWithRelationInputSchema.array(),
          CustomerOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CustomerWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CustomerScalarFieldEnumSchema,
          CustomerScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const CustomerAggregateArgsSchema: z.ZodType<Prisma.CustomerAggregateArgs> =
  z
    .object({
      where: CustomerWhereInputSchema.optional(),
      orderBy: z
        .union([
          CustomerOrderByWithRelationInputSchema.array(),
          CustomerOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CustomerWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const CustomerGroupByArgsSchema: z.ZodType<Prisma.CustomerGroupByArgs> =
  z
    .object({
      where: CustomerWhereInputSchema.optional(),
      orderBy: z
        .union([
          CustomerOrderByWithAggregationInputSchema.array(),
          CustomerOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: CustomerScalarFieldEnumSchema.array(),
      having: CustomerScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const CustomerFindUniqueArgsSchema: z.ZodType<Prisma.CustomerFindUniqueArgs> =
  z
    .object({
      select: CustomerSelectSchema.optional(),
      where: CustomerWhereUniqueInputSchema,
    })
    .strict();

export const CustomerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CustomerFindUniqueOrThrowArgs> =
  z
    .object({
      select: CustomerSelectSchema.optional(),
      where: CustomerWhereUniqueInputSchema,
    })
    .strict();

export const OptionsFindFirstArgsSchema: z.ZodType<Prisma.OptionsFindFirstArgs> =
  z
    .object({
      select: OptionsSelectSchema.optional(),
      where: OptionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          OptionsOrderByWithRelationInputSchema.array(),
          OptionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OptionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OptionsScalarFieldEnumSchema,
          OptionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OptionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OptionsFindFirstOrThrowArgs> =
  z
    .object({
      select: OptionsSelectSchema.optional(),
      where: OptionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          OptionsOrderByWithRelationInputSchema.array(),
          OptionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OptionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OptionsScalarFieldEnumSchema,
          OptionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OptionsFindManyArgsSchema: z.ZodType<Prisma.OptionsFindManyArgs> =
  z
    .object({
      select: OptionsSelectSchema.optional(),
      where: OptionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          OptionsOrderByWithRelationInputSchema.array(),
          OptionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OptionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          OptionsScalarFieldEnumSchema,
          OptionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const OptionsAggregateArgsSchema: z.ZodType<Prisma.OptionsAggregateArgs> =
  z
    .object({
      where: OptionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          OptionsOrderByWithRelationInputSchema.array(),
          OptionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: OptionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const OptionsGroupByArgsSchema: z.ZodType<Prisma.OptionsGroupByArgs> = z
  .object({
    where: OptionsWhereInputSchema.optional(),
    orderBy: z
      .union([
        OptionsOrderByWithAggregationInputSchema.array(),
        OptionsOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: OptionsScalarFieldEnumSchema.array(),
    having: OptionsScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const OptionsFindUniqueArgsSchema: z.ZodType<Prisma.OptionsFindUniqueArgs> =
  z
    .object({
      select: OptionsSelectSchema.optional(),
      where: OptionsWhereUniqueInputSchema,
    })
    .strict();

export const OptionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OptionsFindUniqueOrThrowArgs> =
  z
    .object({
      select: OptionsSelectSchema.optional(),
      where: OptionsWhereUniqueInputSchema,
    })
    .strict();

export const TermsOfServiceFindFirstArgsSchema: z.ZodType<Prisma.TermsOfServiceFindFirstArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      where: TermsOfServiceWhereInputSchema.optional(),
      orderBy: z
        .union([
          TermsOfServiceOrderByWithRelationInputSchema.array(),
          TermsOfServiceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TermsOfServiceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TermsOfServiceScalarFieldEnumSchema,
          TermsOfServiceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TermsOfServiceFindFirstOrThrowArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      where: TermsOfServiceWhereInputSchema.optional(),
      orderBy: z
        .union([
          TermsOfServiceOrderByWithRelationInputSchema.array(),
          TermsOfServiceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TermsOfServiceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TermsOfServiceScalarFieldEnumSchema,
          TermsOfServiceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceFindManyArgsSchema: z.ZodType<Prisma.TermsOfServiceFindManyArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      where: TermsOfServiceWhereInputSchema.optional(),
      orderBy: z
        .union([
          TermsOfServiceOrderByWithRelationInputSchema.array(),
          TermsOfServiceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TermsOfServiceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TermsOfServiceScalarFieldEnumSchema,
          TermsOfServiceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TermsOfServiceAggregateArgsSchema: z.ZodType<Prisma.TermsOfServiceAggregateArgs> =
  z
    .object({
      where: TermsOfServiceWhereInputSchema.optional(),
      orderBy: z
        .union([
          TermsOfServiceOrderByWithRelationInputSchema.array(),
          TermsOfServiceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TermsOfServiceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const TermsOfServiceGroupByArgsSchema: z.ZodType<Prisma.TermsOfServiceGroupByArgs> =
  z
    .object({
      where: TermsOfServiceWhereInputSchema.optional(),
      orderBy: z
        .union([
          TermsOfServiceOrderByWithAggregationInputSchema.array(),
          TermsOfServiceOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: TermsOfServiceScalarFieldEnumSchema.array(),
      having: TermsOfServiceScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const TermsOfServiceFindUniqueArgsSchema: z.ZodType<Prisma.TermsOfServiceFindUniqueArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      where: TermsOfServiceWhereUniqueInputSchema,
    })
    .strict();

export const TermsOfServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TermsOfServiceFindUniqueOrThrowArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      where: TermsOfServiceWhereUniqueInputSchema,
    })
    .strict();

export const UserTermsOfServiceAcceptanceFindFirstArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceFindFirstArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      where: UserTermsOfServiceAcceptanceWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema.array(),
          UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserTermsOfServiceAcceptanceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserTermsOfServiceAcceptanceScalarFieldEnumSchema,
          UserTermsOfServiceAcceptanceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceFindFirstOrThrowArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      where: UserTermsOfServiceAcceptanceWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema.array(),
          UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserTermsOfServiceAcceptanceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserTermsOfServiceAcceptanceScalarFieldEnumSchema,
          UserTermsOfServiceAcceptanceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceFindManyArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceFindManyArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      where: UserTermsOfServiceAcceptanceWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema.array(),
          UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserTermsOfServiceAcceptanceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          UserTermsOfServiceAcceptanceScalarFieldEnumSchema,
          UserTermsOfServiceAcceptanceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceAggregateArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceAggregateArgs> =
  z
    .object({
      where: UserTermsOfServiceAcceptanceWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema.array(),
          UserTermsOfServiceAcceptanceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserTermsOfServiceAcceptanceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceGroupByArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceGroupByArgs> =
  z
    .object({
      where: UserTermsOfServiceAcceptanceWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserTermsOfServiceAcceptanceOrderByWithAggregationInputSchema.array(),
          UserTermsOfServiceAcceptanceOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: UserTermsOfServiceAcceptanceScalarFieldEnumSchema.array(),
      having:
        UserTermsOfServiceAcceptanceScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceFindUniqueArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceFindUniqueArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      where: UserTermsOfServiceAcceptanceWhereUniqueInputSchema,
    })
    .strict();

export const UserTermsOfServiceAcceptanceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      where: UserTermsOfServiceAcceptanceWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionsFindFirstArgsSchema: z.ZodType<Prisma.AuditQuestionsFindFirstArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      where: AuditQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionsOrderByWithRelationInputSchema.array(),
          AuditQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionsScalarFieldEnumSchema,
          AuditQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuditQuestionsFindFirstOrThrowArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      where: AuditQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionsOrderByWithRelationInputSchema.array(),
          AuditQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionsScalarFieldEnumSchema,
          AuditQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsFindManyArgsSchema: z.ZodType<Prisma.AuditQuestionsFindManyArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      where: AuditQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionsOrderByWithRelationInputSchema.array(),
          AuditQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionsScalarFieldEnumSchema,
          AuditQuestionsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionsAggregateArgsSchema: z.ZodType<Prisma.AuditQuestionsAggregateArgs> =
  z
    .object({
      where: AuditQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionsOrderByWithRelationInputSchema.array(),
          AuditQuestionsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AuditQuestionsGroupByArgsSchema: z.ZodType<Prisma.AuditQuestionsGroupByArgs> =
  z
    .object({
      where: AuditQuestionsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionsOrderByWithAggregationInputSchema.array(),
          AuditQuestionsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: AuditQuestionsScalarFieldEnumSchema.array(),
      having: AuditQuestionsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AuditQuestionsFindUniqueArgsSchema: z.ZodType<Prisma.AuditQuestionsFindUniqueArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      where: AuditQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuditQuestionsFindUniqueOrThrowArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      where: AuditQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionConditionalsFindFirstArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsFindFirstArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      where: AuditQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionConditionalsOrderByWithRelationInputSchema.array(),
          AuditQuestionConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionConditionalsScalarFieldEnumSchema,
          AuditQuestionConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsFindFirstOrThrowArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      where: AuditQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionConditionalsOrderByWithRelationInputSchema.array(),
          AuditQuestionConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionConditionalsScalarFieldEnumSchema,
          AuditQuestionConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsFindManyArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsFindManyArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      where: AuditQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionConditionalsOrderByWithRelationInputSchema.array(),
          AuditQuestionConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionConditionalsScalarFieldEnumSchema,
          AuditQuestionConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionConditionalsAggregateArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsAggregateArgs> =
  z
    .object({
      where: AuditQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionConditionalsOrderByWithRelationInputSchema.array(),
          AuditQuestionConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AuditQuestionConditionalsGroupByArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsGroupByArgs> =
  z
    .object({
      where: AuditQuestionConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionConditionalsOrderByWithAggregationInputSchema.array(),
          AuditQuestionConditionalsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: AuditQuestionConditionalsScalarFieldEnumSchema.array(),
      having:
        AuditQuestionConditionalsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AuditQuestionConditionalsFindUniqueArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsFindUniqueArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      where: AuditQuestionConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionConditionalsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsFindUniqueOrThrowArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      where: AuditQuestionConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionSetsFindFirstArgsSchema: z.ZodType<Prisma.AuditQuestionSetsFindFirstArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      where: AuditQuestionSetsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetsOrderByWithRelationInputSchema.array(),
          AuditQuestionSetsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionSetsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionSetsScalarFieldEnumSchema,
          AuditQuestionSetsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuditQuestionSetsFindFirstOrThrowArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      where: AuditQuestionSetsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetsOrderByWithRelationInputSchema.array(),
          AuditQuestionSetsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionSetsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionSetsScalarFieldEnumSchema,
          AuditQuestionSetsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsFindManyArgsSchema: z.ZodType<Prisma.AuditQuestionSetsFindManyArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      where: AuditQuestionSetsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetsOrderByWithRelationInputSchema.array(),
          AuditQuestionSetsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionSetsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionSetsScalarFieldEnumSchema,
          AuditQuestionSetsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetsAggregateArgsSchema: z.ZodType<Prisma.AuditQuestionSetsAggregateArgs> =
  z
    .object({
      where: AuditQuestionSetsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetsOrderByWithRelationInputSchema.array(),
          AuditQuestionSetsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionSetsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AuditQuestionSetsGroupByArgsSchema: z.ZodType<Prisma.AuditQuestionSetsGroupByArgs> =
  z
    .object({
      where: AuditQuestionSetsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetsOrderByWithAggregationInputSchema.array(),
          AuditQuestionSetsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: AuditQuestionSetsScalarFieldEnumSchema.array(),
      having: AuditQuestionSetsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AuditQuestionSetsFindUniqueArgsSchema: z.ZodType<Prisma.AuditQuestionSetsFindUniqueArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      where: AuditQuestionSetsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionSetsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuditQuestionSetsFindUniqueOrThrowArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      where: AuditQuestionSetsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionSetConditionalsFindFirstArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsFindFirstArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      where: AuditQuestionSetConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetConditionalsOrderByWithRelationInputSchema.array(),
          AuditQuestionSetConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionSetConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionSetConditionalsScalarFieldEnumSchema,
          AuditQuestionSetConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsFindFirstOrThrowArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      where: AuditQuestionSetConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetConditionalsOrderByWithRelationInputSchema.array(),
          AuditQuestionSetConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionSetConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionSetConditionalsScalarFieldEnumSchema,
          AuditQuestionSetConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsFindManyArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsFindManyArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      where: AuditQuestionSetConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetConditionalsOrderByWithRelationInputSchema.array(),
          AuditQuestionSetConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionSetConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AuditQuestionSetConditionalsScalarFieldEnumSchema,
          AuditQuestionSetConditionalsScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsAggregateArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsAggregateArgs> =
  z
    .object({
      where: AuditQuestionSetConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetConditionalsOrderByWithRelationInputSchema.array(),
          AuditQuestionSetConditionalsOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AuditQuestionSetConditionalsWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsGroupByArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsGroupByArgs> =
  z
    .object({
      where: AuditQuestionSetConditionalsWhereInputSchema.optional(),
      orderBy: z
        .union([
          AuditQuestionSetConditionalsOrderByWithAggregationInputSchema.array(),
          AuditQuestionSetConditionalsOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: AuditQuestionSetConditionalsScalarFieldEnumSchema.array(),
      having:
        AuditQuestionSetConditionalsScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsFindUniqueArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsFindUniqueArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      where: AuditQuestionSetConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionSetConditionalsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsFindUniqueOrThrowArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      where: AuditQuestionSetConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const ContractsCreateArgsSchema: z.ZodType<Prisma.ContractsCreateArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      data: z.union([
        ContractsCreateInputSchema,
        ContractsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const ContractsUpsertArgsSchema: z.ZodType<Prisma.ContractsUpsertArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      where: ContractsWhereUniqueInputSchema,
      create: z.union([
        ContractsCreateInputSchema,
        ContractsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        ContractsUpdateInputSchema,
        ContractsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const ContractsCreateManyArgsSchema: z.ZodType<Prisma.ContractsCreateManyArgs> =
  z
    .object({
      data: z.union([
        ContractsCreateManyInputSchema,
        ContractsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ContractsDeleteArgsSchema: z.ZodType<Prisma.ContractsDeleteArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      where: ContractsWhereUniqueInputSchema,
    })
    .strict();

export const ContractsUpdateArgsSchema: z.ZodType<Prisma.ContractsUpdateArgs> =
  z
    .object({
      select: ContractsSelectSchema.optional(),
      include: ContractsIncludeSchema.optional(),
      data: z.union([
        ContractsUpdateInputSchema,
        ContractsUncheckedUpdateInputSchema,
      ]),
      where: ContractsWhereUniqueInputSchema,
    })
    .strict();

export const ContractsUpdateManyArgsSchema: z.ZodType<Prisma.ContractsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ContractsUpdateManyMutationInputSchema,
        ContractsUncheckedUpdateManyInputSchema,
      ]),
      where: ContractsWhereInputSchema.optional(),
    })
    .strict();

export const ContractsDeleteManyArgsSchema: z.ZodType<Prisma.ContractsDeleteManyArgs> =
  z
    .object({
      where: ContractsWhereInputSchema.optional(),
    })
    .strict();

export const ContractQuestionsCreateArgsSchema: z.ZodType<Prisma.ContractQuestionsCreateArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      data: z.union([
        ContractQuestionsCreateInputSchema,
        ContractQuestionsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const ContractQuestionsUpsertArgsSchema: z.ZodType<Prisma.ContractQuestionsUpsertArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      where: ContractQuestionsWhereUniqueInputSchema,
      create: z.union([
        ContractQuestionsCreateInputSchema,
        ContractQuestionsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        ContractQuestionsUpdateInputSchema,
        ContractQuestionsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const ContractQuestionsCreateManyArgsSchema: z.ZodType<Prisma.ContractQuestionsCreateManyArgs> =
  z
    .object({
      data: z.union([
        ContractQuestionsCreateManyInputSchema,
        ContractQuestionsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ContractQuestionsDeleteArgsSchema: z.ZodType<Prisma.ContractQuestionsDeleteArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      where: ContractQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const ContractQuestionsUpdateArgsSchema: z.ZodType<Prisma.ContractQuestionsUpdateArgs> =
  z
    .object({
      select: ContractQuestionsSelectSchema.optional(),
      include: ContractQuestionsIncludeSchema.optional(),
      data: z.union([
        ContractQuestionsUpdateInputSchema,
        ContractQuestionsUncheckedUpdateInputSchema,
      ]),
      where: ContractQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const ContractQuestionsUpdateManyArgsSchema: z.ZodType<Prisma.ContractQuestionsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ContractQuestionsUpdateManyMutationInputSchema,
        ContractQuestionsUncheckedUpdateManyInputSchema,
      ]),
      where: ContractQuestionsWhereInputSchema.optional(),
    })
    .strict();

export const ContractQuestionsDeleteManyArgsSchema: z.ZodType<Prisma.ContractQuestionsDeleteManyArgs> =
  z
    .object({
      where: ContractQuestionsWhereInputSchema.optional(),
    })
    .strict();

export const ContractQuestionConditionalsCreateArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsCreateArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      data: z.union([
        ContractQuestionConditionalsCreateInputSchema,
        ContractQuestionConditionalsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const ContractQuestionConditionalsUpsertArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpsertArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      where: ContractQuestionConditionalsWhereUniqueInputSchema,
      create: z.union([
        ContractQuestionConditionalsCreateInputSchema,
        ContractQuestionConditionalsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        ContractQuestionConditionalsUpdateInputSchema,
        ContractQuestionConditionalsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const ContractQuestionConditionalsCreateManyArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsCreateManyArgs> =
  z
    .object({
      data: z.union([
        ContractQuestionConditionalsCreateManyInputSchema,
        ContractQuestionConditionalsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ContractQuestionConditionalsDeleteArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsDeleteArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      where: ContractQuestionConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const ContractQuestionConditionalsUpdateArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpdateArgs> =
  z
    .object({
      select: ContractQuestionConditionalsSelectSchema.optional(),
      include: ContractQuestionConditionalsIncludeSchema.optional(),
      data: z.union([
        ContractQuestionConditionalsUpdateInputSchema,
        ContractQuestionConditionalsUncheckedUpdateInputSchema,
      ]),
      where: ContractQuestionConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const ContractQuestionConditionalsUpdateManyArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ContractQuestionConditionalsUpdateManyMutationInputSchema,
        ContractQuestionConditionalsUncheckedUpdateManyInputSchema,
      ]),
      where: ContractQuestionConditionalsWhereInputSchema.optional(),
    })
    .strict();

export const ContractQuestionConditionalsDeleteManyArgsSchema: z.ZodType<Prisma.ContractQuestionConditionalsDeleteManyArgs> =
  z
    .object({
      where: ContractQuestionConditionalsWhereInputSchema.optional(),
    })
    .strict();

export const ClausesCreateArgsSchema: z.ZodType<Prisma.ClausesCreateArgs> = z
  .object({
    select: ClausesSelectSchema.optional(),
    include: ClausesIncludeSchema.optional(),
    data: z.union([
      ClausesCreateInputSchema,
      ClausesUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ClausesUpsertArgsSchema: z.ZodType<Prisma.ClausesUpsertArgs> = z
  .object({
    select: ClausesSelectSchema.optional(),
    include: ClausesIncludeSchema.optional(),
    where: ClausesWhereUniqueInputSchema,
    create: z.union([
      ClausesCreateInputSchema,
      ClausesUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ClausesUpdateInputSchema,
      ClausesUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ClausesCreateManyArgsSchema: z.ZodType<Prisma.ClausesCreateManyArgs> =
  z
    .object({
      data: z.union([
        ClausesCreateManyInputSchema,
        ClausesCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ClausesDeleteArgsSchema: z.ZodType<Prisma.ClausesDeleteArgs> = z
  .object({
    select: ClausesSelectSchema.optional(),
    include: ClausesIncludeSchema.optional(),
    where: ClausesWhereUniqueInputSchema,
  })
  .strict();

export const ClausesUpdateArgsSchema: z.ZodType<Prisma.ClausesUpdateArgs> = z
  .object({
    select: ClausesSelectSchema.optional(),
    include: ClausesIncludeSchema.optional(),
    data: z.union([
      ClausesUpdateInputSchema,
      ClausesUncheckedUpdateInputSchema,
    ]),
    where: ClausesWhereUniqueInputSchema,
  })
  .strict();

export const ClausesUpdateManyArgsSchema: z.ZodType<Prisma.ClausesUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ClausesUpdateManyMutationInputSchema,
        ClausesUncheckedUpdateManyInputSchema,
      ]),
      where: ClausesWhereInputSchema.optional(),
    })
    .strict();

export const ClausesDeleteManyArgsSchema: z.ZodType<Prisma.ClausesDeleteManyArgs> =
  z
    .object({
      where: ClausesWhereInputSchema.optional(),
    })
    .strict();

export const ClauseQuestionsCreateArgsSchema: z.ZodType<Prisma.ClauseQuestionsCreateArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      data: z.union([
        ClauseQuestionsCreateInputSchema,
        ClauseQuestionsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const ClauseQuestionsUpsertArgsSchema: z.ZodType<Prisma.ClauseQuestionsUpsertArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      where: ClauseQuestionsWhereUniqueInputSchema,
      create: z.union([
        ClauseQuestionsCreateInputSchema,
        ClauseQuestionsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        ClauseQuestionsUpdateInputSchema,
        ClauseQuestionsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const ClauseQuestionsCreateManyArgsSchema: z.ZodType<Prisma.ClauseQuestionsCreateManyArgs> =
  z
    .object({
      data: z.union([
        ClauseQuestionsCreateManyInputSchema,
        ClauseQuestionsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ClauseQuestionsDeleteArgsSchema: z.ZodType<Prisma.ClauseQuestionsDeleteArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      where: ClauseQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const ClauseQuestionsUpdateArgsSchema: z.ZodType<Prisma.ClauseQuestionsUpdateArgs> =
  z
    .object({
      select: ClauseQuestionsSelectSchema.optional(),
      include: ClauseQuestionsIncludeSchema.optional(),
      data: z.union([
        ClauseQuestionsUpdateInputSchema,
        ClauseQuestionsUncheckedUpdateInputSchema,
      ]),
      where: ClauseQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const ClauseQuestionsUpdateManyArgsSchema: z.ZodType<Prisma.ClauseQuestionsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ClauseQuestionsUpdateManyMutationInputSchema,
        ClauseQuestionsUncheckedUpdateManyInputSchema,
      ]),
      where: ClauseQuestionsWhereInputSchema.optional(),
    })
    .strict();

export const ClauseQuestionsDeleteManyArgsSchema: z.ZodType<Prisma.ClauseQuestionsDeleteManyArgs> =
  z
    .object({
      where: ClauseQuestionsWhereInputSchema.optional(),
    })
    .strict();

export const ClauseConditionalsCreateArgsSchema: z.ZodType<Prisma.ClauseConditionalsCreateArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      data: z.union([
        ClauseConditionalsCreateInputSchema,
        ClauseConditionalsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const ClauseConditionalsUpsertArgsSchema: z.ZodType<Prisma.ClauseConditionalsUpsertArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      where: ClauseConditionalsWhereUniqueInputSchema,
      create: z.union([
        ClauseConditionalsCreateInputSchema,
        ClauseConditionalsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        ClauseConditionalsUpdateInputSchema,
        ClauseConditionalsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const ClauseConditionalsCreateManyArgsSchema: z.ZodType<Prisma.ClauseConditionalsCreateManyArgs> =
  z
    .object({
      data: z.union([
        ClauseConditionalsCreateManyInputSchema,
        ClauseConditionalsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ClauseConditionalsDeleteArgsSchema: z.ZodType<Prisma.ClauseConditionalsDeleteArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      where: ClauseConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const ClauseConditionalsUpdateArgsSchema: z.ZodType<Prisma.ClauseConditionalsUpdateArgs> =
  z
    .object({
      select: ClauseConditionalsSelectSchema.optional(),
      include: ClauseConditionalsIncludeSchema.optional(),
      data: z.union([
        ClauseConditionalsUpdateInputSchema,
        ClauseConditionalsUncheckedUpdateInputSchema,
      ]),
      where: ClauseConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const ClauseConditionalsUpdateManyArgsSchema: z.ZodType<Prisma.ClauseConditionalsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ClauseConditionalsUpdateManyMutationInputSchema,
        ClauseConditionalsUncheckedUpdateManyInputSchema,
      ]),
      where: ClauseConditionalsWhereInputSchema.optional(),
    })
    .strict();

export const ClauseConditionalsDeleteManyArgsSchema: z.ZodType<Prisma.ClauseConditionalsDeleteManyArgs> =
  z
    .object({
      where: ClauseConditionalsWhereInputSchema.optional(),
    })
    .strict();

export const SavedAgreementsCreateArgsSchema: z.ZodType<Prisma.SavedAgreementsCreateArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      data: z.union([
        SavedAgreementsCreateInputSchema,
        SavedAgreementsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const SavedAgreementsUpsertArgsSchema: z.ZodType<Prisma.SavedAgreementsUpsertArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      where: SavedAgreementsWhereUniqueInputSchema,
      create: z.union([
        SavedAgreementsCreateInputSchema,
        SavedAgreementsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        SavedAgreementsUpdateInputSchema,
        SavedAgreementsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const SavedAgreementsCreateManyArgsSchema: z.ZodType<Prisma.SavedAgreementsCreateManyArgs> =
  z
    .object({
      data: z.union([
        SavedAgreementsCreateManyInputSchema,
        SavedAgreementsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SavedAgreementsDeleteArgsSchema: z.ZodType<Prisma.SavedAgreementsDeleteArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      where: SavedAgreementsWhereUniqueInputSchema,
    })
    .strict();

export const SavedAgreementsUpdateArgsSchema: z.ZodType<Prisma.SavedAgreementsUpdateArgs> =
  z
    .object({
      select: SavedAgreementsSelectSchema.optional(),
      data: z.union([
        SavedAgreementsUpdateInputSchema,
        SavedAgreementsUncheckedUpdateInputSchema,
      ]),
      where: SavedAgreementsWhereUniqueInputSchema,
    })
    .strict();

export const SavedAgreementsUpdateManyArgsSchema: z.ZodType<Prisma.SavedAgreementsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SavedAgreementsUpdateManyMutationInputSchema,
        SavedAgreementsUncheckedUpdateManyInputSchema,
      ]),
      where: SavedAgreementsWhereInputSchema.optional(),
    })
    .strict();

export const SavedAgreementsDeleteManyArgsSchema: z.ZodType<Prisma.SavedAgreementsDeleteManyArgs> =
  z
    .object({
      where: SavedAgreementsWhereInputSchema.optional(),
    })
    .strict();

export const UserMetaCreateArgsSchema: z.ZodType<Prisma.UserMetaCreateArgs> = z
  .object({
    select: UserMetaSelectSchema.optional(),
    data: z.union([
      UserMetaCreateInputSchema,
      UserMetaUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const UserMetaUpsertArgsSchema: z.ZodType<Prisma.UserMetaUpsertArgs> = z
  .object({
    select: UserMetaSelectSchema.optional(),
    where: UserMetaWhereUniqueInputSchema,
    create: z.union([
      UserMetaCreateInputSchema,
      UserMetaUncheckedCreateInputSchema,
    ]),
    update: z.union([
      UserMetaUpdateInputSchema,
      UserMetaUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const UserMetaCreateManyArgsSchema: z.ZodType<Prisma.UserMetaCreateManyArgs> =
  z
    .object({
      data: z.union([
        UserMetaCreateManyInputSchema,
        UserMetaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserMetaDeleteArgsSchema: z.ZodType<Prisma.UserMetaDeleteArgs> = z
  .object({
    select: UserMetaSelectSchema.optional(),
    where: UserMetaWhereUniqueInputSchema,
  })
  .strict();

export const UserMetaUpdateArgsSchema: z.ZodType<Prisma.UserMetaUpdateArgs> = z
  .object({
    select: UserMetaSelectSchema.optional(),
    data: z.union([
      UserMetaUpdateInputSchema,
      UserMetaUncheckedUpdateInputSchema,
    ]),
    where: UserMetaWhereUniqueInputSchema,
  })
  .strict();

export const UserMetaUpdateManyArgsSchema: z.ZodType<Prisma.UserMetaUpdateManyArgs> =
  z
    .object({
      data: z.union([
        UserMetaUpdateManyMutationInputSchema,
        UserMetaUncheckedUpdateManyInputSchema,
      ]),
      where: UserMetaWhereInputSchema.optional(),
    })
    .strict();

export const UserMetaDeleteManyArgsSchema: z.ZodType<Prisma.UserMetaDeleteManyArgs> =
  z
    .object({
      where: UserMetaWhereInputSchema.optional(),
    })
    .strict();

export const BusinessProfileCreateArgsSchema: z.ZodType<Prisma.BusinessProfileCreateArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      data: z.union([
        BusinessProfileCreateInputSchema,
        BusinessProfileUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const BusinessProfileUpsertArgsSchema: z.ZodType<Prisma.BusinessProfileUpsertArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      where: BusinessProfileWhereUniqueInputSchema,
      create: z.union([
        BusinessProfileCreateInputSchema,
        BusinessProfileUncheckedCreateInputSchema,
      ]),
      update: z.union([
        BusinessProfileUpdateInputSchema,
        BusinessProfileUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const BusinessProfileCreateManyArgsSchema: z.ZodType<Prisma.BusinessProfileCreateManyArgs> =
  z
    .object({
      data: z.union([
        BusinessProfileCreateManyInputSchema,
        BusinessProfileCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const BusinessProfileDeleteArgsSchema: z.ZodType<Prisma.BusinessProfileDeleteArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      where: BusinessProfileWhereUniqueInputSchema,
    })
    .strict();

export const BusinessProfileUpdateArgsSchema: z.ZodType<Prisma.BusinessProfileUpdateArgs> =
  z
    .object({
      select: BusinessProfileSelectSchema.optional(),
      data: z.union([
        BusinessProfileUpdateInputSchema,
        BusinessProfileUncheckedUpdateInputSchema,
      ]),
      where: BusinessProfileWhereUniqueInputSchema,
    })
    .strict();

export const BusinessProfileUpdateManyArgsSchema: z.ZodType<Prisma.BusinessProfileUpdateManyArgs> =
  z
    .object({
      data: z.union([
        BusinessProfileUpdateManyMutationInputSchema,
        BusinessProfileUncheckedUpdateManyInputSchema,
      ]),
      where: BusinessProfileWhereInputSchema.optional(),
    })
    .strict();

export const BusinessProfileDeleteManyArgsSchema: z.ZodType<Prisma.BusinessProfileDeleteManyArgs> =
  z
    .object({
      where: BusinessProfileWhereInputSchema.optional(),
    })
    .strict();

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    data: z.union([
      ProductCreateInputSchema,
      ProductUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereUniqueInputSchema,
    create: z.union([
      ProductCreateInputSchema,
      ProductUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ProductUpdateInputSchema,
      ProductUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> =
  z
    .object({
      data: z.union([
        ProductCreateManyInputSchema,
        ProductCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereUniqueInputSchema,
  })
  .strict();

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    data: z.union([
      ProductUpdateInputSchema,
      ProductUncheckedUpdateInputSchema,
    ]),
    where: ProductWhereUniqueInputSchema,
  })
  .strict();

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ProductUpdateManyMutationInputSchema,
        ProductUncheckedUpdateManyInputSchema,
      ]),
      where: ProductWhereInputSchema.optional(),
    })
    .strict();

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> =
  z
    .object({
      where: ProductWhereInputSchema.optional(),
    })
    .strict();

export const PricesCreateArgsSchema: z.ZodType<Prisma.PricesCreateArgs> = z
  .object({
    select: PricesSelectSchema.optional(),
    include: PricesIncludeSchema.optional(),
    data: z.union([PricesCreateInputSchema, PricesUncheckedCreateInputSchema]),
  })
  .strict();

export const PricesUpsertArgsSchema: z.ZodType<Prisma.PricesUpsertArgs> = z
  .object({
    select: PricesSelectSchema.optional(),
    include: PricesIncludeSchema.optional(),
    where: PricesWhereUniqueInputSchema,
    create: z.union([
      PricesCreateInputSchema,
      PricesUncheckedCreateInputSchema,
    ]),
    update: z.union([
      PricesUpdateInputSchema,
      PricesUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const PricesCreateManyArgsSchema: z.ZodType<Prisma.PricesCreateManyArgs> =
  z
    .object({
      data: z.union([
        PricesCreateManyInputSchema,
        PricesCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PricesDeleteArgsSchema: z.ZodType<Prisma.PricesDeleteArgs> = z
  .object({
    select: PricesSelectSchema.optional(),
    include: PricesIncludeSchema.optional(),
    where: PricesWhereUniqueInputSchema,
  })
  .strict();

export const PricesUpdateArgsSchema: z.ZodType<Prisma.PricesUpdateArgs> = z
  .object({
    select: PricesSelectSchema.optional(),
    include: PricesIncludeSchema.optional(),
    data: z.union([PricesUpdateInputSchema, PricesUncheckedUpdateInputSchema]),
    where: PricesWhereUniqueInputSchema,
  })
  .strict();

export const PricesUpdateManyArgsSchema: z.ZodType<Prisma.PricesUpdateManyArgs> =
  z
    .object({
      data: z.union([
        PricesUpdateManyMutationInputSchema,
        PricesUncheckedUpdateManyInputSchema,
      ]),
      where: PricesWhereInputSchema.optional(),
    })
    .strict();

export const PricesDeleteManyArgsSchema: z.ZodType<Prisma.PricesDeleteManyArgs> =
  z
    .object({
      where: PricesWhereInputSchema.optional(),
    })
    .strict();

export const SubscriptionCreateArgsSchema: z.ZodType<Prisma.SubscriptionCreateArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      data: z.union([
        SubscriptionCreateInputSchema,
        SubscriptionUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const SubscriptionUpsertArgsSchema: z.ZodType<Prisma.SubscriptionUpsertArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      where: SubscriptionWhereUniqueInputSchema,
      create: z.union([
        SubscriptionCreateInputSchema,
        SubscriptionUncheckedCreateInputSchema,
      ]),
      update: z.union([
        SubscriptionUpdateInputSchema,
        SubscriptionUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const SubscriptionCreateManyArgsSchema: z.ZodType<Prisma.SubscriptionCreateManyArgs> =
  z
    .object({
      data: z.union([
        SubscriptionCreateManyInputSchema,
        SubscriptionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SubscriptionDeleteArgsSchema: z.ZodType<Prisma.SubscriptionDeleteArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      where: SubscriptionWhereUniqueInputSchema,
    })
    .strict();

export const SubscriptionUpdateArgsSchema: z.ZodType<Prisma.SubscriptionUpdateArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      data: z.union([
        SubscriptionUpdateInputSchema,
        SubscriptionUncheckedUpdateInputSchema,
      ]),
      where: SubscriptionWhereUniqueInputSchema,
    })
    .strict();

export const SubscriptionUpdateManyArgsSchema: z.ZodType<Prisma.SubscriptionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SubscriptionUpdateManyMutationInputSchema,
        SubscriptionUncheckedUpdateManyInputSchema,
      ]),
      where: SubscriptionWhereInputSchema.optional(),
    })
    .strict();

export const SubscriptionDeleteManyArgsSchema: z.ZodType<Prisma.SubscriptionDeleteManyArgs> =
  z
    .object({
      where: SubscriptionWhereInputSchema.optional(),
    })
    .strict();

export const CustomerCreateArgsSchema: z.ZodType<Prisma.CustomerCreateArgs> = z
  .object({
    select: CustomerSelectSchema.optional(),
    data: z.union([
      CustomerCreateInputSchema,
      CustomerUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const CustomerUpsertArgsSchema: z.ZodType<Prisma.CustomerUpsertArgs> = z
  .object({
    select: CustomerSelectSchema.optional(),
    where: CustomerWhereUniqueInputSchema,
    create: z.union([
      CustomerCreateInputSchema,
      CustomerUncheckedCreateInputSchema,
    ]),
    update: z.union([
      CustomerUpdateInputSchema,
      CustomerUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const CustomerCreateManyArgsSchema: z.ZodType<Prisma.CustomerCreateManyArgs> =
  z
    .object({
      data: z.union([
        CustomerCreateManyInputSchema,
        CustomerCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const CustomerDeleteArgsSchema: z.ZodType<Prisma.CustomerDeleteArgs> = z
  .object({
    select: CustomerSelectSchema.optional(),
    where: CustomerWhereUniqueInputSchema,
  })
  .strict();

export const CustomerUpdateArgsSchema: z.ZodType<Prisma.CustomerUpdateArgs> = z
  .object({
    select: CustomerSelectSchema.optional(),
    data: z.union([
      CustomerUpdateInputSchema,
      CustomerUncheckedUpdateInputSchema,
    ]),
    where: CustomerWhereUniqueInputSchema,
  })
  .strict();

export const CustomerUpdateManyArgsSchema: z.ZodType<Prisma.CustomerUpdateManyArgs> =
  z
    .object({
      data: z.union([
        CustomerUpdateManyMutationInputSchema,
        CustomerUncheckedUpdateManyInputSchema,
      ]),
      where: CustomerWhereInputSchema.optional(),
    })
    .strict();

export const CustomerDeleteManyArgsSchema: z.ZodType<Prisma.CustomerDeleteManyArgs> =
  z
    .object({
      where: CustomerWhereInputSchema.optional(),
    })
    .strict();

export const OptionsCreateArgsSchema: z.ZodType<Prisma.OptionsCreateArgs> = z
  .object({
    select: OptionsSelectSchema.optional(),
    data: z.union([
      OptionsCreateInputSchema,
      OptionsUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const OptionsUpsertArgsSchema: z.ZodType<Prisma.OptionsUpsertArgs> = z
  .object({
    select: OptionsSelectSchema.optional(),
    where: OptionsWhereUniqueInputSchema,
    create: z.union([
      OptionsCreateInputSchema,
      OptionsUncheckedCreateInputSchema,
    ]),
    update: z.union([
      OptionsUpdateInputSchema,
      OptionsUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const OptionsCreateManyArgsSchema: z.ZodType<Prisma.OptionsCreateManyArgs> =
  z
    .object({
      data: z.union([
        OptionsCreateManyInputSchema,
        OptionsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const OptionsDeleteArgsSchema: z.ZodType<Prisma.OptionsDeleteArgs> = z
  .object({
    select: OptionsSelectSchema.optional(),
    where: OptionsWhereUniqueInputSchema,
  })
  .strict();

export const OptionsUpdateArgsSchema: z.ZodType<Prisma.OptionsUpdateArgs> = z
  .object({
    select: OptionsSelectSchema.optional(),
    data: z.union([
      OptionsUpdateInputSchema,
      OptionsUncheckedUpdateInputSchema,
    ]),
    where: OptionsWhereUniqueInputSchema,
  })
  .strict();

export const OptionsUpdateManyArgsSchema: z.ZodType<Prisma.OptionsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        OptionsUpdateManyMutationInputSchema,
        OptionsUncheckedUpdateManyInputSchema,
      ]),
      where: OptionsWhereInputSchema.optional(),
    })
    .strict();

export const OptionsDeleteManyArgsSchema: z.ZodType<Prisma.OptionsDeleteManyArgs> =
  z
    .object({
      where: OptionsWhereInputSchema.optional(),
    })
    .strict();

export const TermsOfServiceCreateArgsSchema: z.ZodType<Prisma.TermsOfServiceCreateArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      data: z.union([
        TermsOfServiceCreateInputSchema,
        TermsOfServiceUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const TermsOfServiceUpsertArgsSchema: z.ZodType<Prisma.TermsOfServiceUpsertArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      where: TermsOfServiceWhereUniqueInputSchema,
      create: z.union([
        TermsOfServiceCreateInputSchema,
        TermsOfServiceUncheckedCreateInputSchema,
      ]),
      update: z.union([
        TermsOfServiceUpdateInputSchema,
        TermsOfServiceUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const TermsOfServiceCreateManyArgsSchema: z.ZodType<Prisma.TermsOfServiceCreateManyArgs> =
  z
    .object({
      data: z.union([
        TermsOfServiceCreateManyInputSchema,
        TermsOfServiceCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const TermsOfServiceDeleteArgsSchema: z.ZodType<Prisma.TermsOfServiceDeleteArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      where: TermsOfServiceWhereUniqueInputSchema,
    })
    .strict();

export const TermsOfServiceUpdateArgsSchema: z.ZodType<Prisma.TermsOfServiceUpdateArgs> =
  z
    .object({
      select: TermsOfServiceSelectSchema.optional(),
      include: TermsOfServiceIncludeSchema.optional(),
      data: z.union([
        TermsOfServiceUpdateInputSchema,
        TermsOfServiceUncheckedUpdateInputSchema,
      ]),
      where: TermsOfServiceWhereUniqueInputSchema,
    })
    .strict();

export const TermsOfServiceUpdateManyArgsSchema: z.ZodType<Prisma.TermsOfServiceUpdateManyArgs> =
  z
    .object({
      data: z.union([
        TermsOfServiceUpdateManyMutationInputSchema,
        TermsOfServiceUncheckedUpdateManyInputSchema,
      ]),
      where: TermsOfServiceWhereInputSchema.optional(),
    })
    .strict();

export const TermsOfServiceDeleteManyArgsSchema: z.ZodType<Prisma.TermsOfServiceDeleteManyArgs> =
  z
    .object({
      where: TermsOfServiceWhereInputSchema.optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCreateArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCreateArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      data: z.union([
        UserTermsOfServiceAcceptanceCreateInputSchema,
        UserTermsOfServiceAcceptanceUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpsertArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpsertArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      where: UserTermsOfServiceAcceptanceWhereUniqueInputSchema,
      create: z.union([
        UserTermsOfServiceAcceptanceCreateInputSchema,
        UserTermsOfServiceAcceptanceUncheckedCreateInputSchema,
      ]),
      update: z.union([
        UserTermsOfServiceAcceptanceUpdateInputSchema,
        UserTermsOfServiceAcceptanceUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const UserTermsOfServiceAcceptanceCreateManyArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceCreateManyArgs> =
  z
    .object({
      data: z.union([
        UserTermsOfServiceAcceptanceCreateManyInputSchema,
        UserTermsOfServiceAcceptanceCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceDeleteArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceDeleteArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      where: UserTermsOfServiceAcceptanceWhereUniqueInputSchema,
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpdateArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpdateArgs> =
  z
    .object({
      select: UserTermsOfServiceAcceptanceSelectSchema.optional(),
      include: UserTermsOfServiceAcceptanceIncludeSchema.optional(),
      data: z.union([
        UserTermsOfServiceAcceptanceUpdateInputSchema,
        UserTermsOfServiceAcceptanceUncheckedUpdateInputSchema,
      ]),
      where: UserTermsOfServiceAcceptanceWhereUniqueInputSchema,
    })
    .strict();

export const UserTermsOfServiceAcceptanceUpdateManyArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceUpdateManyArgs> =
  z
    .object({
      data: z.union([
        UserTermsOfServiceAcceptanceUpdateManyMutationInputSchema,
        UserTermsOfServiceAcceptanceUncheckedUpdateManyInputSchema,
      ]),
      where: UserTermsOfServiceAcceptanceWhereInputSchema.optional(),
    })
    .strict();

export const UserTermsOfServiceAcceptanceDeleteManyArgsSchema: z.ZodType<Prisma.UserTermsOfServiceAcceptanceDeleteManyArgs> =
  z
    .object({
      where: UserTermsOfServiceAcceptanceWhereInputSchema.optional(),
    })
    .strict();

export const AuditQuestionsCreateArgsSchema: z.ZodType<Prisma.AuditQuestionsCreateArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      data: z.union([
        AuditQuestionsCreateInputSchema,
        AuditQuestionsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const AuditQuestionsUpsertArgsSchema: z.ZodType<Prisma.AuditQuestionsUpsertArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      where: AuditQuestionsWhereUniqueInputSchema,
      create: z.union([
        AuditQuestionsCreateInputSchema,
        AuditQuestionsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        AuditQuestionsUpdateInputSchema,
        AuditQuestionsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const AuditQuestionsCreateManyArgsSchema: z.ZodType<Prisma.AuditQuestionsCreateManyArgs> =
  z
    .object({
      data: z.union([
        AuditQuestionsCreateManyInputSchema,
        AuditQuestionsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AuditQuestionsDeleteArgsSchema: z.ZodType<Prisma.AuditQuestionsDeleteArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      where: AuditQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionsUpdateArgsSchema: z.ZodType<Prisma.AuditQuestionsUpdateArgs> =
  z
    .object({
      select: AuditQuestionsSelectSchema.optional(),
      include: AuditQuestionsIncludeSchema.optional(),
      data: z.union([
        AuditQuestionsUpdateInputSchema,
        AuditQuestionsUncheckedUpdateInputSchema,
      ]),
      where: AuditQuestionsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionsUpdateManyArgsSchema: z.ZodType<Prisma.AuditQuestionsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AuditQuestionsUpdateManyMutationInputSchema,
        AuditQuestionsUncheckedUpdateManyInputSchema,
      ]),
      where: AuditQuestionsWhereInputSchema.optional(),
    })
    .strict();

export const AuditQuestionsDeleteManyArgsSchema: z.ZodType<Prisma.AuditQuestionsDeleteManyArgs> =
  z
    .object({
      where: AuditQuestionsWhereInputSchema.optional(),
    })
    .strict();

export const AuditQuestionConditionalsCreateArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsCreateArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      data: z.union([
        AuditQuestionConditionalsCreateInputSchema,
        AuditQuestionConditionalsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const AuditQuestionConditionalsUpsertArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpsertArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      where: AuditQuestionConditionalsWhereUniqueInputSchema,
      create: z.union([
        AuditQuestionConditionalsCreateInputSchema,
        AuditQuestionConditionalsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        AuditQuestionConditionalsUpdateInputSchema,
        AuditQuestionConditionalsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const AuditQuestionConditionalsCreateManyArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsCreateManyArgs> =
  z
    .object({
      data: z.union([
        AuditQuestionConditionalsCreateManyInputSchema,
        AuditQuestionConditionalsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AuditQuestionConditionalsDeleteArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsDeleteArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      where: AuditQuestionConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionConditionalsUpdateArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpdateArgs> =
  z
    .object({
      select: AuditQuestionConditionalsSelectSchema.optional(),
      include: AuditQuestionConditionalsIncludeSchema.optional(),
      data: z.union([
        AuditQuestionConditionalsUpdateInputSchema,
        AuditQuestionConditionalsUncheckedUpdateInputSchema,
      ]),
      where: AuditQuestionConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionConditionalsUpdateManyArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AuditQuestionConditionalsUpdateManyMutationInputSchema,
        AuditQuestionConditionalsUncheckedUpdateManyInputSchema,
      ]),
      where: AuditQuestionConditionalsWhereInputSchema.optional(),
    })
    .strict();

export const AuditQuestionConditionalsDeleteManyArgsSchema: z.ZodType<Prisma.AuditQuestionConditionalsDeleteManyArgs> =
  z
    .object({
      where: AuditQuestionConditionalsWhereInputSchema.optional(),
    })
    .strict();

export const AuditQuestionSetsCreateArgsSchema: z.ZodType<Prisma.AuditQuestionSetsCreateArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      data: z.union([
        AuditQuestionSetsCreateInputSchema,
        AuditQuestionSetsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const AuditQuestionSetsUpsertArgsSchema: z.ZodType<Prisma.AuditQuestionSetsUpsertArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      where: AuditQuestionSetsWhereUniqueInputSchema,
      create: z.union([
        AuditQuestionSetsCreateInputSchema,
        AuditQuestionSetsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        AuditQuestionSetsUpdateInputSchema,
        AuditQuestionSetsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const AuditQuestionSetsCreateManyArgsSchema: z.ZodType<Prisma.AuditQuestionSetsCreateManyArgs> =
  z
    .object({
      data: z.union([
        AuditQuestionSetsCreateManyInputSchema,
        AuditQuestionSetsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AuditQuestionSetsDeleteArgsSchema: z.ZodType<Prisma.AuditQuestionSetsDeleteArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      where: AuditQuestionSetsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionSetsUpdateArgsSchema: z.ZodType<Prisma.AuditQuestionSetsUpdateArgs> =
  z
    .object({
      select: AuditQuestionSetsSelectSchema.optional(),
      include: AuditQuestionSetsIncludeSchema.optional(),
      data: z.union([
        AuditQuestionSetsUpdateInputSchema,
        AuditQuestionSetsUncheckedUpdateInputSchema,
      ]),
      where: AuditQuestionSetsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionSetsUpdateManyArgsSchema: z.ZodType<Prisma.AuditQuestionSetsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AuditQuestionSetsUpdateManyMutationInputSchema,
        AuditQuestionSetsUncheckedUpdateManyInputSchema,
      ]),
      where: AuditQuestionSetsWhereInputSchema.optional(),
    })
    .strict();

export const AuditQuestionSetsDeleteManyArgsSchema: z.ZodType<Prisma.AuditQuestionSetsDeleteManyArgs> =
  z
    .object({
      where: AuditQuestionSetsWhereInputSchema.optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsCreateArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCreateArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      data: z.union([
        AuditQuestionSetConditionalsCreateInputSchema,
        AuditQuestionSetConditionalsUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const AuditQuestionSetConditionalsUpsertArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpsertArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      where: AuditQuestionSetConditionalsWhereUniqueInputSchema,
      create: z.union([
        AuditQuestionSetConditionalsCreateInputSchema,
        AuditQuestionSetConditionalsUncheckedCreateInputSchema,
      ]),
      update: z.union([
        AuditQuestionSetConditionalsUpdateInputSchema,
        AuditQuestionSetConditionalsUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const AuditQuestionSetConditionalsCreateManyArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsCreateManyArgs> =
  z
    .object({
      data: z.union([
        AuditQuestionSetConditionalsCreateManyInputSchema,
        AuditQuestionSetConditionalsCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsDeleteArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsDeleteArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      where: AuditQuestionSetConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionSetConditionalsUpdateArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpdateArgs> =
  z
    .object({
      select: AuditQuestionSetConditionalsSelectSchema.optional(),
      include: AuditQuestionSetConditionalsIncludeSchema.optional(),
      data: z.union([
        AuditQuestionSetConditionalsUpdateInputSchema,
        AuditQuestionSetConditionalsUncheckedUpdateInputSchema,
      ]),
      where: AuditQuestionSetConditionalsWhereUniqueInputSchema,
    })
    .strict();

export const AuditQuestionSetConditionalsUpdateManyArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AuditQuestionSetConditionalsUpdateManyMutationInputSchema,
        AuditQuestionSetConditionalsUncheckedUpdateManyInputSchema,
      ]),
      where: AuditQuestionSetConditionalsWhereInputSchema.optional(),
    })
    .strict();

export const AuditQuestionSetConditionalsDeleteManyArgsSchema: z.ZodType<Prisma.AuditQuestionSetConditionalsDeleteManyArgs> =
  z
    .object({
      where: AuditQuestionSetConditionalsWhereInputSchema.optional(),
    })
    .strict();
