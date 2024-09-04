import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (to: string, token: string) => {
  try {
    const response = await transport.sendMail({
      from: `${process.env.GMAIL_USER}`,
      to,
      subject: "PLEASE VERIFY YOUR ACCOUNT",
      html: `<div width="50%" style="text-align: center; padding: 25px; border-radius: 5px; border: 2px solid #27AE60;"><h1>Welcome to Royal Events</h1>
            <p style="margin-bottom: 10px">Click the button below to verify your account</p>
            <br />
            <a href="${process.env.APP_BASE_URL}/${token}" style="text-align: center; padding: 10px; border-radius: 10px; background: #27AE60; text-decoration: none; color: white;">Verify Account</a></div>`,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};
