export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { getUsersBusinessProfile } from "~/data/businessProfile";

export async function GET() {
  const userBusinessProfile = await getUsersBusinessProfile();
  if (!userBusinessProfile)
    return new Response("Unauthorized", { status: 401 });
  return NextResponse.json({ userBusinessProfile });
}