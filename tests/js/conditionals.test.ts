import { shouldRenderField } from '../../src/utils/conditionals';
import { type ContractQuestionConditionals } from "@prisma/client"; // Import Prisma client

describe('shouldRenderField', () => {
  test('should return false when termOne equals any term in termTwo', () => {
    const conditionals = [
      {
        id: '1',
        key: 27,
        operand: 'EQUALS',
        termOne: '{variable}',
        termTwo: 'opt_2 OR opt_3',
      } as ContractQuestionConditionals,
    ];
    const formData = {
      variable: 'opt_2',
    };
    expect(shouldRenderField(conditionals, formData)).toBe(false);

    formData.variable = 'opt_3';
    expect(shouldRenderField(conditionals, formData)).toBe(false);
  });

  test('should return true when termOne does not equal any term in termTwo', () => {
    const conditionals = [
      {
        id: '2',
        key: 27,
        operand: 'EQUALS',
        termOne: '{variable}',
        termTwo: 'opt_2 OR opt_3',
      } as ContractQuestionConditionals,
    ];
    const formData = {
      variable: 'opt_4',
    };
    expect(shouldRenderField(conditionals, formData)).toBe(true);
  });

  test('should return false when termOne does not equal all terms in termTwo', () => {
    const conditionals = [
      {
        id: '3',
        key: 27,
        operand: 'NOT_EQUALS',
        termOne: '{variable}',
        termTwo: 'opt_2 OR opt_3',
      } as ContractQuestionConditionals,
    ];
    const formData = {
      variable: 'opt_4',
    };
    expect(shouldRenderField(conditionals, formData)).toBe(false);
  });

  test('should return true when termOne equals any term in termTwo', () => {
    const conditionals = [
      {
        id: '4',
        key: 27,
        operand: 'NOT_EQUALS',
        termOne: '{variable}',
        termTwo: 'opt_2 OR opt_3',
      } as ContractQuestionConditionals,
    ];
    const formData = {
      variable: 'opt_2',
    };
    expect(shouldRenderField(conditionals, formData)).toBe(true);

    formData.variable = 'opt_3';
    expect(shouldRenderField(conditionals, formData)).toBe(true);
  });

  test('should return false when termOne is greater than termTwo', () => {
    const conditionals = [
      {
        id: '5',
        key: 27,
        operand: 'GREATER_THAN',
        termOne: '{variable}',
        termTwo: '10',
      } as ContractQuestionConditionals,
    ];
    const formData = {
      variable: '20',
    };
    expect(shouldRenderField(conditionals, formData)).toBe(false);
  });

  test('should return true when termOne is not greater than termTwo', () => {
    const conditionals = [
      {
        id: '6',
        key: 27,
        operand: 'GREATER_THAN',
        termOne: '{variable}',
        termTwo: '30',
      } as ContractQuestionConditionals,
    ];
    const formData = {
      variable: '20',
    };
    expect(shouldRenderField(conditionals, formData)).toBe(true);
  });

  // similar tests for "LESS_THAN", "GREATER_THAN_OR_EQUAL_TO", "LESS_THAN_OR_EQUAL_TO" even with wrong casing

  test('should return false when termOne array contains termTwo', () => {
    const conditionals = [
      {
        id: '7',
        key: 27,
        operand: 'CONTAINS',
        termOne: '{variable}',
        termTwo: 'OPT_2',
      } as ContractQuestionConditionals,
    ];
    const formData = {
      variable: ['opt_1', 'opt_2', 'opt_3'],
    };
    expect(shouldRenderField(conditionals, formData)).toBe(false);
  });

  test('should return true when termOne array does not contain termTwo', () => {
    const conditionals = [
      {
        id: '8',
        key: 27,
        operand: 'CONTAINS',
        termOne: '{variable}',
        termTwo: 'opt_4',
      } as ContractQuestionConditionals,
    ];
    const formData = {
      variable: ['opt_1', 'opt_2', 'opt_3'],
    };
    expect(shouldRenderField(conditionals, formData)).toBe(true);
  });

  test('should return true when termOne array does not exist at all', () => {
    const conditionals = [
      {
        id: '8',
        key: 232,
        operand: 'NOT_CONTAINS',
        termOne: '{variable}',
        termTwo: 'opt_4',
      } as ContractQuestionConditionals,
    ];
    const formData = {};
    expect(shouldRenderField(conditionals, formData)).toBe(true);
  });


});