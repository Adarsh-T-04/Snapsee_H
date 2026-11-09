import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";

export async function GET() {
  try {
    const plans = await dbService.getPricingPlans();
    return NextResponse.json({ success: true, plans });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch pricing plans" }, { status: 500 });
  }
}

