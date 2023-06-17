"use client";

//Import components & icons
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { WelcomeUser } from "~/components/welcomeArea";
import { Home, Profile, Lock, Rank, Hourglass, Download, External, Facebook, Slack, UpArrow, DownArrow } from "~/components/icons";
import { BetaCalender } from "~/components/dashboard/BetaCalender";
import Link from "~/components/ui/Link";

//Import styles
import "~/styles/embedStyles.css";

//Import types
import { useReducer, useState } from "react";
import { useUserMeta } from "~/providers/UserMetaProvider";

const DashboardTabs = () => {
  const { userMeta } = useUserMeta();
  //create a reducer for mobile menu
  const [isMobileOpen, toggleMobileMenu] = useReducer((state) => !state, false);
  const [currentTab, setCurrentTab] = useState("dashboard");

  const mobileOpen = isMobileOpen ? "" : "hidden";
  const betaProgressEmbedUrl = userMeta?.betaProgressEmbed as string;
  const progressEmbed    = betaProgressEmbedUrl ? <iframe width="100%" className="w-full h-[1900px] md:h-[1600px]" src={betaProgressEmbedUrl} scrolling="no"></iframe> : <p className="text-2xl text-center pt-10">Your Progress Dashboard is being created. Please check back soon.</p>;
  const leaderboardEmbed = <iframe className="w-full" width="100%" height="700px" src="https://sharing.clickup.com/8480863/gr/h/82u2z-4751/517479fe81f6f98" scrolling="no"></iframe>;


  const tabs = [{
      'key': 'dashboard',
      'icon': <Home className="h-5 w-5" />,
    },{
      'key': 'leaderboard',
      'icon': <Rank className="h-5 w-5" />,
    },{
      'key': 'my-progress',
      'icon': <Profile className="h-5 w-5" />,
    },{
      'key': 'phase-1',
      'icon': <Hourglass className="h-5 w-5" />,
    },{
      'key': 'phase-2',
      'icon': <Lock className="h-5 w-5" />,
    },{
      'key': 'phase-3',
      'icon': <Lock className="h-5 w-5" />,
    },{
      'key': 'phase-4',
      'icon': <Lock className="h-5 w-5" />,
    },{
      'key': 'phase-5',
      'icon': <Lock className="h-5 w-5" />,
    }];

  const tabsJSX = tabs.map((tab) => {
    return (
      <TabsTrigger key={tab.key} value={tab.key}>
        {tab.icon}
        <span className="capitalize">{tab.key.replace('-', ' ')}</span>
      </TabsTrigger>
    )
  })

  return (
    <Tabs
      defaultValue="dashboard"
      className="grid grid-cols-1 gap-y-3 md:gap-x-7 md:gap-y-10 md:grid-cols-[350px,1fr]"
      orientation="vertical"
      onValueChange={(value) => (setCurrentTab(value), toggleMobileMenu())}
    >
      <div
        className="tab-triggers flex flex-col gap-3"
      >
        <div className="hidden md:flex flex-col">
          <WelcomeUser showSettingsBtn={false} />
          <div className="my-4 h-[2px] w-full bg-light_purple-500"></div>
        </div>
        <TabsList className="w-full rounded-xl p-3 [&_button]:w-full [&_button]:items-center [&_button]:justify-start [&_button]:gap-2.5 [&_button]:rounded-lg [&_button]:text-lg">
          <button className="md:hidden flex-row cursor-pointer flex py-1 px-3" onClick={toggleMobileMenu}>
            <span className="text-lg font-semibold capitalize">{mobileOpen ? currentTab.replace('-', ' ') : ""}</span>
            {mobileOpen ? <DownArrow className="ml-auto w-6 h-6" /> : <UpArrow className="ml-auto w-6 h-6" />}
          </button>
          <div className={`${mobileOpen} md:flex triggers flex-col w-full`}>
            {tabsJSX}
          </div>
        </TabsList>
      </div>
      <div
        className="tab-content"
      >
        <TabsContent value="dashboard" className="mt-0">
          <div className="flex min-h-[500px] rounded-2xl border border-purple-50 shadow-lg w-full flex-col">
            <BetaCalender />
            <div className="beta-dashboard-buttons gap-3 p-9 pt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
              <Link target="_blank" href="https://www.addevent.com/calendar/Ag448138"><External className="fill-white w-4" />Add To Calendar</Link>
              <Link target="_blank" href="#"><Download className="fill-white w-4" />Beta Guide</Link>
              <Link target="_blank" href="https://www.facebook.com/groups/plainlylegalbeta"><Facebook className="fill-white w-4" />Facebook Group</Link>
              <Link target="_blank" href="#"><Slack className="fill-white w-4" />Slack Channel</Link>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="leaderboard" className="mt-0">
          <div className="flex min-h-[400px] rounded-2xl border border-purple-50 p-6 shadow-lg">
            {leaderboardEmbed}
          </div>
        </TabsContent>
        <TabsContent value="my-progress" className="mt-0">
          <div className="flex min-h-[400px] rounded-2xl border border-purple-50 shadow-lg justify-center">
            {progressEmbed}
          </div>
        </TabsContent>
        <TabsContent value="phase-1" className="mt-0">
          <div className="flex min-h-[400px] rounded-2xl border border-purple-50 p-6 shadow-lg justify-center">
            <h3>Phases 1 will show here</h3>
          </div>
        </TabsContent>
        <TabsContent value="phase-2" className="mt-0">
          <div className="flex min-h-[400px] rounded-2xl border border-purple-50 p-6 shadow-lg justify-center">
            <h3>Phases 2 will show here</h3>
          </div>
        </TabsContent>
        <TabsContent value="phase-3" className="mt-0">
          <div className="flex min-h-[400px] rounded-2xl border border-purple-50 p-6 shadow-lg justify-center">
            <h3>Phases 3 will show here</h3>
          </div>
        </TabsContent>
        <TabsContent value="phase-4" className="mt-0">
          <div className="flex min-h-[400px] rounded-2xl border border-purple-50 p-6 shadow-lg justify-center">
            <h3>Phases 4 will show here</h3>
          </div>
        </TabsContent>
        <TabsContent value="phase-5" className="mt-0">
          <div className="flex min-h-[400px] rounded-2xl border border-purple-50 p-6 shadow-lg justify-center">
            <h3>Phases 5 will show here</h3>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DashboardTabs;
