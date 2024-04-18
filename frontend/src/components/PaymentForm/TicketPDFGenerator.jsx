import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

const TicketPDFGenerator = ({ ticketDetails }) => {
  const [qrCodeURL, setQrCodeURL] = useState('');

  useEffect(() => {
    // Generate QR Code
    const generateQR = async (text) => {
      try {
        const url = await QRCode.toDataURL(text);
        setQrCodeURL(url);
      } catch (err) {
        console.error(err);
      }
    };

    // Assuming ticketDetails can be serialized to a string for QR code generation
    const ticketString = JSON.stringify({
      movieTitle: ticketDetails.movieTitle,
      theater: ticketDetails.theater,
      showtime: ticketDetails.showtime,
      selectedSeats: ticketDetails.selectedSeats.join(", "),
      totalPrice: ticketDetails.totalPrice.toFixed(2),
    });
    generateQR(ticketString);
  }, [ticketDetails]);

  const downloadPDF = () => {
    const input = document.getElementById('ticket');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("movie_ticket.pdf");
    });
  };

  return (
    <div>
      <div id="ticket" style={{ width: '210mm', minHeight: '297mm', margin: '10mm auto', background: '#FFF', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20mm' }}>
        {/* Ticket details */}
        <h2>{ticketDetails.movieTitle}</h2>
        <p>Theatre: {ticketDetails.theater}</p>
        <p>Showtime: {new Date(ticketDetails.showtime).toLocaleString()}</p>
        <p>Seats: {ticketDetails.selectedSeats.join(", ")}</p>
        <p>Total Price: ${ticketDetails.totalPrice.toFixed(2)}</p>
        {/* QR Code display */}
        {qrCodeURL && <img src={qrCodeURL} alt="Ticket QR Code" style={{ margin: '10px 0' }} />}
      </div>
      <button onClick={downloadPDF} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Download Ticket as PDF
      </button>
    </div>
  );
};

export default TicketPDFGenerator;
