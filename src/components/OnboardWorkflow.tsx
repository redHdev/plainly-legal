"use client";

import { useState } from "react";
import { type ZodTypeAny } from "zod";
import { type UserTermsOfServiceAcceptance } from "@prisma/client";
import { type SafeAction } from "next-safe-action/.";

import { SpinnerLoader } from "./ui/loaders/Loaders";
import BusinessQuestions from "~/components/prefills/BusinessQuestions";
import { TermsAndConditions } from "~/components/TermsAndConditions";

type Settings = "business" | "tos" | "thank-you";

interface OnboardWorkflowProps {
  saveTOS: SafeAction<ZodTypeAny, UserTermsOfServiceAcceptance | null>;
  onComplete?: () => void;
  WelcomeArea: React.ReactNode;
}

const OnboardWorkflow = ({
  saveTOS,
  onComplete,
  WelcomeArea,
}: OnboardWorkflowProps) => {
  const [step, setStep] = useState<Settings>("business");

  const redirectHome = () => {
    setStep("thank-you");
    if (onComplete) onComplete();
    window.location.href = "/";
  };

  return (
    <div className="onboard-steps w-full max-w-4xl rounded-2xl md:border md:border-purple-50 md:p-6 md:shadow-lg">
      <div className="step-counter flex items-center justify-between">
        {WelcomeArea}
        <div className="step hidden md:flex">
          {step != "thank-you" && (
            <span className="text-2xl font-bold">
              Step {step == "business" ? "1" : "2"} / 2
            </span>
          )}
        </div>
      </div>

      <div className="my-4 h-[2px] w-full bg-light_purple-500"></div>

      <div className="profile-slider flex flex-col gap-3">
        {step == "business" && (
          <BusinessQuestions
            onComplete={() => setStep("tos")}
            submitText="Save Business Profile"
          />
        )}

        {step == "tos" && (
          <TermsAndConditions
            saveTOS={saveTOS}
            onComplete={redirectHome}
            className="h-[700px]"
          />
        )}

        {step == "thank-you" && (
          <h3 className="w-full py-20 text-center">
            <SpinnerLoader />
          </h3>
        )}
      </div>
    </div>
  );
};

export default OnboardWorkflow;
