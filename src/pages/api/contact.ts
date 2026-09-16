import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Invalid submission");
    }
  } catch {
    return Response.json({ message: "Invalid submission" }, { status: 400 });
  }
  const { firstName, lastName, email, phone, message, sessionPreference } = data;

  if (
    ![firstName, email, message].every(
      (value) => typeof value === "string" && value.trim()
    )
  ) {
    return Response.json({ message: "Missing required fields" }, { status: 400 });
  }

  const sendEmail = async () => {
    try {
      const runtimeEnv = locals.runtime?.env ?? {};
      const resendApiKey =
        runtimeEnv.RESEND_API_KEY ??
        import.meta.env.RESEND_API_KEY ??
        process.env.RESEND_API_KEY;
      const resendFrom =
        runtimeEnv.RESEND_FROM ??
        import.meta.env.RESEND_FROM ??
        process.env.RESEND_FROM;

      if (!resendApiKey || !resendFrom) {
        console.error("Missing RESEND_API_KEY or RESEND_FROM environment variable");
        return;
      }

      const resend = new Resend(resendApiKey);
      const mailOptions = {
        from: resendFrom,
        to: "outreach@acmvit.in",
        replyTo: email as string,
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
          <p>${(message as string).replace(/\n/g, "<br/>")}</p>
        `,
      };

      const { error } = await resend.emails.send(mailOptions);
      if (error) console.error("Error sending email:", error);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const emailTask = sendEmail();
  if (locals.runtime?.ctx) {
    locals.runtime.ctx.waitUntil(emailTask);
  } else {
    // Local runtimes without an execution context can still send asynchronously.
    void emailTask;
  }

  return Response.json({
    message: "Submission received",
    flag: "zdk{w3lcom3_fr0m_ACM}",
  });
};
