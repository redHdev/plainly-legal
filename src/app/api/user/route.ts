export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import getUserMeta from "~/data/userData";

export async function GET() {
  const userMeta = await getUserMeta();
  if (!userMeta)
    return new Response("Unauthorized", { status: 401 });
  return NextResponse.json( userMeta );
}
