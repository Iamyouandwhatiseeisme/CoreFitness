import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(request: NextRequest) {
  const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    secureConnection: false,

    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  } as SMTPTransport.Options);

  if (request) {
    const formData = await request.formData();
    const from = formData.get("from") as string;
    const subject = formData.get("subject") as string;
    const content = formData.get("content") as string;

    if (content && from && subject) {
      try {
        const info = await transport.sendMail({
          from: from,
          to: "saabashidze@gmail.com",
          subject: subject,
          text: content,
          html: `<strong>${content}</strong>`,
        });
        if (info) {
          return NextResponse.json({ data: info, status: 200 });
        }

        return NextResponse.json({ error: "error", status: 400 });
      } catch (error) {
        console.error("Error sending email:", error);

        return NextResponse.json({ error: error, status: 400 });
      }
    }
  }
}
