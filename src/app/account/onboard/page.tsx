import { type NextPage } from "next";
import { actionSaveTOS } from "~/utils/tos";
import OnboardWorkflow from "~/components/OnboardWorkflow";
import { WelcomeUser } from "~/components/welcomeArea";

export const metadata = {
  title: "Welcome - Plainly Legal",
  description: "Welcome to Plainly Legal!",
};

//Grab the server side welcome user component
const welcome = (
  <WelcomeUser
    className="hidden md:flex"
    showSettingsBtn={false}
    text="Welcome,"
  />
);

const Welcome: NextPage = () => {
  return (
    <section id="content" className="py-10 md:py-16">
      <div className="flex w-full max-w-xl justify-center px-6 md:max-w-screen-xl">
        <OnboardWorkflow saveTOS={actionSaveTOS} WelcomeArea={welcome} />
      </div>
    </section>
  );
};

export default Welcome;
