"use client";

import { UserProfile } from "@clerk/nextjs";
import { motion as m } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { SignOutButton } from "./logout";
import { Profile, Cog } from "~/components/icons";
import BusinessQuestions from "~/components/prefills/BusinessQuestions";
import { Subscription } from "~/components/Subscription";
import { useUserMeta, hasRole } from "~/UserMetaProvider";

import "~/styles/profileStyles.css";
import { LockIcon } from "lucide-react";

interface ConductAgreementProps {
  WelcomeArea: React.ReactNode;
}

export const UserProfileTabs: React.FC<ConductAgreementProps> = ({
  WelcomeArea,
}) => {
  const { userMeta } = useUserMeta();
  const isSubscriptionAvailable = false === hasRole(userMeta, "beta");

  return (
    <div className="grid gap-6">
      <Tabs
        defaultValue="profile"
        className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-[350px,1fr]"
        orientation="vertical"
      >
        <div className="tab-triggers flex flex-col gap-3">
          <div>{WelcomeArea}</div>
          <div className="my-4 hidden h-[2px] w-full bg-light_purple-500 md:block"></div>
          <TabsList className="w-full rounded-xl p-3 [&_button]:w-full [&_button]:items-center [&_button]:justify-start [&_button]:gap-2.5 [&_button]:rounded-lg [&_button]:text-lg">
            <TabsTrigger value="profile" className="">
              <Profile className="custom h-5 w-5" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="">
              <Cog className="custom h-5 w-5" />
              <span>Document Presets</span>
            </TabsTrigger>
            {isSubscriptionAvailable && (
              <TabsTrigger value="subscription" className="">
                <LockIcon className="h-5 w-5" />
                <span>Subscription</span>
              </TabsTrigger>
            )}
          </TabsList>
          <SignOutButton />
        </div>
        <m.div
          className="tab-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
                  profileImage: "p-0",
                },
              }}
            />
          </TabsContent>
          <TabsContent value="business" className="mt-0">
            <div className="justify-start rounded-2xl md:border md:border-purple-50 md:p-6 md:shadow-lg">
              <BusinessQuestions />
            </div>
          </TabsContent>
          <TabsContent value="subscription" className="mt-0">
            <div className="justify-start rounded-2xl md:border md:border-purple-50 md:p-6 md:shadow-lg">
              <Subscription />
            </div>
          </TabsContent>
        </m.div>
      </Tabs>

      {hasRole(userMeta, "beta") === false && (
        <style>
          {`
            .cl-profileSectionPrimaryButton__emailAddresses {
              display: flex;
            }
          `}
        </style>
      )}
    </div>
  );
};

export default UserProfileTabs;
