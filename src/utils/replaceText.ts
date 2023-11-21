import type { AgreementData, liveFormData } from "~/types/forms";

/**
 * Replaces variables in a given text with their corresponding values.
 * @param {string} text - The text to replace variables in.
 * @param {AgreementData} data - The data containing the variables and their values.
 * @param {number} replacementMode - Controls the replacement behavior mode when a variable is not found in data.
 * Modes:
 * - 1: strict (throw error if variable not found)
 * - 2: underline (replace with underline if variable not found)
 * - 3: remove (replace variable with empty string if not found)
 * - 4: show variable (show the variable name if not found)
 * @param {boolean} container - Optional parameter to control if the replaced text should be enclosed in a span container.
 * @param {string[]} additionalContainerClasses - Optional parameter to add additional classes to the container.
 * @returns {string} The text with the variables replaced with their values.
 */
export function replaceAgreementText(
  text: string,
  data: AgreementData,
  replacementMode = 2,
  container = true,
  additionalData?: object,
  additionalContainerClasses?: string[],
) {
  //Parse all the variables that may have fillable data to the server
  const agreementFill = {
    ...data.agreement_variables,
    ...data.data_questions,
    ...data.data_clause_answers,
    ...data.data_clause_calculations,
    ...data.globalText,
    ...additionalData,
  };

  //replace all the variables in the text that are between { and } with an underline the same length as the variable
  text = replaceText(
    text,
    agreementFill,
    replacementMode,
    container,
    additionalContainerClasses,
  );

  return text;
}

/**
 * Substitute variables in a text with their corresponding values from provided data.
 * If a variable is not found in the data, the behavior is controlled by the replacementMode parameter.
 * @param {string} text - The text containing variables to replace.
 * @param {liveFormData} data - The data containing variable-value pairs.
 * @param {number} replacementMode - Controls the replacement behavior mode when a variable is not found in data.
 * Modes:
 * - 1: strict (throw error if variable not found)
 * - 2: underline (replace with underline if variable not found)
 * - 3: remove (replace variable with empty string if not found)
 * - 4: show variable (show the variable name if not found)
 * @param {boolean} container - Optional parameter to control if the replaced text should be enclosed in a span container.
 * @param {string[]} additionalContainerClasses - Optional parameter to add additional classes to the container.
 * @returns {string} The text with variables replaced with corresponding values or replaced according to the mode.
 */
export default function replaceText(
  text: string,
  data: liveFormData,
  replacementMode = 1,
  container = false,
  additionalContainerClasses?: string[],
) {
  // Validate replacementMode
  if (replacementMode < 1 || replacementMode > 4) {
    throw new Error("Invalid replacementMode. It must be 1, 2, 3 or 4.");
  }

  // Determine replacement settings based on replacementMode
  const strict = replacementMode === 1;
  const underline = replacementMode === 2;
  const showVariable = replacementMode === 4;

  // Identify all variables in the text (enclosed within {} braces)
  const variables = text.match(/{(.*?)}/g);

  // Proceed if variables are found
  if (variables) {
    variables.forEach((variable) => {
      // Extract variable name
      const variableName = variable.slice(1, -1);

      // Attempt to find variable value in provided data
      const variableValue = data[variableName];

      // Prepare replacement HTML, handling cases based on variable value and replacementMode
      let replacementHtml = "";
      if (
        variableValue &&
        (typeof variableValue === "string" || typeof variableValue === "number")
      ) {
        // Parse variable value if in 'key|value' format, else use as is
        replacementHtml =
          variableValue.toString().split("|")[1] || variableValue.toString();
      } else {
        // Handle cases when variable is not found in data according to replacementMode
        if (strict)
          throw new Error(
            `Variable ${variableName} not found in provided data. Trying to replace ${variable} in text: ${text}`,
          );
        // if (underline)replacementHtml = "_____";
        // if (underline)replacementHtml = "<span style='color: transparent;'>_</span> ";
        if (underline) replacementHtml = "&zwnj;";
        if (showVariable) replacementHtml = `{${variableName}}`;
      }

      // Enclose replacement in a span if 'container' is true, applying underline class if 'underline' is true
      if (container) {


        const clauseVariableClasses = [
          ...additionalContainerClasses ?? [],
          //Check if we have any html tags in the replacement html. if so, we know we are filling wysiwyg data and we need to take off the padding and such. Unless it's a disclaimer pre-fill
          //Check if we are over or under 10 chars, if we are over, we want to show inline spans instead so that it will page wrap nicely, if we are under 10 we want to show padding.
          replacementHtml.includes("<") && !replacementHtml.includes("wysiwyg-disclaimer") ? 'has-tags' : replacementHtml.length > 10 ? "over-10-prefill" : "under-10-prefill text-center"
        ]

        //Check if the replacement html is over or under 10 chars
        replacementHtml = `<span class="clause-variable ${clauseVariableClasses.join(" ")} text-purple-900 px-1 leading-5 font-thin">${replacementHtml}</span>`;
      }

      // Replace variable in text with the prepared replacement HTML
      text = text.replace(variable, replacementHtml);

      //Apply modifiers to the replacement html
      text = applyModifiers(text);
    });
  }

  // Return text with all replacements done
  return text;
}

/**
 * Applies Plainly Legal specific modifiers to a given text. such as <caps> that takes care of capitalization etc.
 * @param {string} htmlString - The text containing variables to replace.
 *
 * @returns {string} The text with modifiers applied.
 *
 * @example
 * applyModifiers("This is a <caps>test</caps> string");
 * returns "This is a TEST string"
 */
export function applyModifiers(htmlString: string) {
  //Replace all the <caps> tags with the capitalized version of the text inside but dont modify any tags inside
  return convertCapsContentToUpper(htmlString);
}

function convertCapsContentToUpper(input: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");

  const capsElements = Array.from(doc.querySelectorAll("caps"));
  capsElements.forEach((element) => {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
    );

    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      // Split the text by the { } pattern
      const parts = node.nodeValue!.split(/({[^}]*})/);

      // Convert only the parts that don't match the { } pattern to uppercase
      for (let i = 0; i < parts.length; i++) {
        if (!parts[i]!.startsWith("{")) {
          parts[i] = parts[i]!.toUpperCase();
        }
      }

      // Rejoin the parts and set the modified value
      node.nodeValue = parts.join("");
    }

    // Replace the <caps> element with its content
    while (element.firstChild) {
      element.parentNode!.insertBefore(element.firstChild, element);
    }
    element.parentNode!.removeChild(element);
  });

  return doc.body.innerHTML;
}

export function checkAndReplaceBraces(string: string) {
  if (string.includes("{")) {
    // return "_____";
    return "&zwnj;";
  } else {
    return string;
  }
}
