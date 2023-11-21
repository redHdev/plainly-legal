export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { getUsersSavedAgreements } from "~/data/savedAgreements";

export async function GET() {
  const userSavedAgreements = await getUsersSavedAgreements();
  if (!userSavedAgreements)
    return new Response("Unauthorized", { status: 401 });
  return NextResponse.json({ userSavedAgreements });
}
