"use client";
import { type NextPage } from "next";
import { SignUp } from "@clerk/nextjs/app-beta/client";

const Home: NextPage = () => {

  return (
    <section id="content" className="gap-20 bg-white py-20">
      <SignUp
        path="/account/sign-up"
        routing="path"
        signInUrl="/account/login"
      />
    </section>
  );
};

export default Home;
