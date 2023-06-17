"use client";
import { type NextPage } from "next";
import { SignUp } from "@clerk/nextjs/app-beta/client";
import { useSearchParams } from "next/navigation";

const Home: NextPage = () => {
  const searchParams = useSearchParams();

  let redirectUrl = "/";
  if (searchParams !== null) {
    const urlSearchParams = searchParams.get("search");

    if (urlSearchParams !== null) redirectUrl = urlSearchParams;
  }

  return (
    <section id="content" className="gap-20 bg-white py-20">
      <SignUp
        path="/account/sign-up"
        routing="path"
        signInUrl="/account/login"
        redirectUrl={redirectUrl}
      />
    </section>
  );
};

export default Home;
