import { type BusinessProfile } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import { updateBusinessProfile } from "~/data/businessProfile";

export async function POST(request: NextRequest) {
  const data = await request.json() as {id : string, data: BusinessProfile};
  const userBusinessProfile = await updateBusinessProfile(data.id, data.data);
  if (!userBusinessProfile)
    return new Response("Unauthorized", { status: 401 });
  return NextResponse.json({ userBusinessProfile });
}