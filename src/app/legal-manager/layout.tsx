'use client'
import ComingSoon from "~/components/ComingSoon";
import { useUserMeta } from "~/UserMetaProvider";
import Loading from "./loading";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userMeta } = useUserMeta();

  if(!userMeta) return <Loading/>;

  //If the user does not have a flag set as admin, show them a coming soon message
  if (userMeta?.isAdmin !== true) {
    return <ComingSoon heading={"Legal Manager Coming Soon"} />;
  }
  
  return <>{children}</>;

}
