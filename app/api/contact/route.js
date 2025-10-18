import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, // your Gmail address (sender)
    pass: process.env.NEXT_PUBLIC_GMAIL_PASSKEY, // Gmail app password
  },
});

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond directly to the sender.</p>
    </div>
  </div>
`;

// Helper to send email
async function sendEmail(payload) {
  const { name, email, message: userMessage } = payload;

  if (!process.env.NEXT_PUBLIC_EMAIL_ADDRESS || !process.env.NEXT_PUBLIC_GMAIL_PASSKEY) {
    console.error('❌ Missing environment variables');
    return false;
  }

  const mailOptions = {
    from: `Portfolio Contact <${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}>`, // ✅ sender (your Gmail)
    to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, // ✅ receiver (your Gmail)
    subject: `New Message From ${name}`,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email, // ✅ reply goes to user’s email
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.response);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return false;
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message } = payload;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailSuccess = await sendEmail(payload);

    if (emailSuccess) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully!' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send email.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('💥 Server error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Server error occurred.' },
      { status: 500 }
    );
  }
}
