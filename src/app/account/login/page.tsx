import { type NextPage } from "next";
import Login from "./Login";

export const metadata = {
  title: "Login - Plainly Legal",
  description: "Login to your account.",
};

const Page: NextPage = () => {
  return (
    <section id="content" className="gap-20 bg-white py-20">
      <Login />
    </section>
  );
};

export default Page;
