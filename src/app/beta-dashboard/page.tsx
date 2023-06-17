import { type NextPage } from "next";

//Import styles
import "~/styles/embedStyles.css";

//Import DashboardTabs component
import DashboardTabs from "~/components/dashboard/DashboardTabs";

export const metadata = {
  title: "Beta Dashboard",
  description: "Plainly Legal Beta Dashboard",
};

const Account: NextPage = () => {

  return (
    <section id="content" className="gap-12 p-3 md:py-16 md:px-12">
      <div className="w-full">
        <div className="grid gap-6">
          <DashboardTabs />
        </div>
      </div>
    </section>
  );
};

export default Account;
