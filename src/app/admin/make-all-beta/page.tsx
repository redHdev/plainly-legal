import getUserMeta from "~/data/userData";
// import { prisma } from '~/utils/prisma';

export const dynamic = 'force-dynamic'

//This file is meant to be a one time use file to add the beta role to all users who have the betaProgressEmbed = true user meta key
export default async function Page() {
  //get the user meta from the database based on clerk userID
  const currentUserMeta = await getUserMeta();

  //Confirm that our current user is admin
  const isAdmin = currentUserMeta?.isAdmin === true;

  //If the user is not admin, return an error
  if (!isAdmin) {
    return "You are not authorized to import beta users";
  }

  // //Grab all of the users with the key "betaProgressEmbed" = "true" and add a corrisponding "userRoles" = "beta" record with the same userId to the user meta table
  // const betaProgressEmbedUsers = await prisma.userMeta.findMany({
  //     where: {
  //         key: "betaProgressEmbed",
  //     },
  // });

  // //Loop through the users and add the beta role to their user meta if they don't already have it
  // for (const user of betaProgressEmbedUsers) {
  //     const userMeta = await prisma.userMeta.findFirst({
  //         where: {
  //             userId: user.userId,
  //             key: "userRoles",
  //             value: "beta",
  //         },
  //     });

  //     //If the user doesn't have the beta role, add it
  //     if (!userMeta) {
  //         console.log("Adding beta role to user:", user.userId);
  //         await prisma.userMeta.create({
  //             data: {
  //                 userId: user.userId,
  //                 key: "userRoles",
  //                 value: "beta",
  //             },
  //         });
  //     }else{
  //         console.log('User already has beta role:', user.userId);
  //     }
  // }

  return "Beta role added to all users with betaProgressEmbed = true";
}
