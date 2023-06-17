import { NextResponse } from "next/server";

import getAgreements from "~/data/agreements";

export async function GET() {
  // console.log("START REQUEST HERE:");
  // console.log(request);
  const contracts = await getAgreements();
  return NextResponse.json(contracts);
}
