import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";

export async function GET() {
  try {
    const faqs = await dbService.getFAQs();
    return NextResponse.json({ success: true, faqs });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch faqs" }, { status: 500 });
  }
}

