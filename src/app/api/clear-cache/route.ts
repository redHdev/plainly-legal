export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import getUserMeta from "~/data/userData";
 
export async function GET(request: NextRequest) {

    //get the user meta from the database based on clerk userID
    const currentUserMeta = await getUserMeta();
    //Confirm that our current user is admin
    const isAdmin = currentUserMeta?.isAdmin === true;
    //If the user is not admin, return an error
    if (!isAdmin) return new Response("You are not allowed to access this page", { status: 400 });

    
  const tag = request.nextUrl.searchParams.get('tag')

  if (!tag) return new Response("No tag provided, please provide a tag in the url like so ?tag=example", { status: 400 });

  revalidateTag(tag)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}