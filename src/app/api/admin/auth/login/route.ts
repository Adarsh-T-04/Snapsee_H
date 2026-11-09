import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Default admin credential verification (or database-backed user)
    const validEmail = "admin@snapsee.com";
    const validPassword = "Admin@Snapsee2026!";

    // Allow standard admin or configured admin credentials
    if (
      (email === validEmail && password === validPassword) ||
      (email === "adarshtripathi969@gmail.com" && password === "Admin@Snapsee2026!") ||
      (email === "demo@snapsee.com" && password === "demo123")
    ) {
      const token = await createSessionToken({
        userId: "admin-1",
        email: email,
        name: email.includes("adarsh") ? "Adarsh (Founder)" : "Agency Director",
        role: "ADMIN",
      });

      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: { email, name: "Agency Director", role: "ADMIN" },
      });

      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid email or password credentials" },
      { status: 401 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

