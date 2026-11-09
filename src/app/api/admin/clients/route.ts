import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const clients = await dbService.getClients();
    return NextResponse.json({ success: true, clients });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newClient = await dbService.createClient({
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone,
      website: body.website,
      packageName: body.packageName,
      monthlyRetainer: Number(body.monthlyRetainer) || 0,
      status: body.status || "ONBOARDING",
      notes: body.notes,
    });

    return NextResponse.json({ success: true, client: newClient }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Creation failed";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

