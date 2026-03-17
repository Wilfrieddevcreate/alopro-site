import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, department, subject, message } = body;

    // Validation
    if (!name || !email || !department || !subject || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const deptLabels: Record<string, string> = {
      dev: "Développement",
      research: "Recherches Innovantes",
      training: "Formations",
      other: "Autre",
    };

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1F6FEB; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Nouveau message — ALOPRO</h1>
        </div>
        <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Nom</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                <a href="mailto:${email}" style="color: #1F6FEB;">${email}</a>
              </td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Téléphone</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${phone}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Département</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${deptLabels[department] || department}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Sujet</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${subject}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Message :</p>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #0f172a; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"ALOPRO Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Contact ALOPRO] ${subject} — ${name}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
