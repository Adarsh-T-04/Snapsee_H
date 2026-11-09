import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";

export async function GET() {
  try {
    const services = await dbService.getServices();
    return NextResponse.json({ success: true, services });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch services" }, { status: 500 });
  }
}

