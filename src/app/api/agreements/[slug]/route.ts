import { type NextRequest, NextResponse } from "next/server";
import { type FullContracts } from "~/types/contracts";
import { getAgreement } from "~/data/agreements";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const contract: FullContracts = (await getAgreement(slug)) as FullContracts;
  return NextResponse.json(contract);
}
