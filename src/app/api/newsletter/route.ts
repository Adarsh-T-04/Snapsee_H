import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = newsletterSchema.parse(body);

    // Record subscriber
    console.log(`[Newsletter] Subscribed email: ${email}`);

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to our growth insights!",
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Invalid email address",
    }, { status: 400 });
  }
}

