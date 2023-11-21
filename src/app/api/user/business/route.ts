export const dynamic = 'force-dynamic'

import { type BusinessProfile } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { getUsersBusinessProfile, upsertBusinessProfile } from "~/data/businessProfile";

export async function GET() {
  const userBusinessProfile = await getUsersBusinessProfile();
  return NextResponse.json(userBusinessProfile);
}

export async function POST(request: NextRequest) {
  const data = await request.json() as BusinessProfile;
  const userBusinessProfile = await upsertBusinessProfile(data);
  if (!userBusinessProfile)
    return new NextResponse("Unauthorized", { status: 401 });
  return NextResponse.json(userBusinessProfile);
}
