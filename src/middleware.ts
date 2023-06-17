import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["", "/", "/account/login", "/account/sign-up"],
  afterAuth(auth, req) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/account/login", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// // Old Middleware
// // Old Middleware
// // Old Middleware

// import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Set the paths that don't require the user to be signed in
// const publicPaths = [
//   "/",
//   "/account/login*",
//   "/account/sign-up*",
//   "/assets*",
//   "",
// ];

// const isPublic = (path: string) => {
//   return publicPaths.find((x) =>
//     path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
//   );
// };

// export default withClerkMiddleware((request: NextRequest) => {
//   if (isPublic(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   }
//   // if the user is not signed in redirect them to the sign in page.
//   const { userId } = getAuth(request);

//   if (!userId) {
//     // redirect the users to /account/login/[[...index]].ts

//     const signInUrl = new URL("/account/login", request.url);
//     signInUrl.searchParams.set("redirect_url", request.url);
//     return NextResponse.redirect(signInUrl);
//   }
//   return NextResponse.next();
// });
// export const config = {
//   matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
// };
