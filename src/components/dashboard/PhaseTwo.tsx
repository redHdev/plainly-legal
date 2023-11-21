import StylizedLink from "../ui/Link";
import { External } from "../icons";
export const PhaseTwo = () => {
  return (
    <div className="phase-one">
      <h1 className="flex w-full justify-between">
        <span
          style={{
            fontSize: "20pt",
            fontFamily: "Lato,sans-serif",
            color: "#000000",
          }}
        >
          <strong>Phase Two</strong>
        </span>
        <span className="text-lg tracking-widest ">July 10 - TBD</span>
      </h1>

      <div className="my-4 mb-5 h-[2px] w-full bg-light_purple-500"></div>

      <p>
        <span>
          <strong>Objective #1: </strong>
          Attend or watch Feature Release Call <em>(1 hour)</em>
        </span>
      </p>

      <p className="mx-11">
        <span>
          Each phase will start with a Feature Release call. During this call,
          we will unlock the new feature for use, talk about our plans for the
          feature, answer your questions, and go over the objectives for the
          phase and Beta Program updates.
        </span>
      </p>
      <p className="mx-11">
        <span>
          <a
            href="https://vimeo.com/846040726/4c4a4a6275?share=copy"
            target="_blank"
          >
            Click here to watch the replay.
          </a>{" "}
          When you’re done, click the button below and complete the confirmation
          form.{" "}
          <strong>
            NOTE: Confirmation form does not need to be filled out if you
            attended the call live.{" "}
          </strong>
        </span>
      </p>

      <div className="m-auto mb-5 flex h-min w-fit">
        <StylizedLink
          className="px-10"
          target="_blank"
          href="https://forms.gle/395d4Npqv8P8NjAD8"
        >
          <External className="w-4 fill-white" />
          Complete Confirmation Form
        </StylizedLink>
      </div>

      <p>
        <span>
          <strong>Objective #2: </strong>
          Generate at least 5 Agreements
          <em> (45 minutes)</em>
        </span>
      </p>

      <p className="mx-11">
        <span>
          Once the Legal Doc Generator is unlocked on the main page, navigate to
          the generator area to get started generating some new agreements!
        </span>
      </p>
      <p className="mx-11">
        <span>
          You&apos;ll need to generate 5 agreements to complete this objective.
          Don&apos;t forget that you earn 1 point for every agreement you
          generate. The more unique agreements you generate, the more points
          you’ll earn.*
        </span>
      </p>
      <p className="mx-11">
        <span>
          <em>
            *We reserve the right to cap points for generating substantially the
            same agreement repeatedly.
          </em>
        </span>
      </p>

      <p>
        <span>
          <strong>Objective #3: </strong>
          Provide feedback
          <em> (15 minutes)</em>
        </span>
      </p>

      <p className="mx-11">
        <span>
          Using the feedback tab in the lower right-hand corner of your browser,
          click “Legal Doc Generator Feedback,” and fill out the form.
        </span>
      </p>
      <p className="mx-11">
        <span>
          <strong>
            ONLY do this after you&apos;ve used the feature as feedback provided
            beforehand doesn&apos;t provide us with the information we need to
            make the tool better.
          </strong>
        </span>
      </p>
      <div className="mx-11 my-6 bg-purple-900 py-6 text-white">
        <p className="mx-11 text-center">
          <span>
            <strong>IMPORTANT NOTE ON FEEDBACK</strong>
          </span>
        </p>
        <p className="mx-11">
          <span>
            To complete Objective 3, you must provide feedback on your
            experience with the Legal Doc Generator using the Legal Doc
            Generator Feedback form. Types of feedback we&apos;re looking for
            include:
            <ul>
              <li>User Experience</li>
              <li>User Interface</li>
              <li>
                Tool Tips &amp; Explanations ( e.g. what&apos;s missing, what
                needs editing, what needs to be more clearly explained, etc.)
              </li>
              <li>Intuitiveness and User-Friendliness of the Tool</li>
              <li>Things You Like</li>
              <li>Things You Dislike</li>
              <li>Improvements You&apos;d Like to See</li>
            </ul>
          </span>
        </p>
        <p className="mx-11">
          <span>
            <strong>
              <em>Need To Report a Bug, Typo, or Other Issue?</em>
            </strong>
          </span>
        </p>
        <p className="mx-11">
          <span>
            If you notice an issue with any of the generator forms, use the
            “Report An Issue” form in the feedback tab to let us know!
          </span>
        </p>
        <p className="mx-11">
          <span>
            Bug reports do not count toward Objective #3 but will earn you
            points.
          </span>
        </p>
        <p className="mx-11">
          <span>
            Types of issues you should be looking for:
            <ul>
              <li>Typos</li>
              <li>Consistency of References (e.g., Client vs. Customer)</li>
              <li>
                Formatting Issues (e.g. headings bolded, defined terms bolded,
                spacing)
              </li>
              <li>Missing Sections</li>
              <li>Empty Fields</li>
              <li>Other errors</li>
            </ul>
          </span>
        </p>
      </div>

      {/* <div className="flex h-min w-fit m-auto mb-5"><StylizedLink className="px-10" target="_blank" href="https://forms.gle/ouCpJBxoTdmCMpEE9"><External className="fill-white w-4" />Complete Business Survey</StylizedLink></div> */}

      <p>
        <span>
          <strong>Objective #4: </strong>
          Attend at least ONE Party Call <em>(1 hour)</em>
        </span>
      </p>

      <p className="mx-11">
        <span>
          We’ll be hosting multiple Party Calls during this phase. During these
          calls, attendees will be using the legal doc generator together to
          test a single Agreement (or set of Agreements).
        </span>
      </p>
      <p className="mx-11">
        <span>
          The purpose of these calls is to give us the chance to quickly find
          any issues with the Doc Generator.{" "}
          <strong>
            NOTE: You may be testing agreements that are not relevant to your
            business.
          </strong>{" "}
          That is okay. We just need to test that the features are working and
          spot any issues with the generator.
        </span>
      </p>
      <p className="mx-11">
        <span>
          <em>
            You will need to register for the calls you want to attend. The link
            to register for the calls will be provided via email AND are also
            found on the beta calendar.
          </em>
        </span>
      </p>
    </div>
  );
};

export default PhaseTwo;
