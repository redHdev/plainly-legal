
import type { UseFormSetValue, Control } from "react-hook-form/dist/types/form";
import { type BusinessProfileFormValues } from "./BusinessQuestions";
import '~/styles/prefillDisclaimer.css';
import Disclaimer from "./SingleDisclaimer";

interface Props {
  data: BusinessProfileFormValues
  control: Control<BusinessProfileFormValues>
  setValue: UseFormSetValue<BusinessProfileFormValues>
}


export const Disclaimers = ({ data, control, setValue }: Props) => {

  //Create a content editable div with "The Company" not editable, but the rest of the text is editable and can be changed by the user
  return (
    <>

      {data.disclaimersIncluded && data.disclaimersIncluded.includes("disclaimerLegal") && (
        <Disclaimer
          control={control}
          setValue={setValue}
          data={data}
          name="disclaimerLegal"
          label="Not Legal Advice"
          nonEditable="The Company"
        />
      )}

      {data.disclaimersIncluded && data.disclaimersIncluded.includes("disclaimerMedical") && (
        <Disclaimer
          control={control}
          setValue={setValue}
          data={data}
          name="disclaimerMedical"
          label="Not Medical Advice"
          nonEditable="The Company"
        />
      )}

      {data.disclaimersIncluded && data.disclaimersIncluded.includes("disclaimerFitness") && (
        <Disclaimer
          control={control}
          setValue={setValue}
          data={data}
          name="disclaimerFitness"
          label="Fitness Warning & Disclaimer"
          nonEditable="The Company"
        />
      )}

      {data.disclaimersIncluded && data.disclaimersIncluded.includes("disclaimerFinancial") && (
        <Disclaimer
          control={control}
          setValue={setValue}
          data={data}
          name="disclaimerFinancial"
          label="Not Investment or Financial Advice"
          nonEditable="The Company"
        />
      )}

      {data.disclaimersIncluded && data.disclaimersIncluded.includes("disclaimerTax") && (
        <Disclaimer
          control={control}
          setValue={setValue}
          data={data}
          name="disclaimerTax"
          label="Not Tax Advice"
          nonEditable="The Company"
        />
      )}

    </>
  );

};

export default Disclaimers;
