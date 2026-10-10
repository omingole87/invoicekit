export interface Party {
  name: string;
  email?: string;
  address?: string;
  phone?: string;
  gstin?: string;    // 15-digit GSTIN (Goods & Services Tax)
  pan?: string;      // 10-digit PAN (Permanent Account Number)
  state?: string;    // e.g. "Karnataka", "Maharashtra"
  stateCode?: string; // e.g. "29", "27"
}

export interface InvoiceItem {
  id?: string;
  description: string;
  hsnSac?: string; // HSN / SAC Code for Indian GST compliance (e.g. 998311)
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceTotals {
  subtotal: number;
  discount?: number;
  taxRate: number; // e.g. 18 for 18% GST
  taxAmount: number;
  isInterstate?: boolean; // True -> IGST; False -> CGST + SGST
  cgstAmount?: number;    // Half of GST for intrastate
  sgstAmount?: number;    // Half of GST for intrastate
  igstAmount?: number;    // Full GST for interstate
  total: number;
  currency: string;       // Default 'INR'
}

export interface PaymentDetails {
  bankName?: string;       // e.g. "HDFC Bank", "State Bank of India (SBI)", "ICICI Bank"
  accountName?: string;
  accountNumber?: string;
  accountType?: 'Current' | 'Savings';
  ifscCode?: string;       // 11-character Indian Financial System Code (e.g. HDFC0000060)
  upiId?: string;          // UPI VPA (e.g. merchant@okhdfcbank)
  branch?: string;
  instructions?: string;
}

export type InvoiceStatusType = 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled';

export interface Invoice {
  id: string;
  number: string;
  title: string;
  status: InvoiceStatusType;
  issueDate: string;
  dueDate: string;
  poNumber?: string;
  placeOfSupply?: string; // Indian GST requirement (State + Code)
  issuer: Party;
  client: Party;
  items: InvoiceItem[];
  totals: InvoiceTotals;
  notes?: string;
  terms?: string;
  paymentDetails?: PaymentDetails;
}

/**
 * Universal Renderer Interface
 * Output implementers collect the calls and produce the target format T.
 */
export interface InvoiceRendererOutput<T> {
  header(title: string, invoiceNumber: string, status: InvoiceStatusType, issueDate: string, dueDate: string, placeOfSupply?: string): void;
  parties(issuer: Party, client: Party): void;
  row(item: InvoiceItem, index: number): void;
  total(totals: InvoiceTotals): void;
  notes(notes?: string, terms?: string): void;
  footer(paymentDetails?: PaymentDetails): void;
  getResult(): T;
}

/**
 * The single source of truth dispatcher
 */
export function renderInvoice<T>(invoice: Invoice, out: InvoiceRendererOutput<T>): T {
  out.header(
    invoice.title,
    invoice.number,
    invoice.status,
    invoice.issueDate,
    invoice.dueDate,
    invoice.placeOfSupply
  );
  out.parties(invoice.issuer, invoice.client);
  invoice.items.forEach((item, index) => out.row(item, index));
  out.total(invoice.totals);
  out.notes(invoice.notes, invoice.terms);
  out.footer(invoice.paymentDetails);
  return out.getResult();
}

/**
 * Indian Rupee Number Formatter (Lakhs and Crores numbering system)
 */
export function formatIndianCurrency(amount: number, currency: string = 'INR'): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
