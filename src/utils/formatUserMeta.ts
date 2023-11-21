import type { UserMeta } from "@prisma/client";
import { type KeyedUserMeta } from "~/types/user";

export function formatUserMeta(userMeta: UserMeta[]) {
  // Create an array with the keys and values
  const userMetaFormatted = userMeta.reduce((acc: KeyedUserMeta, meta) => {
    // If the value string is a number, convert it to a number
    if (!isNaN(Number(meta.value))) {
      acc[meta.key] = Number(meta.value);
      return acc;
    }

    // If the value string is a boolean, convert it to a boolean
    if (meta.value === "true") {
      acc[meta.key] = true;
      return acc;
    }

    if (meta.value === "false") {
      // console.log("User Meta (meta.value) is false: ", meta.value);
      acc[meta.key] = false;
      return acc;
    }

    // Otherwise, just return the value as a string
    acc[meta.key] = meta.value;
    return acc;
  }, {});

  //Reformat the userRoles to an array
  if (
    userMetaFormatted.userRoles &&
    typeof userMetaFormatted.userRoles == "string"
  ) {
    userMetaFormatted.userRoles = userMetaFormatted.userRoles.split(",");
  } else {
    userMetaFormatted.userRoles = [];
  }

  return userMetaFormatted;
}
