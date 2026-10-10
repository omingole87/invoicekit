import {
  InvoiceRendererOutput,
  InvoiceStatusType,
  Party,
  InvoiceItem,
  InvoiceTotals,
  PaymentDetails,
  formatIndianCurrency,
} from './types';

export interface EmailInvoiceResult {
  html: string;
  plainText: string;
}

export class EmailInvoiceRenderer implements InvoiceRendererOutput<EmailInvoiceResult> {
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

  getResult(): EmailInvoiceResult {
    const currency = this.totalsData?.currency || 'INR';
    const fmt = (n: number) => formatIndianCurrency(n, currency);

    // Build Responsive HTML Email with inline styles
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.headerData?.title || 'Tax Invoice'} ${this.headerData?.invoiceNumber || ''}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 660px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
    <!-- Top accent bar -->
    <tr>
      <td height="4" style="background-color: #4F46E5;"></td>
    </tr>
    <!-- Header -->
    <tr>
      <td style="padding: 32px 32px 20px 32px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td valign="top">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #0F172A;">${this.headerData?.title || 'TAX INVOICE'}</h1>
              <p style="margin: 4px 0 0 0; font-family: monospace; font-size: 13px; font-weight: 600; color: #4338CA;">${this.headerData?.invoiceNumber || ''}</p>
              ${this.headerData?.placeOfSupply ? `<div style="font-size: 12px; color: #64748B; margin-top: 4px;">Place of Supply: <strong>${this.headerData.placeOfSupply}</strong></div>` : ''}
              <div style="margin-top: 8px;">
                <span style="display: inline-block; padding: 2px 10px; font-size: 11px; font-weight: 600; text-transform: uppercase; border-radius: 9999px; background-color: #EEF2FF; color: #4338CA;">
                  ${this.headerData?.status || 'PENDING'}
                </span>
                <span style="display: inline-block; padding: 2px 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; border-radius: 9999px; background-color: #ECFDF5; color: #065F46; margin-left: 6px;">
                  GST COMPLIANT
                </span>
              </div>
            </td>
            <td align="right" valign="top" style="font-size: 12px; line-height: 1.6; color: #64748B;">
              <div><strong>Invoice Date:</strong> ${this.headerData?.issueDate || ''}</div>
              <div><strong>Payment Due:</strong> <span style="color: #DC2626; font-weight: 600;">${this.headerData?.dueDate || ''}</span></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Divider -->
    <tr>
      <td style="padding: 0 32px;"><div style="height: 1px; background-color: #E2E8F0;"></div></td>
    </tr>
    <!-- Parties: GSTIN & PAN -->
    <tr>
      <td style="padding: 20px 32px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="50%" valign="top" style="font-size: 12px; line-height: 1.5; color: #475569; padding-right: 12px;">
              <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #94A3B8; margin-bottom: 4px;">Billed By (Supplier)</div>
              <div style="font-size: 14px; font-weight: 600; color: #0F172A;">${this.issuerData?.name || ''}</div>
              ${this.issuerData?.address ? `<div>${this.issuerData.address}</div>` : ''}
              ${this.issuerData?.gstin ? `<div style="margin-top: 4px; font-size: 11px; color: #4338CA;"><strong>GSTIN:</strong> ${this.issuerData.gstin}</div>` : ''}
              ${this.issuerData?.pan ? `<div style="font-size: 11px; color: #64748B;"><strong>PAN:</strong> ${this.issuerData.pan}</div>` : ''}
              ${this.issuerData?.state ? `<div style="font-size: 11px; color: #64748B;">State: ${this.issuerData.state} (${this.issuerData.stateCode || ''})</div>` : ''}
            </td>
            <td width="50%" valign="top" style="font-size: 12px; line-height: 1.5; color: #475569; padding-left: 12px; border-left: 1px solid #E2E8F0;">
              <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #94A3B8; margin-bottom: 4px;">Billed To (Buyer)</div>
              <div style="font-size: 14px; font-weight: 600; color: #0F172A;">${this.clientData?.name || ''}</div>
              ${this.clientData?.address ? `<div>${this.clientData.address}</div>` : ''}
              ${this.clientData?.gstin ? `<div style="margin-top: 4px; font-size: 11px; color: #4338CA;"><strong>GSTIN:</strong> ${this.clientData.gstin}</div>` : ''}
              ${this.clientData?.pan ? `<div style="font-size: 11px; color: #64748B;"><strong>PAN:</strong> ${this.clientData.pan}</div>` : ''}
              ${this.clientData?.state ? `<div style="font-size: 11px; color: #64748B;">State: ${this.clientData.state} (${this.clientData.stateCode || ''})</div>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Items Table with HSN/SAC -->
    <tr>
      <td style="padding: 0 32px 20px 32px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #E2E8F0; border-radius: 6px; overflow: hidden; border-collapse: collapse;">
          <tr style="background-color: #F8FAFC;">
            <th align="left" style="padding: 10px 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; color: #475569; border-bottom: 1px solid #E2E8F0;">Description</th>
            <th align="center" style="padding: 10px 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; color: #475569; border-bottom: 1px solid #E2E8F0;">HSN/SAC</th>
            <th align="right" style="padding: 10px 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; color: #475569; border-bottom: 1px solid #E2E8F0;">Qty</th>
            <th align="right" style="padding: 10px 10px; font-size: 11px; font-weight: 600; text-transform: uppercase; color: #475569; border-bottom: 1px solid #E2E8F0;">Rate (₹)</th>
            <th align="right" style="padding: 10px 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; color: #475569; border-bottom: 1px solid #E2E8F0;">Amount (₹)</th>
          </tr>
          ${this.rowsData
            .map(
              (r, i) => `
          <tr style="background-color: ${i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'};">
            <td style="padding: 10px 12px; font-size: 12px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${r.description}</td>
            <td align="center" style="padding: 10px 8px; font-size: 11px; font-family: monospace; color: #64748B; border-bottom: 1px solid #E2E8F0;">${r.hsnSac || '—'}</td>
            <td align="right" style="padding: 10px 8px; font-size: 12px; font-family: monospace; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${r.quantity}</td>
            <td align="right" style="padding: 10px 10px; font-size: 12px; font-family: monospace; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${fmt(r.unitPrice)}</td>
            <td align="right" style="padding: 10px 12px; font-size: 12px; font-family: monospace; font-weight: 600; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${fmt(r.amount)}</td>
          </tr>`
            )
            .join('')}
        </table>
      </td>
    </tr>
    <!-- Totals & GST Breakdown -->
    <tr>
      <td style="padding: 0 32px 20px 32px;" align="right">
        <table border="0" cellspacing="0" cellpadding="0" style="width: 280px; font-size: 12px; color: #475569;">
          <tr>
            <td style="padding: 3px 0;">Taxable Value:</td>
            <td align="right" style="font-family: monospace; color: #0F172A;">${fmt(this.totalsData?.subtotal || 0)}</td>
          </tr>
          ${
            this.totalsData?.discount
              ? `
          <tr>
            <td style="padding: 3px 0; color: #DC2626;">Discount:</td>
            <td align="right" style="font-family: monospace; color: #DC2626;">-${fmt(this.totalsData.discount)}</td>
          </tr>`
              : ''
          }
          ${
            this.totalsData?.isInterstate
              ? `
          <tr>
            <td style="padding: 3px 0;">IGST (${this.totalsData.taxRate}%):</td>
            <td align="right" style="font-family: monospace; color: #0F172A;">${fmt(this.totalsData.igstAmount || this.totalsData.taxAmount)}</td>
          </tr>`
              : `
          <tr>
            <td style="padding: 3px 0;">CGST (${(this.totalsData?.taxRate || 0) / 2}%):</td>
            <td align="right" style="font-family: monospace; color: #0F172A;">${fmt(this.totalsData?.cgstAmount || (this.totalsData?.taxAmount || 0) / 2)}</td>
          </tr>
          <tr>
            <td style="padding: 3px 0;">SGST (${(this.totalsData?.taxRate || 0) / 2}%):</td>
            <td align="right" style="font-family: monospace; color: #0F172A;">${fmt(this.totalsData?.sgstAmount || (this.totalsData?.taxAmount || 0) / 2)}</td>
          </tr>`
          }
          <tr>
            <td colspan="2" style="padding: 6px 0;"><div style="height: 1px; background-color: #E2E8F0;"></div></td>
          </tr>
          <tr style="font-size: 15px; font-weight: 700; color: #0F172A;">
            <td style="padding: 3px 0;">Total Amount Due:</td>
            <td align="right" style="font-family: monospace; color: #4F46E5;">${fmt(this.totalsData?.total || 0)}</td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Indian Banking & Footer -->
    <tr>
      <td style="padding: 20px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 12px; color: #475569;">
        ${
          this.footerData
            ? `<div style="margin-bottom: 8px;">
                <strong>Indian Banking Details (NEFT/RTGS/IMPS):</strong><br>
                Bank: <strong>${this.footerData.bankName}</strong> (${this.footerData.accountType || 'Current'} A/C)<br>
                A/C No: <code style="font-family: monospace;">${this.footerData.accountNumber}</code> | IFSC: <code style="font-family: monospace; font-weight: bold; color: #4338CA;">${this.footerData.ifscCode}</code><br>
                ${this.footerData.upiId ? `UPI VPA: <strong style="color: #0F172A;">${this.footerData.upiId}</strong> (Instant UPI Settlement)` : ''}
              </div>`
            : ''
        }
        ${this.notesData?.notes ? `<div style="margin-top: 8px; font-size: 11px; color: #64748B;"><strong>Note:</strong> ${this.notesData.notes}</div>` : ''}
        <div style="margin-top: 12px; font-size: 11px; color: #94A3B8;">InvoiceKit Universal Engine • Compliant with Indian GST & E-Invoicing standards.</div>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

    // Plain Text ASCII Layout for Indian Banking
    const lineSeparator = '='.repeat(72);
    const dashSeparator = '-'.repeat(72);

    let plainText = `
${lineSeparator}
${(this.headerData?.title || 'TAX INVOICE').toUpperCase()}
Invoice Number: ${this.headerData?.invoiceNumber || ''}
Status: ${(this.headerData?.status || 'PENDING').toUpperCase()}
Invoice Date: ${this.headerData?.issueDate || ''} | Due Date: ${this.headerData?.dueDate || ''}
Place of Supply: ${this.headerData?.placeOfSupply || 'N/A'}
${lineSeparator}

SUPPLIER (BILLED BY):
${this.issuerData?.name || ''}
${this.issuerData?.address || ''}
GSTIN: ${this.issuerData?.gstin || 'N/A'} | PAN: ${this.issuerData?.pan || 'N/A'}
State: ${this.issuerData?.state || ''} (${this.issuerData?.stateCode || ''})

BUYER (BILLED TO):
${this.clientData?.name || ''}
${this.clientData?.address || ''}
GSTIN: ${this.clientData?.gstin || 'N/A'} | PAN: ${this.clientData?.pan || 'N/A'}
State: ${this.clientData?.state || ''} (${this.clientData?.stateCode || ''})

${dashSeparator}
LINE ITEMS:
${dashSeparator}
${this.rowsData
  .map(
    (r) =>
      `${r.description.padEnd(32)} SAC:${(r.hsnSac || '—').padEnd(7)} Qty:${String(r.quantity).padStart(2)} | Rate:${fmt(r.unitPrice).padStart(12)} | Amount:${fmt(r.amount).padStart(12)}`
  )
  .join('\n')}
${dashSeparator}

TAX & TOTAL BREAKDOWN:
  Taxable Value:       ${fmt(this.totalsData?.subtotal || 0)}
  ${this.totalsData?.discount ? `Discount:           -${fmt(this.totalsData.discount)}\n  ` : ''}${
      this.totalsData?.isInterstate
        ? `IGST (${this.totalsData.taxRate}%):          ${fmt(this.totalsData.igstAmount || this.totalsData.taxAmount)}`
        : `CGST (${(this.totalsData?.taxRate || 0) / 2}%):          ${fmt(this.totalsData?.cgstAmount || (this.totalsData?.taxAmount || 0) / 2)}\n  SGST (${(this.totalsData?.taxRate || 0) / 2}%):          ${fmt(this.totalsData?.sgstAmount || (this.totalsData?.taxAmount || 0) / 2)}`
    }
  TOTAL AMOUNT DUE:    ${fmt(this.totalsData?.total || 0)}

${lineSeparator}
${
  this.footerData
    ? `INDIAN BANK DETAILS (NEFT / RTGS / IMPS / UPI):
Bank Name:     ${this.footerData.bankName} (${this.footerData.accountType || 'Current'} A/C)
Account No:    ${this.footerData.accountNumber}
IFSC Code:     ${this.footerData.ifscCode}
UPI ID:        ${this.footerData.upiId || 'N/A'}
Branch:        ${this.footerData.branch || 'N/A'}
`
    : ''
}
${this.notesData?.notes ? `NOTES / DECLARATION:\n${this.notesData.notes}\n` : ''}
Thank you for your business!
Generated by InvoiceKit Engine (Indian GST & E-Invoice Standard)
${lineSeparator}
`.trim();

    return { html, plainText };
  }
}
