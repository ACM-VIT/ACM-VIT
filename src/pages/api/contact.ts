import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

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
  const emailUser = import.meta.env.EMAIL_USER || "outreach.acmvit@gmail.com";
  const emailPass = import.meta.env.EMAIL_PASS;

  if (!emailPass) {
    console.error("Missing EMAIL_PASS environment variable");
    return new Response(
      JSON.stringify({
        message: "Server configuration error: Missing email credentials",
      }),
      { status: 500 }
    );
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: emailUser,
    to: "outreach.acmvit@gmail.com",
    replyTo: email,
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
    await transporter.sendMail(mailOptions);
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
