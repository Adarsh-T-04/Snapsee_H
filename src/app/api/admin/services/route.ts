import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await dbService.getAllServices();
    return NextResponse.json({ success: true, services });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch services" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, shortDesc, badge, isActive } = await req.json();
    const updated = await dbService.updateService(id, {
      title,
      shortDesc,
      badge,
      isActive,
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

