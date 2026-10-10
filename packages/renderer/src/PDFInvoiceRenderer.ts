import { jsPDF } from 'jspdf';
import {
  InvoiceRendererOutput,
  InvoiceStatusType,
  Party,
  InvoiceItem,
  InvoiceTotals,
  PaymentDetails,
  formatIndianCurrency,
} from './types';

export interface PDFResult {
  doc: jsPDF;
  download: (filename?: string) => void;
  getBlobUrl: () => string;
}

export class PDFInvoiceRenderer implements InvoiceRendererOutput<PDFResult> {
  private headerData?: {
    title: string;
    invoiceNumber: string;
    status: InvoiceStatusType;
    issueDate: string;
    dueDate: string;
    placeOfSupply?: string;
  };
  private issuerData?: Party;
  private clientData?: Party;
  private rowsData: InvoiceItem[] = [];
  private totalsData?: InvoiceTotals;
  private notesData?: { notes?: string; terms?: string };
  private footerData?: PaymentDetails;

  header(
    title: string,
    invoiceNumber: string,
    status: InvoiceStatusType,
    issueDate: string,
    dueDate: string,
    placeOfSupply?: string
  ): void {
    this.headerData = { title, invoiceNumber, status, issueDate, dueDate, placeOfSupply };
  }

  parties(issuer: Party, client: Party): void {
    this.issuerData = issuer;
    this.clientData = client;
  }

  row(item: InvoiceItem): void {
    this.rowsData.push(item);
  }

  total(totals: InvoiceTotals): void {
    this.totalsData = totals;
  }

  notes(notes?: string, terms?: string): void {
    this.notesData = { notes, terms };
  }

  footer(paymentDetails?: PaymentDetails): void {
    this.footerData = paymentDetails;
  }

  getResult(): PDFResult {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const margin = 16;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    // Brand accent bar at top
    doc.setFillColor(79, 70, 229); // Indigo-600
    doc.rect(margin, y, contentWidth, 3, 'F');
    y += 11;

    // Header: Title & Invoice Number
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text(this.headerData?.title || 'TAX INVOICE', margin, y);

    // Metadata Right-Aligned
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`Invoice No: ${this.headerData?.invoiceNumber || ''}`, pageWidth - margin, y - 1, { align: 'right' });
    doc.text(`Status: ${(this.headerData?.status || 'PENDING').toUpperCase()}`, pageWidth - margin, y + 4, { align: 'right' });
    doc.text(`Date of Issue: ${this.headerData?.issueDate || ''}`, pageWidth - margin, y + 9, { align: 'right' });
    doc.text(`Payment Due: ${this.headerData?.dueDate || ''}`, pageWidth - margin, y + 14, { align: 'right' });

    if (this.headerData?.placeOfSupply) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(79, 70, 229);
      doc.text(`Place of Supply: ${this.headerData.placeOfSupply}`, margin, y + 6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
    }

    y += 22;

    // Separator line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 7;

