import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getAdminSession } from "@/lib/auth";
import { EnquiryStatus } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const enquiry = await dbService.getEnquiryById(params.id);
  if (!enquiry) {
    return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, enquiry });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status, assignedToName } = await req.json();
    const updated = await dbService.updateEnquiryStatus(
      params.id, 
      status as EnquiryStatus, 
      assignedToName
    );

    return NextResponse.json({
      success: true,
      message: `Enquiry status updated to ${status}`,
      enquiry: updated,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbService.deleteEnquiry(params.id);
    return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete" }, { status: 500 });
  }
}

