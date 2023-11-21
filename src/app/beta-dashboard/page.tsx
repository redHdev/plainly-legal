import { type NextPage } from "next";

//Import styles
import "~/styles/embedStyles.css";

//Import DashboardTabs component
import DashboardTabs from "~/components/dashboard/DashboardTabs";
import { WelcomeUser } from "~/components/welcomeArea";

export const metadata = {
  title: "Beta Dashboard - Plainly Legal",
  description: "Plainly Legal Beta Dashboard",
};

const Account: NextPage = () => {

  const welcomeArea =  <WelcomeUser showSettingsBtn={false} />
  
  return (
    <section id="content" className="gap-12 p-3 md:px-12 md:py-16">
      <div className="w-full">
        <div className="grid gap-6">
          <DashboardTabs WelcomeArea={welcomeArea} />
        </div>
      </div>
    </section>
  );
};

export default Account;
