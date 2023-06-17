'use client';
import ComingSoon from "~/components/ComingSoon";
import { useUserMeta } from "~/providers/UserMetaProvider";

export default function Page() {
  const { userMeta } = useUserMeta();

  if(!userMeta) return null;

  //If the user does not have a flag set as admin, show them a coming soon message
  if (!userMeta?.isAdmin) {
    return <ComingSoon heading={"ChatLegal™ Coming Soon"} />;
  }
  
  return (
    <section id="content" className="justify-center py-16">
      <div className="w-full max-w-xl p-6 md:max-w-screen-xl">
        <div className="grid grid-cols-1 items-center gap-x-7 gap-y-10 md:grid-cols-3">
          <div className="col-span-full text-center">
            <h2 className="mb-0">ChatLegal™</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
