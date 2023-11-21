import { type NextPage } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up - Plainly Legal",
  description: "Sign up for a Plainly Legal account.",
};

const Home: NextPage = () => {
  return (
    <section id="content" className="gap-20 bg-white py-20">
      <div className="px-6">
        <SignUp
          path="/account/sign-up"
          routing="path"
          signInUrl="/account/login"
        />
      </div>
    </section>
  );
};

export default Home;
