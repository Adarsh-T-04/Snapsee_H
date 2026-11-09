import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getAdminSession } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await req.json();
    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, message: "Note content cannot be empty" }, { status: 400 });
    }

    const note = await dbService.addEnquiryNote(
      params.id,
      session.name || "Agency Admin",
      content.trim()
    );

    return NextResponse.json({ success: true, note });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to add note";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

