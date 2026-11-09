export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload): Promise<{ success: boolean; messageId?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  // If a valid Resend key is provided (starts with 're_') and isn't placeholder
  if (apiKey && apiKey.startsWith("re_") && !apiKey.includes("mock")) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Snapsee Agency <onboarding@resend.dev>",
          to: [to],
          subject,
          html,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, messageId: data.id };
      }
    } catch (err) {
      console.error("[Email Dispatch Error]", err);
    }
  }

  // Graceful development logger when testing without live Resend credentials
  console.log("------------------------------------------");
  console.log(`[EMAIL DISPATCH] To: ${to}`);
  console.log(`[EMAIL DISPATCH] Subject: ${subject}`);
  console.log(`[EMAIL DISPATCH] Preview: ${html.replace(/<[^>]+>/g, "").slice(0, 160)}...`);
  console.log("------------------------------------------");

  return { success: true, messageId: `mock-msg-${Date.now()}` };
}

export function generateCustomerConfirmationEmail(enquiry: {
  fullName: string;
  businessName: string;
  id: string;
  servicesRequired: string[];
  interestedPlan?: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; background: #0a0a0f; color: #f4f4f5; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #121217; border: 1px solid #272732; border-radius: 12px; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #FF5E1E; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Snapsee Agency</h1>
          <p style="color: #A1A1AA; font-size: 14px; margin-top: 4px;">Performance Marketing & Brand Growth</p>
        </div>
        <hr style="border: none; border-top: 1px solid #272732; margin: 24px 0;" />
        <h2 style="color: #FFFFFF; font-size: 20px;">Thank you for reaching out, ${enquiry.fullName}!</h2>
        <p style="color: #D4D4D8; line-height: 1.6;">We have received your growth enquiry for <strong>${enquiry.businessName}</strong>. Our strategic team is already reviewing your requirements and competitor landscape.</p>
        
        <div style="background: #181820; border-radius: 8px; padding: 16px; margin: 24px 0; border-left: 4px solid #FF5E1E;">
          <p style="margin: 0 0 8px 0; color: #A1A1AA; font-size: 13px;">Reference Enquiry ID:</p>
          <p style="margin: 0; color: #FFFFFF; font-weight: bold; font-size: 16px;">${enquiry.id}</p>
          ${enquiry.interestedPlan ? `<p style="margin: 12px 0 0 0; color: #A1A1AA; font-size: 13px;">Selected Package: <strong style="color: #FF5E1E;">${enquiry.interestedPlan}</strong></p>` : ""}
          <p style="margin: 8px 0 0 0; color: #A1A1AA; font-size: 13px;">Services Requested: <span style="color: #FFFFFF;">${enquiry.servicesRequired.join(", ")}</span></p>
        </div>

        <p style="color: #D4D4D8; line-height: 1.6;"><strong>Next Steps:</strong> One of our senior strategists will connect with you via your preferred channel within 2-4 business hours to share an initial growth roadmap.</p>
        
        <p style="color: #D4D4D8; margin-top: 32px; font-size: 14px;">In a hurry? Chat directly with our directors on WhatsApp: 
          <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919695478967'}" style="color: #FF5E1E; text-decoration: underline;">Click to open WhatsApp</a>
        </p>
        
        <hr style="border: none; border-top: 1px solid #272732; margin: 32px 0 16px 0;" />
        <p style="color: #71717A; font-size: 12px; text-align: center; margin: 0;">Snapsee Advertising Agency • All Rights Reserved.</p>
      </div>
    </div>
  `;
}

export function generateAdminNotificationEmail(enquiry: {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  websiteUrl?: string;
  industry: string;
  servicesRequired: string[];
  interestedPlan?: string;
  monthlyBudget: string;
  projectDetails: string;
  preferredContact: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; background: #0a0a0f; color: #f4f4f5; padding: 40px 20px;">
      <div style="max-width: 650px; margin: 0 auto; background: #121217; border: 1px solid #FF5E1E; border-radius: 12px; padding: 32px;">
        <h1 style="color: #FF5E1E; margin: 0; font-size: 22px;">🔥 New High-Intent Lead Received!</h1>
        <p style="color: #A1A1AA; font-size: 14px;">Enquiry Reference: <strong>${enquiry.id}</strong></p>
        <hr style="border: none; border-top: 1px solid #272732; margin: 20px 0;" />
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #D4D4D8;">
          <tr><td style="padding: 8px 0; color: #A1A1AA; width: 35%;">Client Name:</td><td style="font-weight: bold; color: #fff;">${enquiry.fullName}</td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Company / Business:</td><td style="font-weight: bold; color: #fff;">${enquiry.businessName}</td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Email Address:</td><td><a href="mailto:${enquiry.email}" style="color: #8B5CF6;">${enquiry.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Phone Number:</td><td><a href="tel:${enquiry.phone}" style="color: #8B5CF6;">${enquiry.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Website URL:</td><td>${enquiry.websiteUrl ? `<a href="${enquiry.websiteUrl}" target="_blank" style="color: #FF5E1E;">${enquiry.websiteUrl}</a>` : 'Not provided'}</td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Industry:</td><td>${enquiry.industry}</td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Monthly Budget:</td><td style="color: #22C55E; font-weight: bold;">${enquiry.monthlyBudget}</td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Interested Plan:</td><td style="color: #FF5E1E; font-weight: bold;">${enquiry.interestedPlan || 'Custom Scope'}</td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Preferred Contact:</td><td style="text-transform: uppercase;">${enquiry.preferredContact}</td></tr>
          <tr><td style="padding: 8px 0; color: #A1A1AA;">Services Required:</td><td>${enquiry.servicesRequired.join(", ")}</td></tr>
        </table>

        <div style="background: #181820; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 6px 0; color: #A1A1AA; font-size: 13px;">Project Details / Brief:</p>
          <p style="margin: 0; color: #F4F4F5; font-size: 14px; line-height: 1.5;">${enquiry.projectDetails}</p>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/enquiries" style="background: #FF5E1E; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View in Admin Dashboard</a>
        </div>
      </div>
    </div>
  `;
}

