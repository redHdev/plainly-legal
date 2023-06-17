"use client";

import { type NextPage } from "next";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const Login: NextPage = () => {
  const searchParams = useSearchParams();

  let redirectUrl = "/";
  if (searchParams !== null) {
    const urlSearchParams = searchParams.get("search");

    if (urlSearchParams !== null) redirectUrl = urlSearchParams;
  }

  return (
    <section id="content" className="gap-20 bg-white py-20">
      <SignIn
        path="/account/login"
        routing="hash"
        signUpUrl="/account/sign-up"
        redirectUrl={redirectUrl}
      />
    </section>
  );
};

export default Login;
