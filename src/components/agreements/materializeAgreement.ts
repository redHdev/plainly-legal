//Complete agreement
import type { AgreementData } from "~/types/forms";
import { replaceAgreementText } from "~/utils/replaceText";


export const materializeAgreement = (agreement: AgreementData) => {
    let completedClauses: string[] | null = null;

    // Run through all the clauses and replace the ones that have data_contract_edits with the edited version
    const clauses = agreement.data_clauses.map(clause => 
        agreement.data_contract_edits[clause.id] !== undefined ? agreement.data_contract_edits[clause.id] : clause.text
    ) as string[];


    try {
        // for each clause, eplace the agreement data with replaceText if it is not null check if it is not null before running
        completedClauses = clauses.map(clause => clause === null ? clause : replaceAgreementText(clause, agreement, 2, true));
    } catch (error) {
        //Check if the code exists
        throw new Error(`Sorry, there was an error processing the agreement. Please try again later. Agreement: ${agreement.id}`);

    }

    //Remove all <span> and </span> tags from the completed clauses
    completedClauses = completedClauses.map(clause => clause === null ? clause : clause.replace(/<\/?span[^>]*>/g, ''));

    // join the clauses together with a new line html tag
    const text = completedClauses.map(clause => clause === null ? '' : `<p>${clause}</p>`).join('');

    return { clauses: completedClauses, text }

}
