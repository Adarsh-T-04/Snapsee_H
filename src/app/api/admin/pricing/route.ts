import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, price, tagline, isPopular, isActive } = await req.json();
    const updated = await dbService.updatePricingPlan(id, {
      price: price !== undefined ? Number(price) : undefined,
      tagline,
      isPopular,
      isActive,
    });

    return NextResponse.json({ success: true, plan: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update plan";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

