"use client";

import { type NextPage } from "next";
import { UserProfile } from "@clerk/nextjs";
import { motion as m } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { SignOutButton } from "./logout";
import { WelcomeUser } from "~/components/welcomeArea";
import { Profile, Settings, Cog } from "~/components/icons";
import {useEffect, useState} from "react";

import { type BusinessProfile } from "@prisma/client";
import BusinessQuestions from "~/components/BusinessQuestions";

const Account: NextPage = () => {

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile[]>([]);

  useEffect(() => {
    const getUserBusinessProfile = async () => {
      const userBusinessProfile = (await fetch(
        "/api/current_user/business_profile"
      ).then((res) => res.json())) as BusinessProfile[];
      console.log(userBusinessProfile);
       setBusinessProfile(userBusinessProfile);
    };
    void getUserBusinessProfile();
  }, []);
  return (
    <section id="content" className="gap-12 py-16">
      <div className="w-full max-w-xl px-6 md:max-w-screen-xl">
        <div className="grid gap-6">
          <Tabs
            defaultValue="profile"
            className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-[350px,1fr]"
            orientation="vertical"
          >
            <m.div
              className="tab-triggers flex flex-col gap-3"
              initial={{ opacity: 0, transform: "translateY(100%)" }}
              animate={{ opacity: 1, transform: "translateY(0%)" }}
              transition={{ duration: 0.4 }}
            >
              <m.div
                className=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              >
                <WelcomeUser showSettingsBtn={false} />
              </m.div>
              <div className="my-4 h-[2px] w-full bg-light_purple-500"></div>
              <TabsList className="w-full rounded-xl p-3 [&_button]:w-full [&_button]:items-center [&_button]:justify-start [&_button]:gap-2.5 [&_button]:rounded-lg [&_button]:text-lg">
                <TabsTrigger value="profile" className="">
                  <Profile className="h-5 w-5" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="">
                  <Cog className="h-5 w-5" />
                  <span>Business</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>
              <SignOutButton />
            </m.div>
            <m.div
              className="tab-content"
              initial={{ opacity: 0, transform: "translateY(100%)" }}
              animate={{ opacity: 1, transform: "translateY(0%)" }}
              transition={{ duration: 0.4 }}
            >
              <TabsContent value="profile" className="mt-0">
                <UserProfile
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "w-full ml-0 shadow-lg border border-purple-50 rounded-2xl",
                      navbar: "hidden",
                      pageScrollBox: "p-6",
                      navbarMobileMenuRow: "hidden",
                      headerTitle: "text-left ",
                      // headerSubtitle: "text-left text-xl text-purple-800 font-bold",
                      headerSubtitle: "text-left",
                      profileSection: "gap-4",
                      accordionTriggerButton: "p-0",
                    },
                  }}
                />
              </TabsContent>
              <TabsContent value="business" className="mt-0">
                <BusinessQuestions businessProfile = {businessProfile} />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-purple-50 p-6 shadow-lg">
                  <h3>Settings will show here</h3>
                </div>
              </TabsContent>
            </m.div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Account;
