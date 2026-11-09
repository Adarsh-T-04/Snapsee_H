import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await dbService.getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to load dashboard metrics" }, { status: 500 });
  }
}

