import { type BusinessProfile } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { getUsersBusinessProfile, createBusinessProfile } from "~/data/businessProfile";

export async function GET(): Promise<NextResponse> {
  const userBusinessProfile = await getUsersBusinessProfile();
  if (!userBusinessProfile)
    return new Response("Unauthorized", { status: 401 });
  return NextResponse.json(userBusinessProfile);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = await request.json() as {data: BusinessProfile};
 
  const userBusinessProfile = await createBusinessProfile(data);
  if (!userBusinessProfile)
    return new Response("Unauthorized", { status: 401 });
  return NextResponse.json({ userBusinessProfile });
}
