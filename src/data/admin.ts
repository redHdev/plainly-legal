import { prisma } from "~/utils/prisma";

//Confirm that the process.env.CLERK_SECRET_KEY exists
if (!process.env.CLERK_SECRET_KEY)
  throw new Error(
    "CLERK_SECRET_KEY not found in environment variables. This is needed to access the Clerk API for admin stats",
  );

//Set the custom admin secret key for admin
import { clerkClient } from "@clerk/nextjs";
import { unstable_cache } from "next/cache";
clerkClient.__unstable_options.secretKey = process.env.CLERK_SECRET_KEY;

export interface UserStat {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  banned: boolean;
  createdAt: string | null;
  lastSignInAt: string | null;
  image: string | null;
  agreements: AgreementCountSingle;
}

export interface AgreementCountSingle {
  total: number;
  completed: number;
  unique: number;
}

export interface AgreementCounts {
  [key: string]: AgreementCountSingle;
}

export interface UserFlatStat {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  banned: boolean;
  createdAt: string | null;
  lastSignInAt: string | null;
  image: string | null;
  agreementsTotal: number;
  agreementsCompleted: number;
  agreementsUnique: number;
}

// Get Agreements - Returns all agreements or null if none exist
export async function userAgreements(): Promise<AgreementCounts | null> {
  const userAllAgreements = await prisma.savedAgreements.groupBy({
    by: ["user_id"],
    _count: {
      user_id: true,
    },
  });

  const userCompletedAgreements = await prisma.savedAgreements.groupBy({
    by: ["user_id"],
    _count: {
      user_id: true,
    },
    where: {
      completed: true,
    },
  });

  //Get the unique agreements that have been generated
  const userUniqueAgreements = await prisma.savedAgreements.groupBy({
    by: ["user_id", "agreement"],
    _count: {
      user_id: true,
    },
  });

  //Combine all the stats
  const userAgreementCounts: AgreementCounts = {};
  userAllAgreements.forEach((user) => {
    const completedAgreements = userCompletedAgreements.find(
      (completed) => completed.user_id === user.user_id,
    );
    const uniqueAgreements = userUniqueAgreements.filter(
      (unique) => unique.user_id === user.user_id,
    );
    userAgreementCounts[user.user_id] = {
      total: user._count.user_id,
      completed: completedAgreements?._count.user_id || 0,
      unique: uniqueAgreements.length,
    };
  });

  // confirm that Agreement Counts is not empty, if it is return null
  if (Object.keys(userAgreementCounts).length === 0) return null;

  return userAgreementCounts;
}

async function userStats(): Promise<UserStat[] | null> {
  // Get users in limits of 100 until we have them all
  const userList = await gatherClerkUsers();

  //Confirm that userList is not null
  if (!userList) throw new Error("No users found in Clerk");

  //Get the agreement counts for each user we know of
  const userAgreementsData = (await userAgreements()) as AgreementCounts;

  //Confirm that adminUserAgreements is not null
  if (!userAgreementsData)
    throw new Error(
      "No user agreements found in Prisma, this is likely an error",
    );

  //Put all of the user info together into the user stats array
  const userStats: UserStat[] = userList.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]
        ? user.emailAddresses[0].emailAddress
        : null,
      banned: user.banned,
      createdAt: user.createdAt
        ? new Date(user.createdAt).toLocaleString("en-US", {
            timeZone: "America/New_York",
          })
        : null,
      lastSignInAt: user.lastSignInAt
        ? new Date(user.lastSignInAt).toLocaleString("en-US", {
            timeZone: "America/New_York",
          })
        : null,
      image: user.imageUrl,
      agreements: userAgreementsData[user.id] ?? {
        total: 0,
        completed: 0,
        unique: 0,
      },
    };
  });

  return userStats;
}

// Get users in limits of 100 until we have them all
export async function gatherClerkUsers() {
  let userList;
  let shouldContinue = true;
  while (shouldContinue === true) {
    const userPageData = await clerkClient.users.getUserList({
      limit: 100,
      offset: userList ? userList.length : 0,
    });
    userList = userList ? [...userList, ...userPageData] : userPageData;
    if (userPageData.length < 100) shouldContinue = false;
  }
  return userList;
}

export const gatherCachedClerkUsers = unstable_cache(
  async() => {
    return await gatherClerkUsers();
  },
  undefined,
  { tags: [`clerk`] }
)


export async function userStatsFlat(): Promise<UserFlatStat[] | null> {
  //Get user stats and flatten them into UserFlatStat
  const userStatsDefault = await userStats();

  if (!userStatsDefault) return null;

  const userStatsFlat: UserFlatStat[] = userStatsDefault.map((user) => {
    return {
      image: user.image,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      agreementsTotal: user.agreements.total,
      agreementsCompleted: user.agreements.completed,
      agreementsUnique: user.agreements.unique,
      banned: user.banned,
      createdAt: user.createdAt,
      lastSignInAt: user.lastSignInAt,
    };
  });

  return userStatsFlat;
}

export default userStats;
