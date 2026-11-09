import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "ALL";
  const search = searchParams.get("search") || "";
  const format = searchParams.get("format");

  try {
    const enquiries = await dbService.getEnquiries({ status, search });

    // CSV Export option
    if (format === "csv") {
      const headers = [
        "Enquiry ID",
        "Date",
        "Full Name",
        "Business Name",
        "Email",
        "Phone",
        "Website",
        "Industry",
        "Budget",
        "Interested Plan",
        "Services",
        "Status",
        "Lead Source"
      ];

      const csvRows = [headers.join(",")];

      enquiries.forEach(e => {
        const row = [
          `"${e.id}"`,
          `"${new Date(e.createdAt).toLocaleDateString()}"`,
          `"${e.fullName.replace(/"/g, '""')}"`,
          `"${e.businessName.replace(/"/g, '""')}"`,
          `"${e.email}"`,
          `"${e.phone}"`,
          `"${e.websiteUrl || ""}"`,
          `"${e.industry}"`,
          `"${e.monthlyBudget}"`,
          `"${e.interestedPlan || ""}"`,
          `"${e.servicesRequired.join("; ")}"`,
          `"${e.status}"`,
          `"${e.leadSource}"`,
        ];
        csvRows.push(row.join(","));
      });

      return new NextResponse(csvRows.join("\n"), {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename=enquiries-export-${new Date().toISOString().slice(0, 10)}.csv`,
        },
      });
    }

    return NextResponse.json({ success: true, enquiries });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch enquiries" }, { status: 500 });
  }
}

