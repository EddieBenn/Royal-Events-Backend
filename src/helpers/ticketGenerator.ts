import PDFDocument from 'pdfkit';
import * as nodemailer from 'nodemailer';
import fs from 'fs';
import cloudinary from 'cloudinary';

const cloudinaryConfig = ({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

cloudinary.v2.config(cloudinaryConfig);


export async function generateBeautifulTicketPDF(ticketData: any, eventImage: string) {
  const imageResponse = await cloudinary.v2.uploader.upload(eventImage, { format: 'png' });
  const eventImageBuffer = Buffer.from(imageResponse.secure_url, 'base64');

  const doc = new PDFDocument();

  // Customize the PDF content and layout using pdfkit's features
  doc.pipe(fs.createWriteStream(`ticket_${ticketData.id}.pdf`));
  doc.image(eventImageBuffer);
  doc.font('Helvetica');
  doc.fontSize(20);
  doc.text(`Ticket ID: ${ticketData.id}`);
  // ... Add other ticket information using pdfkit's methods
  doc.end();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.GMAIL_USER}`,
      pass: `${process.env.GMAIL_PASSWORD}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'yourEmail@example.com',
    to: ticketData.owner_email,
    subject: 'Your Tickets Are Here!',
    text: 'Enjoy the event!',
    attachments: [
      {
        filename: `ticket_${ticketData.id}.pdf`,
        path: `ticket_${ticketData.id}.pdf`, // Path to the generated PDF
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}
