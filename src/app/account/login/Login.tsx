"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export const Login = () => {
  const searchParams = useSearchParams();

  let redirectParams = {};
  if (searchParams !== null) {
    const urlSearchParams = searchParams.get("redirect_url");

    if (urlSearchParams !== null) {
      redirectParams = { redirectUrl: urlSearchParams };
    }
  }
  return (
    <SignIn
      path="/account/login"
      routing="hash"
      signUpUrl="/account/sign-up"
      {...redirectParams}
    />
  );
};

export default Login;
