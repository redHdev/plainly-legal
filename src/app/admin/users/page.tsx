import { userStatsFlat } from "~/data/admin";
import getUserMeta from "~/data/userData";
import UserStats from "./UserStats";

export const dynamic = 'force-dynamic'

export default async function Page() {
  //get the user meta from the database based on clerk userID
  const currentUserMeta = await getUserMeta();

  //Confirm that our current user is admin
  const isAdmin = currentUserMeta?.isAdmin === true;

  //If the user is not admin, return an error
  if (!isAdmin) return "You are not authorized to access this page.";

  //Get all the savedAgreements from the database grouped by userID
  const userStats = await userStatsFlat();

  //check to make sure userStats are not empty
  if (!userStats) return "No saved agreements found";

  //Show the user stats
  return <UserStats stats={userStats} />;
}
