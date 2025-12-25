import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { firstName, lastName, email, phone, message, sessionPreference } = data;

  if (!firstName || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  // Check for credentials
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const resendFrom = import.meta.env.RESEND_FROM;

  if (!resendApiKey || !resendFrom) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM environment variable");
    return new Response(
      JSON.stringify({
        message: "Server configuration error: Missing email credentials",
      }),
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);

  const mailOptions = {
    from: resendFrom,
    to: "outreach@acmvit.in",
    reply_to: email,
    subject: `New Contact Form Submission from ${firstName} ${lastName || ""}`,
    text: `
      Name: ${firstName} ${lastName || ""}
      Email: ${email}
      Phone: ${phone || "N/A"}
      
      Mentoring Session Preference: ${sessionPreference || "N/A"}
      
      Message:
      ${message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Mentoring Session Preference:</strong> ${sessionPreference || "N/A"}</p>
      <br/>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  };

  try {
    const { error } = await resend.emails.send(mailOptions);
    if (error) {
      console.error("Error sending email:", error);
      return new Response(
        JSON.stringify({
          message: "Failed to send email",
          error: error.message ?? error,
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
        error: error instanceof Error ? error.message : error,
      }),
      { status: 500 }
    );
  }
};
