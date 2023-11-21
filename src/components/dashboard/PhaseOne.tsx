import StylizedLink from "../ui/Link";
import Link from "next/link";
import { External } from "~/components/icons";

export const PhaseOne = () => {

  return (
    <div className="phase-one">
      <h1 className="w-full justify-between flex">
        <span style={{ fontSize: "20pt", fontFamily: "Lato,sans-serif", color: "#000000" }}>
          <strong>Phase One</strong>
        </span>
        <span className="text-lg tracking-widest ">
          June 21-July 9
        </span>
      </h1>

      <div className="my-4 h-[2px] w-full bg-light_purple-500 mb-5"></div>

      <p>
        <span>
          <strong>Objective #1: </strong>
          Attend orientation call <strong>( June 21st )</strong> or watch orientation video <em>( 1 hour )</em>
        </span>
      </p>

      <p style={{ marginLeft: "48px" }}>
        <span>
          <Link target="_blank" href="https://vimeo.com/838433219/89f5586a9d">Click here to watch the replay.</Link> When you&apos;re done, click the button below and complete the confirmation form.
        </span>
      </p>

      <div className="flex h-min w-fit m-auto mb-5"><StylizedLink className="px-10" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfyT0-_ea34UMjo2Qp8i5gMvRBEya1Juof-Of5GuBMB60OWcA/viewform"><External className="fill-white w-4" />Complete Confirmation Form</StylizedLink></div>

      <p>
        <span>
          <strong>Objective #2: </strong>
          Create Account
          <em>(15 minutes)</em>
        </span>
      </p>

      <p style={{ marginLeft: "48px" }}>
        <span>
          To gain access to create your account, you must first attend or watch the orientation call to receive your instructions.
        </span>
      </p>

      <p>
        <span>
          <strong>Objective #3: </strong>
          Complete Business Survey
          <em>(15 minutes)</em>
        </span>
      </p>

      <p style={{ marginLeft: "48px" }}>
        <span>
          To complete your business survey, click the button below:
        </span>
      </p>

      <div className="flex h-min w-fit m-auto mb-5"><StylizedLink className="px-10" target="_blank" href="https://forms.gle/ouCpJBxoTdmCMpEE9"><External className="fill-white w-4" />Complete Business Survey</StylizedLink></div>

      <p>
        <span>
          <strong>Objective #4: </strong>
          Submit Minimum of 5 Questions for Chat Legal Development <em>( 20 minutes )</em>
        </span>
      </p>

      <p style={{ marginLeft: "48px" }}>
        <span>
          ChatLegal&trade; will become one of our most powerful core features in Plainly Legal&trade;.
          Before we can start development, we first need to create a large database of legal questions that our users might ask.
        </span>
      </p>

      <p style={{ marginLeft: "48px" }}>
        <span>
          To complete Phase 1, we require you to submit a minimum of 5 qualifying* legal questions for us to use for this database.
          Each qualifying question will also earn you a point, so you can submit as many as you want.
        </span>
      </p>

      <p style={{ marginLeft: "48px" }}>
        <span>
          <strong>Click the button below to submit your question. You’ll submit ONE question at a time. After you submit a question, there will be a link you can click to submit another one.</strong>
        </span>
      </p>

      <div className="flex h-min w-fit m-auto mb-5"><StylizedLink className="px-10" target="_blank" href="https://forms.gle/dDA2RfDHDXSgdsxt6"><External className="fill-white w-4" />Submit ChatLegal™ Questions</StylizedLink></div>

      <p style={{ marginLeft: "48px" }}>
        <span>
          <em>*Qualifying legal questions are questions about the legal stuff specifically pertaining to your online business.
          If the question isn&apos;t directly related to the legal aspects of your online business, it will not qualify as a valid question.</em>
        </span>
      </p>
    </div>
  );
};

export default PhaseOne;
