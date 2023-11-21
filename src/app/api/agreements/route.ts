export const dynamic = 'force-dynamic'
export const revalidate = 0;

import { NextResponse } from "next/server";

import getAgreements from "~/data/agreements";

export async function GET() {
  const contracts = await getAgreements();
  return NextResponse.json(contracts);
}
