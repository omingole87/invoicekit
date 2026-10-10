# InvoiceKit ⚡ (India Edition)

[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![npm workspaces](https://img.shields.io/badge/Monorepo-npm%20workspaces-CB3837?logo=npm&logoColor=white)](https://docs.npmjs.com/cli/using-npm/workspaces)
[![CI](https://github.com/omingole87/invoicekit/actions/workflows/ci.yml/badge.svg)](https://github.com/omingole87/invoicekit/actions)
[![GST Compliant](https://img.shields.io/badge/GST-Compliant%20%F0%9F%87%AE%F0%9F%87%B3-green.svg)](https://www.gst.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Shared component library & universal invoice renderer engine for modern Indian business software.**  
> Compliant with Indian GST laws, HSN/SAC codes, Indian numbering (Lakhs & Crores), Indian Banking (NEFT/RTGS/IMPS), and instant UPI payments.  
> One canonical invoice template rendered across three outputs: on-screen React DOM, print-ready vector PDF, and inline-CSS email HTML.

---

## 🇮🇳 Indian Localization & Compliance Features

1. **Currency & Number Formatting (INR / ₹):**
   - Native formatting using the Indian numbering system (`en-IN` format: ₹1,50,000.00 / Lakhs & Crores).
   - Default currency symbol `₹` and currency code `INR`.

2. **GST Compliance (Goods and Services Tax):**
   - 15-character **GSTIN** verification & display for Supplier and Buyer.
   - 10-character **PAN** (Permanent Account Number) mapping.
   - **State Name & State Codes** (e.g., Karnataka: `29`, Maharashtra: `27`, Delhi: `07`).
   - **Place of Supply** tracking.
   - **HSN / SAC Codes** (e.g., `SAC 998311`, `998314` for IT & Software Services) displayed on every line item.
   - **Dual GST Calculation Modes:**
     - **Interstate:** Integrated GST (**IGST** e.g., 18%).
     - **Intrastate:** Central GST + State GST (**CGST 9% + SGST 9%**).

3. **Indian Banking & UPI Payment Systems:**
   - Pre-configured with major Indian commercial banks:
     - **HDFC Bank Limited**
     - **State Bank of India (SBI)**
     - **ICICI Bank Limited**
     - **Axis Bank Limited**
     - **Kotak Mahindra Bank**
   - Display of **IFSC Code** (e.g., `HDFC0000060`, `SBIN0001234`).
   - Account Type (**Current A/C** / Savings A/C).
   - **UPI VPA / ID** (e.g., `bharatcloud@okhdfcbank`) for instant mobile payment settlement.
   - Bank Branch & Jurisdiction declaration (e.g., *Subject to Bengaluru jurisdiction*).

4. **The Universal Renderer Pattern:**
   - 💻 **React DOM:** Interactive, responsive Indian Tax Invoice view.
   - 📄 **Print-Ready PDF:** Vector A4 invoice via `jsPDF` with Indian comma styling (`INR 4,50,000.00`).
   - ✉️ **Email (HTML & Plain Text):** Bulletproof email layout with GSTIN, PAN, SAC, IFSC, and UPI details.

---

## 🏗️ Repository Architecture

```
invoicekit/
├── packages/
│   ├── tokens/          # @invoicekit/tokens (Design tokens & WCAG AA contrast auditor)
│   ├── ui/              # @invoicekit/ui (24 shared enterprise components with ₹ INR)
│   └── renderer/        # @invoicekit/renderer (Universal engine: DOM, PDF, and Email)
├── apps/
│   └── docs/            # @invoicekit/docs (Interactive Studio, Indian banks, and WCAG inspector)
├── .github/workflows/   # ci.yml (Lint, typecheck, test, build, pack)
├── CHANGELOG.md         # Release history & versioning
└── package.json         # npm workspaces configuration
```

---

## 🚀 Quick Start

### 1. Run Development Server

```powershell
cd "C:\Users\OM INGOLE\invoicekit"
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Run Test Suite (WCAG AA & Indian Renderers)

```powershell
npm test
```

### 3. Typecheck Monorepo

```powershell
npm run typecheck
```

### 4. Build Production Bundle

```powershell
npm run build
```

---

## 🧩 Usage Example

```typescript
import {
  renderInvoice,
  DOMInvoiceRenderer,
  PDFInvoiceRenderer,
  EmailInvoiceRenderer,
  Invoice
} from '@invoicekit/renderer';

const invoice: Invoice = {
  id: 'inv_in_101',
  number: 'INV/2026-27/0142',
  title: 'Tax Invoice — Software Development & Consulting',
  status: 'pending',
  issueDate: '07/10/2026',
  dueDate: '06/11/2026',
  placeOfSupply: 'Maharashtra (Code: 27)',
  issuer: {
    name: 'Bharat Cloud Technologies Pvt. Ltd.',
    address: 'Koramangala, Bengaluru, Karnataka 560034',
    gstin: '29AABCB1234F1Z5',
    pan: 'AABCB1234F',
    state: 'Karnataka',
    stateCode: '29',
  },
  client: {
    name: 'Apex Retail & Commerce India Pvt. Ltd.',
    address: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051',
    gstin: '27AAACA9876K1Z2',
    pan: 'AAACA9876K',
    state: 'Maharashtra',
    stateCode: '27',
  },
  items: [
    { description: 'Cloud ERP Architecture', hsnSac: '998314', quantity: 1, unitPrice: 180000, amount: 180000 }
  ],
  totals: {
    subtotal: 180000,
    taxRate: 18,
    taxAmount: 32400,
    isInterstate: true,
    igstAmount: 32400,
    total: 212400,
    currency: 'INR'
  },
  paymentDetails: {
    bankName: 'HDFC Bank Limited',
    accountNumber: '50200084920194',
    accountType: 'Current',
    ifscCode: 'HDFC0000060',
    upiId: 'bharatcloud@okhdfcbank'
  }
};

// 1. Render to React DOM
const domUI = renderInvoice(invoice, new DOMInvoiceRenderer());

// 2. Render to Vector PDF
const pdf = renderInvoice(invoice, new PDFInvoiceRenderer());
pdf.download('Tax-Invoice-0142.pdf');

// 3. Render to Email HTML & ASCII Text
const email = renderInvoice(invoice, new EmailInvoiceRenderer());
console.log(email.html);
console.log(email.plainText);
```
