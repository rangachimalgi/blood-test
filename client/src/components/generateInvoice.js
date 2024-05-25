import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateInvoice = (order) => {
  if (!order || !order.cartItems) {
    console.error('Invalid order object:', order);
    throw new Error('Invalid order object');
  }

  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text('Invoice', 14, 22);
  doc.setFontSize(12);
  doc.text(`Order ID: ${order._id}`, 14, 30);
  doc.text(`Name: ${order.name}`, 14, 36);
  doc.text(`Email: ${order.email}`, 14, 42);
  doc.text(`Address: ${order.address}`, 14, 48);
  doc.text(`Phone No: ${order.phoneno}`, 14, 54);
  doc.text(`Age: ${order.age}`, 14, 60);

  const tableColumn = ["Product Name", "Quantity", "Price"];
  const tableRows = [];

  order.cartItems.forEach(item => {
    const itemData = [
      item.productName,
      item.quantity,
      item.price
    ];
    tableRows.push(itemData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 70,
  });

  return doc;
};

export default generateInvoice;
