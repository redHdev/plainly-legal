import type { AgreementData, liveFormData } from "~/types/forms";

/**
 * Replaces variables in a given text with their corresponding values.
 * @param {string} text - The text to replace variables in.
 * @param {AgreementData} data - The data containing the variables and their values.
 * @param {boolean} replacementMode - The mode to replace the text in. 1 = strict ( throw error if variable not found ), 2 = underline ( replace with underline if variable not found ), 3 = remove ( replace variable with empty string if not found )
 * @returns {string} The text with the variables replaced with their values.
 */
export function replaceAgreementText(text: string, data: AgreementData, replacementMode = 2, container = true) {

  //Parse all the variables that may have fillable data to the server
  const agreementFill = { ...data.agreement_variables, ...data.data_questions, ...data.data_clause_answers };

  //replace all the variables in the text that are between { and } with an underline the same length as the variable
  text = replaceText(text, agreementFill, replacementMode, container);

  return text;

}

/**
 * Replaces variables in a given text with their corresponding values. Key value pairs with a pipe seperator "key|value" will be replaced with the value.
 * @param {string} text - The text to replace variables in.
 * @param {liveFormData} data - The data containing the variables and their values.
 * @param {boolean} replacementMode - The mode to replace the text in.
 * 1 = strict ( throw error if variable not found )
 * 2 = underline ( replace with underline if variable not found )
 * 3 = remove ( replace variable with empty string if not found )
 * @returns {string} The text with the variables replaced with their values.
 */
export default function replaceText(text: string, data: liveFormData, replacementMode = 1, container = false) {

  //Check if error mode is 1 2 or 3
  if(replacementMode < 1 || replacementMode > 3) throw new Error('Error mode must be 1, 2 or 3 for replace text');

  let strict = true;
  let underline = false;

  if(replacementMode === 2){
    strict = false;
    underline = true;
  } else if(replacementMode === 3){
    strict = false;
    underline = false;
  }
    

  //replace all the variables in the text that are between { and } with an underline the same length as the variable
  const variables = text.match(/{(.*?)}/g);
  if (variables) {
    variables.forEach((variable) => {

      //Check if it's in the formData
      const variableName = variable.replace('{', '').replace('}', '');
      const variableValue = data[variableName];
      let variableHtml = "";

      //check if variable value is a string or a number
      if ( ( typeof variableValue === 'string' || typeof variableValue === 'number' ) && variableValue !== '') {
        variableHtml = variableValue.toString().split('|')[1] ?? variableValue.toString();
      } else {
        if(strict) throw new Error(`Variable ${variableName} is not a string or number in the data provided and is needed to replace this text: ${text}`);

        if(underline) variableHtml = '_'.repeat(variable.length - 2);
      }

      
      if(underline){
        text = text.replace(variable, `<span class="clause-variable underline">${variableHtml}</span>`);
      }

      if(!underline && container){
        text = text.replace(variable, `<span class="clause-variable">${variableHtml}</span>`);
      }

    });
  }

  return text;

}



