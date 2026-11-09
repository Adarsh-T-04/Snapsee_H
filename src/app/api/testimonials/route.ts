import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";

export async function GET() {
  try {
    const testimonials = await dbService.getTestimonials();
    return NextResponse.json({ success: true, testimonials });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch testimonials" }, { status: 500 });
  }
}

