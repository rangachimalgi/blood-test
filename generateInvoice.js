import PDFDocument from 'pdfkit';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Convert the module's URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateInvoice = (order) => {
  return new Promise((resolve, reject) => {
    const invoicesDir = path.join(__dirname, 'invoices');
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir);
    }

    const filePath = path.join(invoicesDir, `invoice_${order._id}.pdf`);

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    doc.fontSize(20).text('Invoice', { align: 'center' });

    doc.moveDown();
    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.text(`Name: ${order.name}`);
    doc.text(`Email: ${order.email}`);
    doc.text(`Address: ${order.address}`);
    doc.text(`Phone No: ${order.phoneno}`);
    doc.text(`Age: ${order.age}`);
    doc.moveDown();
    doc.text('Products:');
    order.cartItems.forEach((item) => {
      doc.text(`- ${item.productName}`);
    });

    doc.end();

    writeStream.on('finish', () => {
      resolve(filePath);
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
  });
};

export default generateInvoice;
