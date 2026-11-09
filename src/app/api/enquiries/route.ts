import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbService } from "@/lib/db-service";
import { sendEmail, generateCustomerConfirmationEmail, generateAdminNotificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  websiteUrl: z.string().optional().or(z.literal("")),
  industry: z.string().min(2, "Please select or specify your industry"),
  servicesRequired: z.array(z.string()).min(1, "Select at least one service"),
  interestedPlan: z.string().optional(),
  monthlyBudget: z.string().min(1, "Please select an estimated budget"),
  projectDetails: z.string().min(10, "Please provide brief details about your project goals"),
  preferredContact: z.enum(["whatsapp", "email", "phone"]),
  leadSource: z.string().optional(),
  // Honeypot spam field (should be empty if filled by humans)
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. IP-based Rate Limiting (max 5 submissions per minute per IP)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const { allowed } = checkRateLimit(ip, 5, 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submission attempts. Please wait 60 seconds before submitting again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Spam Honeypot Check
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "Enquiry submitted successfully." });
    }

    const validated = enquirySchema.parse(body);

    // 3. Create enquiry in DB / Store
    const enquiry = await dbService.createEnquiry({
      fullName: validated.fullName,
      businessName: validated.businessName,
      email: validated.email,
      phone: validated.phone,
      websiteUrl: validated.websiteUrl || undefined,
      industry: validated.industry,
      servicesRequired: validated.servicesRequired,
      interestedPlan: validated.interestedPlan,
      monthlyBudget: validated.monthlyBudget,
      projectDetails: validated.projectDetails,
      preferredContact: validated.preferredContact,
      leadSource: validated.leadSource || "Website Contact Page",
    });

    // 4. Asynchronously dispatch confirmation to customer
    sendEmail({
      to: enquiry.email,
      subject: `Enquiry Received: ${enquiry.businessName} x Snapsee Agency [${enquiry.id}]`,
      html: generateCustomerConfirmationEmail(enquiry),
    }).catch(err => console.error("Customer email failed:", err));

    // 5. Asynchronously dispatch notification to admin
    sendEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || "adarshtripathi969@gmail.com",
      subject: `🚨 New Lead [${enquiry.id}] - ${enquiry.businessName} (${enquiry.monthlyBudget})`,
      html: generateAdminNotificationEmail(enquiry),
    }).catch(err => console.error("Admin email failed:", err));

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully! Check your email for confirmation.",
      enquiryId: enquiry.id,
      enquiry,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: "Validation failed. Please check the entered fields.",
        errors: error.errors.map(e => ({ field: e.path.join("."), message: e.message })),
      }, { status: 400 });
    }

    console.error("Enquiry submission error:", error);
    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred while processing your enquiry. Please try again or message us on WhatsApp.",
    }, { status: 500 });
  }
}
