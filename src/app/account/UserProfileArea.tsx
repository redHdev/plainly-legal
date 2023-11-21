import UserProfileTabs from "./UserProfileTabs";
import { WelcomeUser } from "~/components/welcomeArea";

import "~/styles/profileStyles.css";

export default function UserProfileArea() {
  //Grab the server side welcome user component

  return (
    <UserProfileTabs
      WelcomeArea={
        <WelcomeUser className="hidden md:flex" showSettingsBtn={false} />
      }
    />
  );
}
