export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import getOptions from "~/data/options";

export async function GET() {
  const options = await getOptions();
  if (!options)
    return new Response("Unauthorized", { status: 401 });
  return NextResponse.json( options );
}