    // Parties Section (Billed By / Billed To)
    const col2X = margin + contentWidth / 2 + 2;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text('BILLED BY (SUPPLIER)', margin, y);
    doc.text('BILLED TO (BUYER)', col2X, y);
    y += 4.5;

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(this.issuerData?.name || '', margin, y);
    doc.text(this.clientData?.name || '', col2X, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    if (this.issuerData?.address) {
      const splitIssuer = doc.splitTextToSize(this.issuerData.address, contentWidth / 2 - 4);
      doc.text(splitIssuer, margin, y);
    }
    if (this.clientData?.address) {
      const splitClient = doc.splitTextToSize(this.clientData.address, contentWidth / 2 - 4);
      doc.text(splitClient, col2X, y);
    }
    y += 9;

    // GSTIN & PAN details
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(79, 70, 229);
    if (this.issuerData?.gstin) doc.text(`GSTIN: ${this.issuerData.gstin}`, margin, y);
    if (this.clientData?.gstin) doc.text(`GSTIN: ${this.clientData.gstin}`, col2X, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    if (this.issuerData?.pan) doc.text(`PAN: ${this.issuerData.pan}`, margin, y);
    if (this.clientData?.pan) doc.text(`PAN: ${this.clientData.pan}`, col2X, y);
    y += 4;

    if (this.issuerData?.state) doc.text(`State: ${this.issuerData.state} (${this.issuerData.stateCode || ''})`, margin, y);
    if (this.clientData?.state) doc.text(`State: ${this.clientData.state} (${this.clientData.stateCode || ''})`, col2X, y);
    y += 8;

    // Table Header
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, y, contentWidth, 7.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text('DESCRIPTION', margin + 3, y + 5);
    doc.text('HSN/SAC', margin + 98, y + 5, { align: 'center' });
    doc.text('QTY', margin + 120, y + 5, { align: 'right' });
    doc.text('RATE (INR)', margin + 148, y + 5, { align: 'right' });
    doc.text('AMOUNT (INR)', pageWidth - margin - 3, y + 5, { align: 'right' });
    y += 7.5;

    // Table Rows
    const fmt = (n: number) => {
      return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(n);
    };

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    this.rowsData.forEach((row, i) => {
      if (i % 2 === 1) {
        doc.setFillColor(249, 250, 251);
        doc.rect(margin, y, contentWidth, 7, 'F');
      }
      doc.setTextColor(15, 23, 42);
      doc.text(row.description, margin + 3, y + 4.8);
      doc.text(row.hsnSac || '—', margin + 98, y + 4.8, { align: 'center' });
      doc.text(String(row.quantity), margin + 120, y + 4.8, { align: 'right' });
      doc.text(fmt(row.unitPrice), margin + 148, y + 4.8, { align: 'right' });
      doc.setFont('helvetica', 'bold');
      doc.text(fmt(row.amount), pageWidth - margin - 3, y + 4.8, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      y += 7;
    });

    y += 3;
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // Totals Block with GST breakdown
    if (this.totalsData) {
      const totalsX = pageWidth - margin - 75;
      const valuesX = pageWidth - margin - 3;

      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text('Taxable Value:', totalsX, y);
      doc.text(`INR ${fmt(this.totalsData.subtotal)}`, valuesX, y, { align: 'right' });
      y += 4.5;

      if (this.totalsData.discount) {
        doc.text('Discount:', totalsX, y);
        doc.setTextColor(185, 28, 28);
        doc.text(`-INR ${fmt(this.totalsData.discount)}`, valuesX, y, { align: 'right' });
        doc.setTextColor(71, 85, 105);
        y += 4.5;
      }

      if (this.totalsData.isInterstate) {
        doc.text(`IGST (${this.totalsData.taxRate}%):`, totalsX, y);
        doc.text(`INR ${fmt(this.totalsData.igstAmount || this.totalsData.taxAmount)}`, valuesX, y, { align: 'right' });
        y += 5;
      } else {
        doc.text(`CGST (${this.totalsData.taxRate / 2}%):`, totalsX, y);
        doc.text(`INR ${fmt(this.totalsData.cgstAmount || this.totalsData.taxAmount / 2)}`, valuesX, y, { align: 'right' });
        y += 4.5;
        doc.text(`SGST (${this.totalsData.taxRate / 2}%):`, totalsX, y);
        doc.text(`INR ${fmt(this.totalsData.sgstAmount || this.totalsData.taxAmount / 2)}`, valuesX, y, { align: 'right' });
        y += 5;
      }

      doc.setLineWidth(0.6);
      doc.setDrawColor(79, 70, 229);
      doc.line(totalsX, y, valuesX, y);
      y += 4.5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Total Due:', totalsX, y);
      doc.setTextColor(79, 70, 229);
      doc.text(`INR ${fmt(this.totalsData.total)}`, valuesX, y, { align: 'right' });
      y += 11;
    }

    // Indian Banking & Payment Details
    if (this.footerData) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      doc.text('INDIAN BANKING DETAILS (NEFT / RTGS / IMPS / UPI):', margin, y);
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(
        `Bank: ${this.footerData.bankName} | A/C No: ${this.footerData.accountNumber} (${this.footerData.accountType || 'Current'} A/C)`,
        margin,
        y
      );
      y += 4;
      doc.text(
        `IFSC Code: ${this.footerData.ifscCode} | UPI VPA: ${this.footerData.upiId || 'N/A'} | Branch: ${this.footerData.branch || 'N/A'}`,
        margin,
        y
      );
      y += 6;
    }

    if (this.notesData?.notes) {
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Note: ${this.notesData.notes}`, margin, y);
      y += 4;
    }

    // Signatory
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 65, 85);
    doc.text(`For ${this.issuerData?.name || 'Company'}`, pageWidth - margin, y + 4, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('Authorized Signatory', pageWidth - margin, y + 14, { align: 'right' });

    // Bottom note
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('This is a computer-generated tax invoice compliant with Indian GST laws.', margin, 287);

    return {
      doc,
      download: (filename = `Tax-Invoice-${this.headerData?.invoiceNumber?.replace(/[^a-zA-Z0-9-]/g, '_') || 'draft'}.pdf`) => {
        doc.save(filename);
      },
      getBlobUrl: () => {
        return doc.output('bloburl').toString();
      },
    };
  }
}
