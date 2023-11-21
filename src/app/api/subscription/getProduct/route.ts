export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { getProduct } from "~/data/subscription";

export async function GET() {
  const product = await getProduct();
  if (!product)
    return new Response("Unauthorized", { status: 401 });
  return NextResponse.json({ product });
}