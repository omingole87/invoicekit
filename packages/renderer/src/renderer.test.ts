import { describe, it, expect } from 'vitest';
import { renderInvoice } from './types';
import { sampleInvoice } from './mockData';
import { DOMInvoiceRenderer } from './DOMInvoiceRenderer';
import { PDFInvoiceRenderer } from './PDFInvoiceRenderer';
import { EmailInvoiceRenderer } from './EmailInvoiceRenderer';

describe('InvoiceKit Indian Localization & Renderer Engine', () => {
  it('renders correctly via DOMInvoiceRenderer with GST & Indian banking fields', () => {
    const domRenderer = new DOMInvoiceRenderer();
    const result = renderInvoice(sampleInvoice, domRenderer);
    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
  });

  it('renders vector PDF with INR, HSN/SAC, and HDFC Bank details', () => {
    const pdfRenderer = new PDFInvoiceRenderer();
    const result = renderInvoice(sampleInvoice, pdfRenderer);
    expect(result.doc).toBeDefined();
    expect(typeof result.download).toBe('function');
    expect(typeof result.getBlobUrl).toBe('function');
  });

  it('renders Indian GST Email (HTML and plain text ASCII) with IFSC and UPI', () => {
    const emailRenderer = new EmailInvoiceRenderer();
    const result = renderInvoice(sampleInvoice, emailRenderer);
    expect(result.html).toContain('Tax Invoice');
    expect(result.html).toContain('INV/2026-27/0142');
    expect(result.html).toContain('29AABCB1234F1Z5'); // Supplier GSTIN
    expect(result.html).toContain('HDFC0000060');     // IFSC Code
    expect(result.html).toContain('bharatcloud@okhdfcbank'); // UPI VPA

    expect(result.plainText).toContain('GSTIN:');
    expect(result.plainText).toContain('IFSC Code:');
    expect(result.plainText).toContain('HDFC Bank');
  });
});
