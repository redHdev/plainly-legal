"use client";

//Import components & icons
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Home,
  Profile,
  Lock,
  Rank,
  Hourglass,
  Download,
  External,
  Facebook,
  UpArrow,
  DownArrow,
  Printer,
} from "~/components/icons";
import { BetaCalender } from "~/components/dashboard/BetaCalender";
import Link from "~/components/ui/Link";

//Import styles
import "~/styles/embedStyles.css";

//Import types
import { useReducer, useState } from "react";
import { useUserMeta, hasRole } from "~/UserMetaProvider";
import LeaderboardTable from "./LeaderboardTable";
import PhaseTwo from "./PhaseTwo";
import ComingSoon from "../ComingSoon";
import React from "react";

interface DashBoardProps {
  WelcomeArea: React.ReactNode;
}

export const DashboardTabs: React.FC<DashBoardProps> = ({ WelcomeArea }) => {
  const { userMeta } = useUserMeta();

  //create a reducer for mobile menu
  const [isMobileOpen, toggleMobileMenu] = useReducer((state) => !state, false);
  const [currentTab, setCurrentTab] = useState("dashboard");

  if (!hasRole(userMeta, "beta")) {
    return (
      <p className="text-center">You are not allowed to access this page</p>
    );
  }

  const mobileOpen = isMobileOpen ? "" : "hidden";
  const betaProgressEmbedUrl = userMeta?.betaProgressEmbed as string;
  const progressEmbed = betaProgressEmbedUrl ? (
    <iframe
      width="100%"
      className="h-[1900px] w-full md:h-[1600px]"
      src={betaProgressEmbedUrl}
      scrolling="no"
    ></iframe>
  ) : (
    <ComingSoon heading="My Progress">
      <p className="text-center">
        Your Progress Dashboard is being created. Please check back soon.
      </p>
    </ComingSoon>
  );
  const leaderboardEmbed = (
    <iframe
      className="w-full"
      width="100%"
      height="700px"
      src="https://sharing.clickup.com/8480863/gr/h/82u2z-4751/517479fe81f6f98"
      scrolling="no"
    ></iframe>
  );

  const tabs = [
    {
      key: "dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      key: "leaderboard",
      icon: <Rank className="h-5 w-5" />,
    },
    {
      key: "my-progress",
      icon: <Profile className="h-5 w-5" />,
    },
    {
      key: "phase-1",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      key: "phase-2",
      icon: <Hourglass className="h-5 w-5" />,
    },
    {
      key: "phase-3",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      key: "phase-4",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      key: "phase-5",
      icon: <Lock className="h-5 w-5" />,
    },
  ];

  const tabsJSX = tabs.map((tab) => {
    return (
      <TabsTrigger key={tab.key} value={tab.key}>
        {tab.icon}
        <span className="capitalize">{tab.key.replace("-", " ")}</span>
      </TabsTrigger>
    );
  });

  return (
    <Tabs
      defaultValue="dashboard"
      className="grid grid-cols-1 gap-y-3 md:grid-cols-[350px,1fr] md:gap-x-7 md:gap-y-10"
      orientation="vertical"
      onValueChange={(value) => (setCurrentTab(value), toggleMobileMenu())}
    >
      <div className="tab-triggers flex flex-col gap-3">
        <div className="hidden flex-col md:flex">
          {WelcomeArea}
          <div className="my-4 h-[2px] w-full bg-light_purple-500"></div>
        </div>
        <TabsList className="w-full rounded-xl p-3 [&_button]:w-full [&_button]:items-center [&_button]:justify-start [&_button]:gap-2.5 [&_button]:rounded-lg [&_button]:text-lg">
          <button
            className="flex cursor-pointer flex-row px-3 py-1 md:hidden"
            onClick={toggleMobileMenu}
          >
            <span className="text-lg font-semibold capitalize">
              {mobileOpen ? currentTab.replace("-", " ") : ""}
            </span>
            {mobileOpen ? (
              <DownArrow className="ml-auto h-6 w-6" />
            ) : (
              <UpArrow className="ml-auto h-6 w-6" />
            )}
          </button>
          <div className={`${mobileOpen} triggers w-full flex-col md:flex`}>
            {tabsJSX}
          </div>
        </TabsList>
      </div>
      <div className="tab-content">
        <TabsContent value="dashboard" className="mt-0">
          <div className="flex min-h-[500px] w-full flex-col rounded-2xl border border-purple-50 shadow-lg">
            <BetaCalender />
            <div className="beta-dashboard-buttons flex flex-wrap gap-3 p-9 pt-4 md:[&_a]:flex-[200px]">
              <Link
                target="_blank"
                href="https://www.addevent.com/calendar/Ag448138"
                className="h-auto"
              >
                <External className="w-4 fill-white" />
                Add To Calendar
              </Link>
              <Link
                target="_blank"
                href="https://drive.google.com/file/d/1LwGAKtKlFPZ8p_y_CzOIolcdnPm8yxT7/view?usp=sharing"
              >
                <Download className="w-4 fill-white" />
                Beta Guide
              </Link>
              <Link
                target="_blank"
                href="https://drive.google.com/file/d/1lyYUiOu9lWrv9ABXaF6snJ83IVNyS8s1/view?usp=sharing"
              >
                <Printer className="w-4 fill-white" />
                Printable Checklist
              </Link>
              <Link
                target="_blank"
                href="https://www.facebook.com/groups/plainlylegalbeta"
              >
                <Facebook className="w-4 fill-white" />
                Facebook Group
              </Link>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="leaderboard" className="mt-0">
          <div className="flex min-h-[400px] flex-col rounded-2xl border border-purple-50 p-6 shadow-lg">
            {leaderboardEmbed}
            <LeaderboardTable />
          </div>
        </TabsContent>
        <TabsContent value="my-progress" className="mt-0">
          <div className="flex min-h-[400px] justify-center rounded-2xl border border-purple-50 shadow-lg">
            {progressEmbed}
          </div>
        </TabsContent>
        <TabsContent value="phase-1" className="mt-0">
          <div className="flex min-h-[400px] justify-center rounded-2xl border border-purple-50 p-12 pb-20 shadow-lg">
            {/* <PhaseOne /> */}
            <ComingSoon heading="Phase One">
              <p className="text-center">Phase One has been completed.</p>
            </ComingSoon>
          </div>
        </TabsContent>
        <TabsContent value="phase-2" className="mt-0">
          <div className="flex min-h-[400px] justify-center rounded-2xl border border-purple-50 p-6 shadow-lg">
            <PhaseTwo />
          </div>
        </TabsContent>
        <TabsContent value="phase-3" className="mt-0">
          <div className="flex min-h-[400px] justify-center rounded-2xl border border-purple-50 p-6 shadow-lg">
            <ComingSoon heading="Phase Three">
              <p className="text-center">
                Phase Three is upcoming. Please check back soon.
              </p>
            </ComingSoon>
          </div>
        </TabsContent>
        <TabsContent value="phase-4" className="mt-0">
          <div className="flex min-h-[400px] justify-center rounded-2xl border border-purple-50 p-6 shadow-lg">
            <ComingSoon heading="Phase Four">
              <p className="text-center">
                Phase Four is upcoming. Please check back soon.
              </p>
            </ComingSoon>
          </div>
        </TabsContent>
        <TabsContent value="phase-5" className="mt-0">
          <div className="flex min-h-[400px] justify-center rounded-2xl border border-purple-50 p-6 shadow-lg">
            <ComingSoon heading="Phase Five">
              <p className="text-center">
                Phase Five is upcoming. Please check back soon.
              </p>
            </ComingSoon>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DashboardTabs;
