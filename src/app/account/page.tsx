import { type NextPage } from "next";
import UserProfileArea from "./UserProfileArea";

export const metadata = {
  title: "Account - Plainly Legal",
  description: "Tweak your profile, settings, and business information.",
};

const Account: NextPage = () => {
  return (
    <section id="content" className="gap-12 py-10">
      <div className="w-full max-w-xl px-6 md:max-w-screen-xl">
        <UserProfileArea />
      </div>
    </section>
  );
};

export default Account;
