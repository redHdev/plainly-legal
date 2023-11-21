import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import getUserMeta from "./data/userData";
import { hasRole, hasSubscription } from "./UserMetaProvider";

const PUBLIC_ROUTES = [
  "",
  "/",
  "/confirmation",
  "/coming-soon(.*)",
  "/pricing(.*)",
  "/account/login(.*)",
  "/account/sign-up(.*)",
  "/beta",
  "/demo(.*)",
  "/api(.*)",
  "/checkout(.*)*",
];
const SUBSCRIPTION_NEEDED_ROUTES = [
  "/agreements/(.*)",
  "/legal-manager(.*)",
  "/chatlegal(.*)",
];
const BETA_COMING_SOON_ROUTES = ["/agreement(.*)"];

function createRedirectURL(basePath: string, reqURL: string, paramKey: string) {
  const url = new URL(basePath, reqURL);
  url.searchParams.set(paramKey, reqURL);
  return url;
}

function matchesSubscriptionRoute(str: string) {
  return SUBSCRIPTION_NEEDED_ROUTES.some((pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(str);
  });
}

function matchesBetaOnlyRoute(str: string) {
  return BETA_COMING_SOON_ROUTES.some((pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(str);
  });
}

async function hasAccessPermission(userId: string) {
  const userMeta = await getUserMeta(userId, "limited");

  if (!userMeta) return false;

  const hasBasePermission =
    hasRole(userMeta, "beta") ||
    hasRole(userMeta, "legacy-doc") ||
    userMeta.isAdmin === true ||
    hasSubscription(userMeta);
  return hasBasePermission;
}

async function isBetaOrEarlyAccess(userId: string) {
  const userMeta = await getUserMeta(userId, "limited");

  if (!userMeta) return false;

  return (
    hasRole(userMeta, "beta") ||
    hasRole(userMeta, "early-access") ||
    hasRole(userMeta, "all-access") ||
    hasRole(userMeta, "legacy-doc") ||
    userMeta.isAdmin === true
  );
}

export default authMiddleware({
  publicRoutes: PUBLIC_ROUTES,
  afterAuth: async (auth, req) => {
    const signInUrl = createRedirectURL(
      "/account/login",
      req.url,
      "redirect_url",
    );
    const purchaseUrl = createRedirectURL(
      "/subscription",
      req.url,
      "redirect_url",
    );
    const comingSoonUrl = createRedirectURL(
      "/coming-soon",
      req.url,
      "redirect_url",
    );

    //If a user is not logged in, and is trying to access a private route, redirect them to the sign in page
    if (!auth.userId && !auth.isPublicRoute)
      return NextResponse.redirect(signInUrl);

    //If a user is logged in, and is trying to access a private route, but does not have a valid subscription or role, redirect them to the purchase page
    if (matchesSubscriptionRoute(req.nextUrl.pathname)) {
      if (!auth.userId) return NextResponse.redirect(signInUrl);

      if (!(await hasAccessPermission(auth.userId)))
        return NextResponse.redirect(purchaseUrl);
    }

    //If a user is logged in, and is trying to access a beta route, but does not have a valid beta role, redirect them to the beta coming soon page
    if (matchesBetaOnlyRoute(req.nextUrl.pathname)) {
      if (!auth.userId) return NextResponse.redirect(signInUrl);

      if (!(await isBetaOrEarlyAccess(auth.userId)))
        return NextResponse.redirect(comingSoonUrl);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
