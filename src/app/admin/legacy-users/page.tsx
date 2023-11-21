// import Papa from "papaparse";
// import fs from "fs";
// import path from "path";
import getUserMeta from "~/data/userData";
// import { clerkClient } from "@clerk/nextjs";
// import{ ConsoleClient } from "~/utils/ConsoleClient";
// import { gatherCachedClerkUsers } from "~/data/admin";
// import { prisma } from "~/utils/prisma";
// import { type User } from "@clerk/clerk-sdk-node";
// import { unstable_cache } from "next/cache";
export const dynamic = "force-dynamic";

// interface csvData {
//   "First Name": string;
//   "Last Name": string;
//   Email: string;
// }
// interface ImportUser {
//   id?: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   existingUser: boolean;
//   userRoles: string[];
// }

// function parseCSV(csvData: string) {
//   //Create a promise to parse the csv data
//   const parseCSV = new Promise((resolve) => {
//     Papa.parse(csvData, {
//       header: true,
//       skipEmptyLines: true,
//       complete: function (results) {
//         resolve(results.data);
//       },
//     });
//   });
//   return parseCSV;
// }


// const getCachedUserMeta = unstable_cache(
//   async(existingUserID: string) => {
//     return await getUserMeta(existingUserID, 'limited');
//   },
//   undefined,
//   { tags: [`import`] }
// )

// async function getData() {
//   const filePath = path.join(
//     "src/app/admin/legacy-users/legacy_users.csv",
//   );
//   const csvData = fs.readFileSync(filePath, "utf-8");
//   const parsedCsv = (await parseCSV(csvData)) as csvData[];


//   //create a timer
//   const start = Date.now();
//   console.log('gathering users...');
//   const allUsers = await gatherCachedClerkUsers() as User[];
//   const end = Date.now();
//   console.log('Time to gather clerk users: ' + (end - start) + 'ms');
//   console.log('allusers', allUsers.length)

//   const allUserEmails = allUsers?.map((user) => {

//     const userPrimaryEmail = user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
    
//     if( !userPrimaryEmail ) throw new Error("User does not have a primary email address");

//     return userPrimaryEmail.emailAddress;
//   });

//   // console.log(allUserEmails?.includes("connectwithme@seankennard.net"));

//   const userstart = Date.now();
//   console.log('gathering user meta...');

//   //Get all user meta of users that should be imported
//   const importUsers: ImportUser[] = [];
//   for (const csvUser of parsedCsv) {

//     const existingUser = allUserEmails?.includes(csvUser.Email);
//     const existingUserID = allUsers?.find((user) => {
//       const userPrimaryEmail = user.emailAddresses?.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress;
//       return userPrimaryEmail === csvUser.Email;
//   })?.id;
  
//     const userMeta = existingUserID ? await getCachedUserMeta(existingUserID) : null;

//     const importUser: ImportUser = {
//       id: existingUserID ? existingUserID : undefined,
//       firstName: csvUser["First Name"],
//       lastName: csvUser["Last Name"],
//       email: csvUser.Email,
//       existingUser: existingUser,
//       userRoles: userMeta?.userRoles as string[] ?? [],
//     };

//     importUsers.push(importUser);
//   }

//   const usernd = Date.now();
//   console.log('Time to get usermeta: ' + (usernd - userstart) + 'ms');



//   return importUsers;
// }

// async function createMissingUsers(userData: ImportUser[]): Promise<ImportUser[]> {
//   const createUserWithDelay = async (user: ImportUser) => {
//     console.log('user ' + user.email + ' does not exist, creating user');
//       const newUser = await clerkClient.users.createUser({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         emailAddress: [user.email],
//         skipPasswordChecks: true,
//         skipPasswordRequirement: true
//       });
//       user.id = newUser.id;
//       user.existingUser = true;
//     await new Promise(resolve => setTimeout(resolve, 100)); // 0.1 second delay
//     return user;
//   };

//   for (let i = 0; i < userData.length; i++) {
//     const user = userData[i];
//     if (user != undefined && !user.existingUser) {
//       // Only process users that don't already exist
//       userData[i] = await createUserWithDelay(user);
//     }
//   }
//   return userData;
// }
// async function fillUserRoles(userData: ImportUser[]) {
//   // loop through users and get user meta "userRoles" for each user through prisma
//   // If the user does not have the role "legacy-doc" then add it to the user meta
//   const promises = userData.map(async (user: ImportUser) => {
//     //confirm that user.id exists, if not, we have a humungous problem, return and error
//     if (!user.id){
//       console.log('User ID does not exist for user' + user.email);
//       return;
//   }

//     console.log('adding legacy-doc role to user ' + user.email);

//     if (!user.userRoles.includes("legacy-doc")) {
//       user.userRoles.push("legacy-doc");
//       //implode them with a comma
//       const userRoles = user.userRoles.join(",");
//       //update the user meta in prisma
//       await prisma.userMeta.upsert(
//         {
//           where: {
//             userId_key: {
//               userId: user.id,
//               key: "userRoles"
//             },
//           },
//           update: {
//             value: userRoles,
//           },
//           create: {
//             userId: user.id,
//             key: "userRoles",
//             value: userRoles,
//           },
//         },
//       );
//     }
//     return user;
//   });
//   const completedUsers = await Promise.all(promises);
//   return completedUsers;
// }



export default async function Page() {
  //get the user meta from the database based on clerk userID
  const currentUserMeta = await getUserMeta();
  //Confirm that our current user is admin
  const isAdmin = currentUserMeta?.isAdmin === true;
  //If the user is not admin, return an error
  if (!isAdmin) return "You are not authorized to access this page."; 


  // //Get the data from the csv, clerk, and prisma tables and store it in a nice object
  // const userData = await getData();


  // // Create the users that are missing from clerk in clerk
  // const completedUsers = await createMissingUsers(userData);

  // // // //Fill the user roles for the users that are missing the legacy-doc role
  // const completedUserMeta = await fillUserRoles(completedUsers);

  //Show the user stats
  return (
    <section id="content" className="gap-12 p-3 md:px-12 md:py-16">
      <div className="w-full">
        <div className="grid gap-6">
          {/* <ConsoleClient object={completedUserMeta} /> */}
        </div>
      </div>
    </section>
  );
}
