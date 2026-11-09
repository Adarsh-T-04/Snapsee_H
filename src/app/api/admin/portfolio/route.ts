import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await dbService.getProjects();
    return NextResponse.json({ success: true, projects });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newProject = await dbService.createProject({
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      clientName: body.clientName,
      category: body.category,
      objective: body.objective,
      creativeWork: body.creativeWork,
      resultsMetrics: body.resultsMetrics || [],
      caseStudy: body.caseStudy,
      imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      isFeatured: body.isFeatured ?? true,
      isDemo: body.isDemo ?? true,
      displayOrder: body.displayOrder || 0,
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Creation failed";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...data } = await req.json();
    const updated = await dbService.updateProject(id, data);
    return NextResponse.json({ success: true, project: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
  }

  try {
    await dbService.deleteProject(id);
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}

